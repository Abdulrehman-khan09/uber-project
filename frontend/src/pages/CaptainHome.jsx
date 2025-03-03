import { useContext, useRef, useState,useEffect } from "react"
import DriverDetails from "../components/DriverDetails"
import RidePopUp from "../components/RidePopUp"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ConfirmRideDriver from "../components/ConfirmRideDriver"
import { CaptainDataContext } from "../Context/CaptainContext"
import { SocketContext } from "../Context/SocketContext"
import axios from'axios'
import { useNavigate } from "react-router-dom"
import LiveTracking from "../components/LiveTracking"


const  CaptainHome  =() => {
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false)
  const RidePopUpPanelRef = useRef(null)
  const [ConfirmRidePopup, setConfirmRidePopup] = useState(false)
  const ConfirmRidePopupRef = useRef(null)
 const [ride, setRide] = useState(null)
 const navigate = useNavigate()

  //   gsap for ride popup
  useGSAP(function (){
    if(RidePopUpPanel){
      gsap.to(RidePopUpPanelRef.current, {
         y:"0"
      })
    }  else {
      gsap.to(RidePopUpPanelRef.current,{
        y:"100%"
      })
    }

 },[RidePopUpPanel])

//  gsap for confirmation panel
useGSAP(function (){
  if(ConfirmRidePopup){
    gsap.to(ConfirmRidePopupRef.current, {
       y:"0"
    })
  }  else {
    gsap.to(ConfirmRidePopupRef.current,{
      y:"100%"
    })
  }

},[ConfirmRidePopup])

    // requiring logged in captains details from context
  const {captain} = useContext(CaptainDataContext)
  
  // requiring socket from socketContext
  const {Socket} = useContext(SocketContext)
   useEffect(() => {
    // emitting join event to connect captain with socket
    Socket.emit("join",{userType:"captain", userId:captain._id})
    
    // code to get live loaction of captain and update it in db by emitting getCaptainLocation event in socket
    // we will use port forwarding for smooth flow 

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          Socket.emit("getCaptainLocation", { userId: captain._id,
             location:{latitude, longitude,} ,
             userType:"captain"});
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);

    return () => clearInterval(locationInterval);

}, [captain])
   
// socket code for new ride event

Socket.on('new-ride', (data) =>{
  setRide(data)
  setRidePopUpPanel(true)
})
// confirming ride
const confirmRide = async () => {
  const token = localStorage.getItem('token-cap')
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,{
      rideId:ride._id,
      captain:captain._id
 },
       {
        headers: {
          Authorization: `Bearer ${token}`
          }
       })
}

  catch(err){
    console.log(err)
  }
}
 
const handleLogout = async () => {
   try{
     localStorage.removeItem('token-cap')
     navigate('/captain-login')
   }catch(err){
      console.log(err)
   }
}
  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50">
     
      <div className="relative w-full h-[70vh] bg-gray-200">
        <h1 onClick={handleLogout} className="absolute top-8 right-8"><i className=" text-2xl ri-logout-box-line"></i></h1>
        <h1 className="absolute top-8 left-8 text-2xl font-bold">Uber</h1>
        <LiveTracking/>
      
      </div>
             {/* Driver details */}
      
      <div className="p-4 bg-white rounded-t-3xl -mt-6 relative z-10">
         <DriverDetails/>
      </div>

      {/*Ride popup*/}

      <div ref={RidePopUpPanelRef} className=" bottom-0 w-full translate-y-full fixed z-10 bg-white ">
          <RidePopUp 
          ride = {ride}
          confirmRide = {confirmRide}
          setRidePopUpPanel = {setRidePopUpPanel} setConfirmRidePopup = {setConfirmRidePopup} />
      </div>

        {/*Ride confrimation panel*/}

      <div ref={ConfirmRidePopupRef} className=" bottom-0 w-full translate-y-full fixed z-10 bg-white ">
          <ConfirmRideDriver
             ride = {ride}
           setRidePopUpPanel = {setRidePopUpPanel} setConfirmRidePopup = {setConfirmRidePopup} />
      </div>
    </div>
  )
}

export default CaptainHome

