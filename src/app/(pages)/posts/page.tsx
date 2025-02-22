"use client"
import Post from '@/app/_components/Post/Post'
import { PostI } from '@/Interfaces/Post'
import { getAllPosts } from '@/Redux/PostsSlice'
import { Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Posts() {
  const dispatch = useDispatch<any>()
 
  const {posts} : {posts : PostI[]} = useSelector((state:any) => state.posts)
  console.log(posts)

  useEffect(()=>{
    dispatch(getAllPosts())
  },[])
  

  return (
    <Container maxWidth={'sm'}>
      <Typography variant='h4'>
      Posts  
      </Typography>    
      <Stack spacing={3} marginTop={3}>
      {
         posts.map((post , index)=>{
          return <Post key={index} post={post}/>
         })
      }
      </Stack> 
    </Container>
  )
}
