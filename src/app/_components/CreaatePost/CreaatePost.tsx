"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
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
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [sizeError, setSizeError] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Reset errors when a new file is chosen.
    setFileError('');
    setSizeError('');

    const fileType = file.type; // e.g., "image/png"
    const allowedFileTypesRegex = /^image\/(jpeg|png|jpg)$/;
    
    if (!allowedFileTypesRegex.test(fileType)) {
      setFileError("must be one of [image/jpeg, image/png, image/jpg]");
      return;
    }
    
    const imgSize = file.size / 1024 / 1024; // Size in MB
    if (imgSize > 1) {
      setSizeError("Can't Upload, Image Size is too Large");
      handleRemoveFile();
      return;
    }

    setImage(file);
    const imgSrc = URL.createObjectURL(file);
    setImageSrc(imgSrc);
  };

  const handleRemoveFile = () => {
    setImage(null);
    setImageSrc('');
  };

  const addPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (body.trim() !== "") {
      formData.append("body", body);
    }
    if (image !== null) {
      formData.append("image", image);
    }
    setIsLoading(true);
    try {
      await axios.post("https://linked-posts.routemisr.com/posts", formData, {
        headers: {
          token: Cookies.get("token") || "",
        },
      });
      await dispatch(getAllPosts());
      setBody("");
      handleRemoveFile();
    } catch (error) {
      console.error("Error adding post:", error);
      // Optionally, set an error state here to notify the user.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box component="form" onSubmit={addPost} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="What's on your mind?"
            multiline
            rows={2}
            variant="outlined"
            sx={{ mb: 1 }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
          {sizeError && <p style={{ fontFamily:'Roboto', color: "red" }}>{sizeError}</p>}
          {fileError && <p style={{ fontFamily:'Roboto', color: "red" }}>{fileError}</p>}

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
            <Button
              disabled={body.trim() === "" && image === null}
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              {isLoading ? "Sending..." : "SEND"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
