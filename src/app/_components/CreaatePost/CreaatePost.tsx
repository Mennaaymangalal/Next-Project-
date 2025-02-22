import React from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreatePost = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>       
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="What's on your mind?"
            multiline
            rows={2}
            variant="outlined"
            sx={{ mb: 2 }}
          />          
          <Button         
          style={{width:'100%'}}
            variant="contained"
            component="label"
          >
           <CloudUploadIcon style={{paddingRight:'10px'}}/>  Upload File
            <input type="file" hidden />
          </Button>
          <Box sx={{ mt: 2 , display:'flex' , justifyContent:'end' }}>
            <Button variant="contained" color="primary">
              SEND ►
            </Button>
          </Box>
        </Box>       
      </Box>
    </Container>
  );
};

export default CreatePost;