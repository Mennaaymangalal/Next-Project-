"use client"

import { LoginData } from '@/Interfaces/LoginData';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput,  Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import *  as  Yup from "yup" 
import cookie from "js-cookie"
import { useDispatch } from 'react-redux';
import { SetUserIsLoggedIn } from '@/Redux/AuthSliceIniteState/AuthSliceIniteState';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errMessage , setErrMessage] = useState("");  
  const [isLoading , setIsLoading] = useState(false)

  const dispatch =  useDispatch()

 const router = useRouter()
 
 const initialValues: LoginData  = {
 
  email:"",
  password:"",
 
  }
  
  async function onSubmit(values:LoginData){
   console.log("submit" ,values)
   setIsLoading(true)
    await axios.post("https://linked-posts.routemisr.com/users/signin" , values)
   .then(({data})=> {
    if(data.message == "success"){     
      cookie.set("token" , data.token) 
      dispatch(SetUserIsLoggedIn(true))
      router.push("/")
      console.log(data)   
    }
}).catch((err)=>{
    setErrMessage(err.response.data.error)
   }).finally(()=>{
    setIsLoading(false)
   }) 
  
  }

  const validationSchema = Yup.object({
  
    email: Yup.string().required("Email Is Required").email("Invalid email"),
    password: Yup.string().required("Password is required").matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,"Password must be 8+ characters with a letter, number, and special character."),
   
  })

  const {handleSubmit , values , handleChange , errors , touched , handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

 
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography sx={{textTransform:"uppercase"}} component={"h3"} variant='h3'>Login NOW!</Typography>
        <Box component={"form"} onSubmit={handleSubmit}>
       <Stack spacing={4} marginTop={4}>
     
       <TextField error={touched.email && Boolean(errors.email)} onBlur={handleBlur} helperText={touched.email && errors.email} onChange={handleChange} value={values.email} type='email' name='email' label="Email" variant="outlined" />

       <FormControl variant="outlined"  error={touched.password && Boolean(errors.password)}>      
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          error={touched.password && Boolean(errors.password)}
          onBlur={handleBlur}                   
          onChange={handleChange}
          value={values.password}
           name='password'        
           type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
           {touched.password && errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
        </FormControl>
             
      
    <Button size="large" loading={isLoading} type='submit' variant="outlined">Login</Button>
    {errMessage && <p style={{color:'red'}}>{errMessage} </p>}
       </Stack>
        </Box>    
      </Container>    
    </Box>
  )
}
