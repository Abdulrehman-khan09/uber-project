import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
      
     const navigate = useNavigate()
     const {captain , setCaptain} = React.useContext(CaptainDataContext)
     
  
     const handleSubmit = async (e)=>{
        e.preventDefault()
        const loggedinCap = {
          email:email,
          password:password
        }
           const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,loggedinCap)
           if(response.status === 201){
               const data = response.data
               setCaptain(data.captain)
               localStorage.setItem('token-cap',data.token)
               navigate('/captain-home')
           }
          
        setEmail('')
        setPassword('')
    }

     
  return (
    <div>
    <div className='p-2 mt-10'>
       <Link to='/' className='font-bold text-2xl p-3'>Uber</Link>
        <form action=""
         onSubmit={(e)=>{
          handleSubmit(e)
        }}>
            <div className='form-container p-3 ml-5'>
             <div className=' email mt-2'>
             <h1 className='font-bold '>Whats Your Email?</h1>
            <input value={email}
             onChange={(e)=>{
              setEmail(e.target.value)
        }}
             className=' px-2 placeholder:font-semibold  mt-1 rounded-md bg-[#eeeeee] w-[300px]  h-10' type="email" name="" id=""  placeholder='email@123.com'/>
             </div>

             <div className='password mt-2'>
            <h1 className='font-bold'>Enter Your Password</h1>
            <input value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
          }}
            className='px-2 placeholder:font-semibold mt-1 w-[300px] rounded-md bg-[#eeeeee]  h-10 ' 
            type={showPassword ? "text" : "password"} 
            placeholder='password'/>
             </div>

             <button 
                type="button" 
                className='absolute left-[345px] bottom-[430px] ' 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?  <i class="ri-eye-off-line"></i> :  <i class="ri-eye-line"></i>}
               
              </button>

            </div>
             <div className='p-3 mb-2'>
             <button className='text-white w-full font-semibold p-2  capitalize bg-black'>Sign in as captain</button>
             </div>

        </form>

        <div className='flex items-center justify-center gap-5'>
        <p className='font-semibold'>Dont have an account?</p>
        <Link className='text-blue-600 ' to='/captain-signup'>Create new account</Link>
        </div>

        <div className='captain mt-64'>
          <Link to='/user-login' className='rounded-md text-white w-full font-bold p-3 text-center flex justify-center items-center capitalize bg-blue-600'>Log in as User</Link>
        </div>

    </div>
 </div>
  )
}

export default CaptainLogin
