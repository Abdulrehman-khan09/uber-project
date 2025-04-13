import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { UserDataContext } from '../Context/UserContext';
import axios from 'axios';


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const {user,setUser} = React.useContext(UserDataContext)

   const handleSubmit = async (e)=>{
      e.preventDefault()
      const loggedInUser = {
        email:email,
        password:password
      }
      try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,loggedInUser)
        if(response.request.status === 401){
           alert("username or password is incorrect")
        }
        if(response.status === 201){
          
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token',data.token)
          navigate('/user-home')
        }

      }catch(err){
        console.log(err)
      }
     
      setEmail('')
      setpassword('')
  }

  return (
    <div>
        <div className='p-3.5 mt-10'>
           <Link to='/' className='font-bold text-2xl p-3'>Uber</Link>
            <form action=""
                  onSubmit={(e)=>{
                    handleSubmit(e)
                  }}>
                <div className='form-container p-3 ml-5'>
                 <div className=' email mt-2'>
                 <h1 className='font-bold '>Whats Your Email?</h1>
                <input  
                onChange={(e)=>{
                      setEmail(e.target.value)
                }}
                className=' px-2  mt-1 rounded-md bg-[#eeeeee] placeholder:font-semibold w-[290px] h-10' 
                type="email" name="email"
                value={email}
                 placeholder='email@123.com'/>
                 </div>

                 <div className='password mt-2'>
                <h1 className='font-bold '>Enter Your Password</h1>
                <input
                  onChange={(e)=>{
                    setpassword(e.target.value)
                 }}
                 className='px-2 mt-1 w-[290px] rounded-md placeholder:font-semibold bg-[#eeeeee]  h-10 ' 
                 type={showPassword ? "text" : "password"}  
                  placeholder='password'
                  value={password} />
                 </div>
                 
                 <button 
                type="button" 
                className='absolute right-4 bottom-[420px]' 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?  <i class="ri-eye-off-line"></i> :  <i class="ri-eye-line"></i> }
               
              </button>

                </div>
                 <div className='p-3 mb-2'>
                 <button className='text-white w-full font-semibold p-2 capitalize  bg-black'>Sign in as user</button>
                 </div>


            </form>

            <div className='flex items-center justify-center gap-5'>
            <p className='font-semibold'>New Here?</p>
            <Link className='text-blue-600 font-semibold ' to='/user-signup'>Create new account</Link>
            </div>

            <div className='captain mt-60 '>
              <Link to='/captain-login' className='rounded-md text-white w-full font-bold p-3 text-center flex justify-center items-center capitalize bg-blue-700'>Sign in as captain</Link>
            </div>

        </div>
    </div>
  )
}

export default UserLogin
