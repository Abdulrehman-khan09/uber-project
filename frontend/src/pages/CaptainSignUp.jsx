import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainSignup = () => {

  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  
  // importind data from context
  const {captain,setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const newCaptain = {
      fullname :{
         firstname:firstname,
         lastname:lastname
      },
      email:email,
      password:password,

      vehicle:{
        carColor:vehicleColor,
        carPlate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
    }

  }
       // sending data to backend for processing


       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newCaptain)
       if(response.status === 201){
           const data = response.data
           setCaptain(data.captain)
           localStorage.setItem("token-cap",data.token)
           navigate("/captain-home")
       }


    setfirstname('')
    setlastname('')
    setemail('')
    setpassword('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
  }
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
                <div className='flex gap-4 font-bold'>
                <h3 className='font-bold'>Enter Your Firstname</h3>
                <h3 className='font-bold'>Enter your Lastname</h3>
                </div>
              <div className='name  flex gap-2 mt-3 '>
                <input
                required
                onChange={(e)=>{
                     setfirstname(e.target.value)
                 }}
                 value={firstname}
                 
                 className='rounded-md bg-[#eeeeee] h-10 w-1/2 p-2 border border-black' type="text" name="firstname"   placeholder='Firstname'/>
                <input 
                 required
                 onChange={(e)=>{
                   setlastname(e.target.value)
                  }}
                  value={lastname}
                  className='rounded-md bg-[#eeeeee] w-1/2  h-10 p-2 border border-black' type="text" name="lastname"  placeholder='Lastname' />
              </div>
             <div className=' email mt-2'>
             <h1 className='font-bold '>Whats Your Email?</h1>
            <input  
            required
             onChange={(e)=>{
              setemail(e.target.value)
          }}
            value={email}
            className=' px-1 border mt-1 rounded-md bg-[#eeeeee] w-[300px] border-black h-10' type="email" name="" id=""  placeholder='email@123.com'/>
             </div>

             <div className='password mt-2'>
            <h1 className='font-bold'>Enter Your Password</h1>
            <input  
            required
             onChange={(e)=>{
              setpassword(e.target.value)
          }}
            value={password}
            type={showPassword ? "text" : "password"} 
            className='px-1 mt-1 w-[300px] rounded-md bg-[#eeeeee] border h-10 border-black'  name="" id=""  placeholder='password'/>
             </div>

             <button 
                type="button" 
                className='absolute left-[330px] bottom-[350px]' 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?  <i class="ri-eye-off-line"></i> :  <i class="ri-eye-line"></i>}
               
              </button>
                
             <div className='vehicle-data mt-4'>
          <h1 className='font-bold mb-2'>Vehicle Information</h1>
          <div className='flex gap-2 mb-2'>
            <input 
            required 
            value={vehicleColor}
             onChange={(e)=>{
              setVehicleColor(e.target.value)
             }}
              className='rounded-md bg-[#eeeeee] h-10 w-1/2 p-2 border border-black'
              type="text"
              placeholder='Vehicle Color'
            />
            <input
            value={vehiclePlate}
            required
              onChange={(e)=>{
              setVehiclePlate(e.target.value)
             }}
              className='rounded-md bg-[#eeeeee] w-1/2 h-10 p-2 border border-black'
              type="text"
              placeholder='License Plate'
            />
          </div>
          <div className='flex gap-2'>
            <input
            value={vehicleCapacity}
            required
            onChange={(e)=>{
              setVehicleCapacity(e.target.value)
             }}
              className='rounded-md bg-[#eeeeee] h-10 w-1/2 p-2 border border-black'
              type="number"
              placeholder='Capacity'
            />
            <select
            value={vehicleType}
            required
            onChange={(e)=>{
              setVehicleType(e.target.value)
             }}
              className='rounded-md bg-[#eeeeee] w-1/2 h-10 p-2 border border-black'
            >
              <option value="">Select Vehicle Type</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              <option value="car">Car</option>
            </select>
          </div>
        </div>

              

             </div>

             <div className='p-3 mb-2'>
             <button className='text-white w-full font-semibold p-2  capitalize bg-black'>SignUp as captain</button>

            </div>
        </form>

        <div className='flex items-center justify-center gap-5'>
        <p className='font-semibold'>Already have an account</p>
        
        <Link className='text-blue-600' to='/captain-login'>Login here</Link>
        </div>

        <div className='captain mt-4 p-2 '>
        <p className='font-semibold text-xs'>We value your privacy and are committed to protecting your personal information. Your data will only be used to provide and improve our services, ensure a safe experience, and comply with legal requirements.  </p>
        </div>

    </div>
 </div>
  )
}

export default CaptainSignup
