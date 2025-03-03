import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {

    const navigate = useNavigate()

    const token  = localStorage.getItem("token-cap")
     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     }).then((response)=>{
         if(response.status === 201){
             localStorage.removeItem('token-cap')
             navigate('/captain-login')
         }
     })

  return (
    <div>
       cap-logged out
    </div>
  )
}

export default CaptainLogout
