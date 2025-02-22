"use client"
import Post from '@/app/_components/Post/Post'
import Loading from '@/app/Loading/loading'
import { PostI } from '@/Interfaces/Post'
import { getAllPosts } from '@/Redux/PostsSlice'
import { AppDispatch, RootState } from '@/Redux/Store/store'
import { Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Posts() {
  const dispatch = useDispatch<AppDispatch>()
 
  const {posts , postsIsLoading } : {posts : PostI[] , postsIsLoading : boolean } = useSelector((state:RootState) => state.posts)
 

  useEffect(()=>{
    dispatch(getAllPosts())
  },[])
  
  if(postsIsLoading){
    return <Loading/>
  }

  return (
    <Container maxWidth={'md'}>
      <Typography variant='h4'>
      Posts  
      </Typography>    
      <Stack spacing={3} marginTop={3}>
      {
         posts.map((post , index)=>{
          return <Post key={index} post={post} commentLimit={1}/>
         })
      }
      </Stack> 
    </Container>
  )
}
