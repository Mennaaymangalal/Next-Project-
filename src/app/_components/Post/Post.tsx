import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PostI } from '@/Interfaces/Post';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box } from '@mui/material';



export default function Post({ post } : {post : PostI}){

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
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
          <CardMedia
          component="img"
          height="250"
          image={post.image}
          alt={post.body}
        />    
    }


      <CardActions disableSpacing sx={{justifyContent:'space-between'}}>
      <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
   
     <Box sx={{display:'flex' , alignItems:'center'}}>       
     <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
     <Typography>{post.comments.length}</Typography>
     </Box>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>     

      <Box sx={{background:"#eee" , borderTop:"1px solid #ccc"}}>
      <CardHeader
        avatar={
          <Avatar
           src={post.comments[0].commentCreator.photo}
            alt={post.comments[0].commentCreator.name}
            sx={{ bgcolor: red[500] }} 
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
                <Typography sx={{fontSize:'14px' , fontWeight:'500'}}>{post.comments[0].commentCreator.name}</Typography>
                <Typography sx={{fontSize:'14px' , fontWeight:'500'}}>{post.comments[0].createdAt.split("T")[0]}</Typography>
            </Box>
        }
        subheader={post.comments[0].content}  
        slotProps={{subheader:{
            fontSize:'18px',
            fontWeight:'400'
        }}}     
      />     
      </Box>

    </Card>
  );
}
