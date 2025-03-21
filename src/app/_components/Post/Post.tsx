import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { PostI } from '@/Interfaces/Post';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Button, IconButton, TextField } from '@mui/material';
import Comment from '../Comment/Comment';
import Link from 'next/link';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/Store/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getAllPosts, getSinglePost } from '@/Redux/PostsSlice';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/navigation';




export default function Post({ post , commentLimit } : {post : PostI , commentLimit?: number }){
  const [isLoading , setIsLoading] = React.useState(false)
  const [content , setContent] = React.useState("")
  const [isLoadingBtn , setIsLoadingBtn] = React.useState(false)
  const {push} = useRouter()

 const {user}  = useSelector((state:RootState)=> state.auth)
 const dispatch = useDispatch<AppDispatch>() 
 



  async function deletePost(){
    setIsLoading(true)
     const {data} = await axios.delete("https://linked-posts.routemisr.com/posts/" + post._id,
     { headers:{
        token: Cookies.get("token")
      }}     
     )
     console.log(data)
     setIsLoading(false)
     dispatch(getAllPosts());
     if(commentLimit == undefined){
        push("/posts")
     }
  } 
 
  async function CreateComment(){
    setIsLoadingBtn(true)
   const {data} = await axios.post("https://linked-posts.routemisr.com/comments",
   {
      content,
      post: post._id
   },
  {
    headers:{
      token: Cookies.get("token")
    }
  })
  console.log(data)
  setIsLoadingBtn(false)
  dispatch(getAllPosts()).then(()=> setContent(""))
  dispatch(getSinglePost(post._id)).then(()=> setContent(""))  
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
           src={post.user.photo}
            alt={post.user.name}
            sx={{ bgcolor: red[500] }} 
            aria-label="recipe">           
          </Avatar>
        }
        action={
          user?._id == post.user._id &&
          <IconButton loading={isLoading} onClick={deletePost} aria-label="settings">
            <ClearIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt.split("T")[0]}
      />

       { post.body &&
          <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {post.body}
          </Typography>
        </CardContent>
       }


    {    post.image &&
          <Link href={"/posts/" + post._id}>
             <CardMedia
          component="img"
          height={ commentLimit == undefined ? "auto" : "250" }
          image={post.image}
          alt={post.body}
        />    
        </Link>
    }


      <CardActions disableSpacing sx={{justifyContent:'space-between'}}>
      <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
   
     <Box sx={{display:'flex' , alignItems:'center'}}>       
    
    <Link href={"/posts/" + post._id}>
    <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
    </Link>

     <Typography>{post.comments.length}</Typography>
     </Box>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      {
        post.comments.slice(0,commentLimit).map((comment , index)=>{
          return <Comment key={index} comment={comment}/>
        })
      }  

      <Box sx={{display:'flex' , paddingTop:'15px'}}>
      <TextField
      value={content}
      onChange={(e)=>setContent(e.target.value)}
      type='text'
      style={{padding:'0 5px'}}
      fullWidth
      placeholder='Write a Comment....'
      variant="standard" />
      <Button   
      disabled={content.trim() ==  "" }
      loading={isLoadingBtn}
      onClick={CreateComment}  
       size="large"
        type='submit'
        variant="text">
        <SendIcon sx={{paddingRight:'15px'}}/>
        </Button>      
      </Box>               
    </Card>
  );
}
