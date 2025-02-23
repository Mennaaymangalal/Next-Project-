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
import Comment from '../Comment/Comment';
import Link from 'next/link';



export default function Post({ post , commentLimit } : {post : PostI , commentLimit?: number }){



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
     
             

    </Card>
  );
}
