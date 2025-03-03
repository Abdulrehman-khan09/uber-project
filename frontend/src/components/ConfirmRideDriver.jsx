import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
  
const ConfirmRideDriver = (props) => {
    const [otp, setotp] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) =>{
        e.preventDefault()
       const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/ride-started`,{
          params:{
            rideId:props.ride._id,
            otp:otp
          },
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token-cap')}`
          } 
        })

        if(response.data.otp === otp){
            props.setRidePopUpPanel(false)
            props.setConfirmRidePopup(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
          }
          if(response.data.otp !== otp){
            alert('Invalid OTP')
          }
          
        if(otp === ''){
            alert('Enter OTP')
        }
        setotp('')

    }

    const handleCancelRide = async () => {
      try{
        const token = localStorage.getItem('token-cap')
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/cancel-ride`,{
          rideId:props.ride._id
        },{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className="bg-white">
      

         
      <div className="p-3 mt-4">
        <h1 className="text-2xl font-bold mb-3 ">New Ride Available!</h1>


        
        <div className="bg-yellow-300 rounded-lg p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrQFFAs5EYXh7vQWpY3BgNOHsLG_QiTQm6g&s" alt="Rider" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</span>
          </div>
          <span className="font-medium">2.2 KM</span>
        </div>

        
       
        <div className="space-y-3 mb-6 ml-6">
          <div className="flex items-center gap-3 ">
          <h1 ><i className="ri-map-pin-2-fill"></i></h1>
            <div>
              <div className="font-bold text-xl">562/11-A</div>
              <div className="text-sm">{props.ride?.pickup}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
          <h1 ><i className="ri-map-pin-2-fill"></i></h1>
            <div>
              <div className="font-bold text-xl">562/11-A</div>
              <div className="text-sm">{props.ride?.destination}</div>
            </div>
          </div>
        </div>

        
        <div className="flex items-center ml-6 gap-3 mb-8">
        <p> <i className=" text-2xl ri-cash-line"></i></p>
          <div>
            <div className="font-bold text-xl">{props.ride?.fare}</div>
            <div className="text-sm">Cash Cash</div>
          </div>
        </div>



         <form onSubmit={submitHandler}>  
            <div className='flex flex-col w-full  '>
            <input 
            required
            value={otp}
            onChange={(e)=>{
               setotp (e.target.value)
            }}
            className='rounded-md bg-[#eeeeee] h-10 w-full p-2 border text-xl placeholder:font-bold border-black'
            type="text" 
            placeholder='Enter OTP'/>
        <div className='flex'>
          <button
          className=" w-[50%] ml-2 py-4 px-10 mt-6  mr-5 bg-green-600 text-white rounded-md font-bold">Confirm</button>
          <button
           onClick={()=>{
               props.setConfirmRidePopup(false)
               props.setRidePopUpPanel(false)
               handleCancelRide()
         }}
           className="w-[50%] ml-3 py-4 px-10 mt-6  bg-red-500 text-white rounded-md font-bold">Cancel</button>
        </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmRideDriver
