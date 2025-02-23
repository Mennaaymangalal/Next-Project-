"use client"
import Post from '@/app/_components/Post/Post'
import Loading from '@/app/Loading/loading'
import { getSinglePost } from '@/Redux/PostsSlice'
import { AppDispatch, RootState } from '@/Redux/Store/store'
import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}
export default function PostDetails({ params }: PostDetailsProps) {
  const dispatch = useDispatch<AppDispatch>()

  const { post, postIsLoading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    params.then(({ id }) => {
      dispatch(getSinglePost(id));
    });
  }, []);

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
