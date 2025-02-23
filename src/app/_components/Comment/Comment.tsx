import { Avatar, Box, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { CommentI } from '@/Interfaces/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getAllPosts, getSinglePost } from '@/Redux/PostsSlice';

export default function Comment({comment}: {comment : CommentI}) {
  const [isLoading , setIsLoading] = React.useState(false)
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
          <IconButton loading={isLoading} onClick={deleteComment} aria-label="settings">
            <ClearIcon />
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
