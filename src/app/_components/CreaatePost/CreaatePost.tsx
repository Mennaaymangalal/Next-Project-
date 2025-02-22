import React, { useState, useEffect, ChangeEvent } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Clean up the object URL when the file changes or component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="What's on your mind?"
            multiline
            rows={1}
            variant="outlined"
            sx={{ mb: 1 }}
          />

          {previewUrl && (
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
                src={previewUrl}
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

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
            <Button variant="contained" color="primary">
              SEND ►
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}



