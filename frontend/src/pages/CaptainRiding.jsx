import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import FinishRide from "./FinishRide"
import { useState,useRef } from "react"
import { useLocation } from "react-router-dom"
import LiveTracking from "../components/LiveTracking"
    const CaptainRiding =() => {

  const [FinishRides, setFinishRide] = useState(false)
  const FinishRideRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

        useGSAP(function (){
            if(FinishRides){
              gsap.to(FinishRideRef.current, {
                 y:"0"
              })
            }  else {
              gsap.to(FinishRideRef.current,{
                y:"100%"
              })
            }
          
          },[FinishRides])


  return (
    <div className="w-full max-w-md mx-auto h-screen relative">
    
      <div className="relative w-full h-[8vh] bg-gray-100">
       
        <div className="absolute top-4 left-4 text-xl font-bold">Uber</div>
         
        <LiveTracking/>
         
      </div>

      <div className="absolute bottom-0 left-0 h-[25vh] p-10 right-0 bg-yellow-400 rounded-t-3xl">
        <div className="p-4 flex items-center justify-center">
          <button 
          onClick={()=>{
            setFinishRide(true)
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium">Complete Ride</button>
        </div>
      </div>

      <div ref={FinishRideRef} className=" bottom-0 w-full translate-y-full fixed z-10 bg-white ">
          <FinishRide ride={rideData}/>
      </div>
    </div>
  )
}

export default CaptainRiding