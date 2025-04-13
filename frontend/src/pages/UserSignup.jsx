import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import  { UserDataContext } from '../Context/UserContext'
// we will use axios for data transferring to backend
// we will use navigate hook as well
import axios from 'axios'

const UserSignup = () => {

  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const {user,setUser} = React.useContext(UserDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/user-home');
      }
    } catch (error) {
        console.log(error)
    }
  };
  
  return (
    <div>
    <div className='p-2 mt-10 '>
       <Link to='/' className='font-bold text-2xl p-3'>Uber</Link>
       {/* <h1 className='font-bold text-center text-2xl'>Welcome</h1> */}
        <form action=""
         onSubmit={(e)=>{
          handleSubmit(e)
         }}>
            <div className='form-container p-3 ml-2'>
                <div className='flex gap-2.5 font-bold'>
                <h3>Enter Your Firstname</h3>
                <h3>Enter your Lastname</h3>
                </div>
              <div className='name mr-4 flex gap-4 mt-3  '>
                <input
                 onChange={(e)=>{
                     setfirstname(e.target.value)
                 }}
                 value={firstname}
                 className=' rounded-md bg-[#eeeeee] h-10 w-1/2 p-2 border border-black' type="text" name="firstname"   placeholder='Firstname'/>
                <input 
                 onChange={(e)=>{
                   setlastname(e.target.value)
                  }}
                  value={lastname}
                  className='rounded-md bg-[#eeeeee] w-1/2  h-10 p-2 border border-black' type="text" name="lastname"  placeholder='Lastname' />
              </div>
             <div className=' email mt-2'>
             <h1 className='font-bold '>Whats Your Email?</h1>
            <input 
             onChange={(e)=>{
              setemail(e.target.value)
          }}
            value={email}
            className=' px-1 border mt-1 rounded-md bg-[#eeeeee] w-[300px] border-black h-10' type="email" name="" id=""  placeholder='email@123.com'/>
             </div>

             <div className='password mt-2'>
            <h1 className='font-bold'>Enter Your Password</h1>
            <div className='relative'>
              <input 
                onChange={(e)=>{
                  setpassword(e.target.value)
              }}
                value={password}
                className='px-1 mt-1 w-[300px] rounded-md bg-[#eeeeee] border h-10 border-black' 
                type={showPassword ? "text" : "password"} 
                placeholder='password'/>
              <button 
                type="button" 
                className='absolute right-2 top-2' 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?  <i class="ri-eye-off-line"></i> :  <i class="ri-eye-line"></i>}
               
              </button>
            </div>
             </div>

            </div>
             <div className='p-3 mb-2'>
             <button className='text-white w-full font-semibold p-2  capitalize bg-black'>SignUp as user</button>
             </div>

        </form>

        <div className='flex items-center justify-center gap-5'>
        <p className='font-semibold'>Already have an account</p>
        <Link className='text-blue-600' to='/user-login'>Login here</Link>
        </div>

        <div className='captain mt-36 p-2 '>
        <p className='font-semibold text-xs'>We value your privacy and are committed to protecting your personal information. Your data will only be used to provide and improve our services, ensure a safe experience, and comply with legal requirements.  </p>
        </div>

    </div>
 </div>
  ) }

export default UserSignup
