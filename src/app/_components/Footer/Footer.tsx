import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import WorkspacesIcon from '@mui/icons-material/Workspaces';

export default function Footer(){
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.dark",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Company Info */}
          <Grid item xs={12} sm={4}>
          <Box sx={{display:'flex' , alignItems:'center'}}>
          <WorkspacesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize:'20px'}} />
            <Typography variant="h6" fontWeight="bold">
              Circle
            </Typography>
          </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Building amazing web experiences with passion.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Link href="#" color="inherit" underline="hover" display="block">
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Services
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                About
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Menna Ayman. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

 
