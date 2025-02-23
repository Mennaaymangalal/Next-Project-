import { getLoggedUserData } from '@/Redux/AuthSliceIniteState/AuthSliceIniteState';
import { AppDispatch } from '@/Redux/Store/store';
import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function Layout({children}:{children: ReactNode }) {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(getLoggedUserData())
    },[])
  return children;   
 
}
