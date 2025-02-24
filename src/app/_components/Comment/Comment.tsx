import { Avatar, Box, Button, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { CommentI } from '@/Interfaces/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getAllPosts, getSinglePost } from '@/Redux/PostsSlice';
import EditIcon from '@mui/icons-material/Edit';

export default function Comment({comment}: {comment : CommentI}) {
  const [isLoading , setIsLoading] = React.useState(false)
  const [inUpdateMode , setInUpdateMode] = React.useState(false)
  const [content , setContent] = React.useState(comment.content)
  const [editisLoading , setEditIsLoading] = React.useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const {user} = useSelector((state:RootState)=> state.auth)
  async function deleteComment(){
    setIsLoading(true)
   const {data} = await axios.delete("https://linked-posts.routemisr.com/comments/" + comment._id,{
    headers:{
      token: Cookies.get("token")
    }    
   })
    console.log(data)    
    dispatch(getAllPosts()).then(()=> setIsLoading(false))
    dispatch(getSinglePost(comment._id)).then(()=> setIsLoading(false))

  }

  async function editComment(){
    setEditIsLoading(true)
    const { data } = await axios.put("https://linked-posts.routemisr.com/comments/" + comment._id ,
      {
        content,
      },
      {
        headers:{
          token: Cookies.get("token")
        }
      })
    console.log(data)
    setEditIsLoading(false)
    dispatch(getAllPosts())
    dispatch(getSinglePost(comment._id))
  }

  return (
    <Box sx={{background:"#eee" , borderTop:"1px solid #ccc"}}>
    <CardHeader
      avatar={
        <Avatar
         src={comment.commentCreator.photo}
          alt={comment.commentCreator.name}
          sx={{ bgcolor: 'red' , width: '30px' , height: '30px' }} 
          aria-label="recipe">           
        </Avatar>
      }
      action={
        user?._id == comment.commentCreator._id &&
         <>
           <IconButton onClick={()=>setInUpdateMode(true)} aria-label="settings">
          <EditIcon/>
          </IconButton>  
          <IconButton loading={isLoading} onClick={deleteComment} aria-label="settings">
            <ClearIcon />
          </IconButton>           
         </>    
        }
      
      title={
          <Box sx={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
              <Typography sx={{fontSize:'14px' , fontWeight:'500'}}>{comment.commentCreator.name}</Typography>
              <Typography sx={{fontSize:'14px' , fontWeight:'500'}}>{comment.createdAt.split("T")[0]}</Typography>
          </Box>
      }
      subheader={ inUpdateMode ? 
        <>
          <Box sx={{display:'flex'}}>
          <TextField  
            value={content}     
            onChange={(e)=> setContent(e.target.value)}         
            type='text'
            style={{padding:'0 5px'}}
            fullWidth         
            variant="standard" />
          <Button   
          loading={editisLoading} 
          onClick={editComment}       
           size="large"
           type='submit'
           variant="text">
          Update
        </Button>   
          </Box>
        </>
             :
            comment.content}  
      slotProps={{subheader:{
          fontSize:'18px',
          fontWeight:'400'
      }}}     
    />     
    </Box>
  )
}
