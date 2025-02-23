import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  styled,
  IconButton, 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '@/Redux/PostsSlice';
import { AppDispatch } from '@/Redux/Store/store';

const HiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreatePost() {
  const [image, setimage] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [body , setBody]  = useState("")  
  const [sizeError , setSizeError]  = useState("")
  const [fileError , setFileError]  = useState("")
  const dispatch = useDispatch<AppDispatch>()  

  const [isLoading , setIsLoading]  = useState(false)

  

 
 

  function handleFileChange (e:any){

    const fileType = e.target.files[0].type; // e.g., "image/png"
    const allowedFileTypesRegex = /^image\/(jpeg|png|jpg)$/;
    
    if (!allowedFileTypesRegex.test(fileType)) {
      setFileError("must be one of [image/jpeg, image/png, image/jpg]");
      return;
    }
    

    const imgSize = e.target.files[0].size /1024 /1024
    console.log(imgSize)

    if(imgSize > 1 ){
        setSizeError("Can't Upload, Image Size is too Large")
        handleRemoveFile()
        return
    }

    if (e.target.files[0]) {
        setimage(e.target.files[0]);      
    }
   const imgsrc = URL.createObjectURL(e.target.files[0]);
    setImageSrc(imgsrc);
  };

  
 
  async function addPost(e:any){    
    e.preventDefault()    
    const formData = new FormData(); 

    if(body.trim() != "" ){
        formData.append("body" , body)       
    }
    if(image != null){
        formData.append("image", image)
       }
       setIsLoading(true)
       const data = await axios.post("https://linked-posts.routemisr.com/posts" , formData ,{
        headers: {
            token: Cookies.get("token")
        }
       })       
        dispatch(getAllPosts()).then(()=>{
            setIsLoading(false)    
            setBody("")
            handleRemoveFile()
        })    
          
  } 
 

  const handleRemoveFile = () => {
    setimage(null);
    setImageSrc("")
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box onSubmit={addPost} component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="What's on your mind?"
            multiline
            rows={2}
            variant="outlined"
            sx={{ mb: 1 }}
            value={body}
            onChange={(e)=> setBody(e.target.value)}
          />

          {imageSrc && (
            <Box
              sx={{
                position: 'relative',
                maxWidth: '50%',
                margin: 'auto',
                mt: 2,
                mb: 2,
              }}
            >
              <img
                src={imageSrc}
                alt="Preview"
                style={{
                display: 'block',
                width: '100%',
                }}
              />
              <IconButton
                onClick={handleRemoveFile}
                sx={{ position: 'absolute', top: 0, right: 0 }}
              >
                <CloseIcon
                  sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '50%',
                  }}
                />
              </IconButton>
            </Box>
          )}

          <Button
            variant="contained"
            component="label"
            fullWidth
            startIcon={<CloudUploadIcon />}
          >
            Upload File
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}              
            />           
          </Button>
          { sizeError &&
                <p style={{color:"red"}}>{sizeError}</p>
          }
          { fileError &&
               <p style={{color:"red"}}>{fileError}</p>
          }

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
            <Button loading={isLoading} disabled={body.trim() == "" && image == null} type='submit' variant="contained" color="primary" endIcon={<SendIcon/>}>
              SEND
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}



