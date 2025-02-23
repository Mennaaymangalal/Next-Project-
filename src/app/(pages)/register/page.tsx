"use client"
import { RegisterData } from '@/Interfaces/RegisterData';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import *  as  Yup from "yup" 

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showrePassword, setShowrePassword] = React.useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const [errMessage , setErrMessage] = useState("");

 const router = useRouter()

 const initialValues : RegisterData = {
  name: "",
  email:"",
  password:"",
  rePassword:"",
  dateOfBirth:"",
  gender:""
  }
  

  async function onSubmit(values : RegisterData){
   console.log("submit" ,values)
   setIsLoading(true)
   await axios.post("https://linked-posts.routemisr.com/users/signup" , values)
   .then(({ data })=>{
    if(data.message == "success"){
      router.push("/login")
      console.log(data)
     }   
   })
   .catch((err)=>{
    setErrMessage(err.response.data.error)
   }).finally(()=>{
    setIsLoading(false)
   }) 
  
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name Is Required").min( 3 , "Name Must Be at Least 3 Character").max( 20 , "Name Must Be at Most 20 Character"),
    email: Yup.string().required("Email Is Required").email("Invalid email"),
    password: Yup.string().required("Password is required").matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must be 8+ characters with a letter, number, and special character."),
    rePassword: Yup.string().required("Repassword is required").oneOf([Yup.ref("password")],"Password and Repassword must be the same" ),   
    dateOfBirth: Yup.string().required("Date of Birth is Required"),
    gender: Yup.string().required("Gender is Required"),
  })

  const {handleSubmit , values , handleChange , errors , touched , handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowrePassword = () => setShowrePassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownrePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUprePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography sx={{textTransform:"uppercase"}} component={"h3"} variant='h3'>Register NOW!</Typography>
        <Box component={"form"} onSubmit={handleSubmit}>
       <Stack spacing={3} marginTop={3}>
       <TextField error={touched.name && Boolean(errors.name)} onBlur={handleBlur} helperText={touched.name && errors.name} onChange={handleChange} value={values.name} type='text' name='name' label="Name" variant="outlined" />
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

        
       <FormControl  variant="outlined" error={touched.rePassword && Boolean(errors.rePassword)}>
          <InputLabel htmlFor="outlined-adornment-password">RePassword</InputLabel>
          <OutlinedInput           
          aria-errormessage={errors.rePassword}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.rePassword}
          name='rePassword'           
            type={showrePassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showrePassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowrePassword}
                  onMouseDown={handleMouseDownrePassword}
                  onMouseUp={handleMouseUprePassword}
                  edge="end"
                >
                  {showrePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="RePassword"
          />
           {touched.rePassword && errors.rePassword && (
                <FormHelperText>{errors.rePassword}</FormHelperText>
              )}
        </FormControl>
        
        <TextField error={touched.dateOfBirth && Boolean(errors.dateOfBirth)} helperText={touched.dateOfBirth && errors.dateOfBirth} onBlur={handleBlur} onChange={handleChange} value={values.dateOfBirth} type='date' name='dateOfBirth' label="Date Of Birth" variant="outlined"  slotProps={{
            inputLabel: {
              shrink: true,
            },
          }} />

     <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
      <Select error={touched.gender && Boolean(errors.gender)} onBlur={handleBlur} onChange={handleChange} value={values.gender}  name='gender'  label="Gender">
      <MenuItem value={"male"}>Male</MenuItem>   
      <MenuItem value={"female"}>Female</MenuItem>   
      </Select>
      {touched.gender && errors.gender && (
       <FormHelperText>{errors.gender}</FormHelperText>
      )}
    </FormControl>
    <Button size="large" loading={isLoading} type='submit' variant="outlined">Register</Button>
    {errMessage && <p style={{color:'red'}}>{errMessage} </p>}
       </Stack>
        </Box>    
      </Container>    
    </Box>
  )
}
