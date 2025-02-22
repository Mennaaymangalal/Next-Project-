import { Avatar, Box, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CommentI } from '@/Interfaces/Comment';

export default function Comment({comment}: {comment : CommentI}) {
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
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={
          <Box sx={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
              <Typography sx={{fontSize:'14px' , fontWeight:'500'}}>{comment.commentCreator.name}</Typography>
              <Typography sx={{fontSize:'14px' , fontWeight:'500'}}>{comment.createdAt.split("T")[0]}</Typography>
          </Box>
      }
      subheader={comment.content}  
      slotProps={{subheader:{
          fontSize:'18px',
          fontWeight:'400'
      }}}     
    />     
    </Box>
  )
}
