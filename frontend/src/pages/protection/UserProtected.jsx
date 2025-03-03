import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../../Context/UserContext'

// this particular component ensures that non logged in user cannot access
//  protected routes directly this is for security purpsoes


const userProtected = ({children}) => {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user,setUser} = useContext(UserDataContext)
    

    useEffect(() => {
        if (!token) {
          navigate('/user-login');
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
          headers:{
              Authorization:`bearer ${token}`
          }
  
      }).then((response)=>{
          if(response.status === 200){
            setUser(response.data.user)
          }
      })
      }, [token, navigate]);
   
  return (
    <>
        {children}
    </>
  )
}

export default userProtected
