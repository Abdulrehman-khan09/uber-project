import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../../Context/CaptainContext'
import axios from 'axios'

const CaptainProtected = ({children}) => {
 
    const navigate = useNavigate()
    const token = localStorage.getItem('token-cap')
    const {setCaptain} = useContext(CaptainDataContext)
     
   useEffect(() => {
     if(!token){
         navigate('/captain-login')
     }
     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
      headers:{
          Authorization:`bearer ${token}`
      }

  }).then((response)=>{
      if(response.status === 200){
        setCaptain(response.data.captain)
      }
  })
   }, [token,navigate])

  return (
    <div>
         {children}
    </div>
  )
}

export default CaptainProtected

