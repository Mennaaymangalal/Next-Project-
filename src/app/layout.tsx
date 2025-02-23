"use client"
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";   
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'; 

import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/Redux/Store/store";
import Layout from "./_components/Layout/Layout";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head >
       <title>Circle</title>
      </head>
      <body className={roboto.variable} style={{margin:0}}>
        <Provider store={store}>
        <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
       <Layout>         
        <Navbar/>
        <Box padding={5}>
        {children}
        </Box>      
        <Footer/>          
      </Layout>
      
      </ThemeProvider>
      </AppRouterCacheProvider>
       
        </Provider>
     
      </body>
    </html>
  );
}
