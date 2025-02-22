"use client"
import Post from '@/app/_components/Post/Post'
import Loading from '@/app/Loading/loading'
import { getSinglePost } from '@/Redux/PostsSlice'
import { AppDispatch, RootState } from '@/Redux/Store/store'
import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function PostDetails(props:any) {
  const dispatch = useDispatch<AppDispatch>()

  const { post, postIsLoading } = useSelector((state: RootState) => state.posts);

  useEffect(()=>{
    props.params.then(({ id }:{ id : string })=>{
      dispatch(getSinglePost(id))
    })
  },[])

  console.log(post)

  if(postIsLoading){
    return <Loading/>
  }
 
  return (
    <>
    <Container maxWidth={'md'}>
      { post ? < Post post={post} /> : <Loading/>
      }
    </Container>     
    </>
  )
}
