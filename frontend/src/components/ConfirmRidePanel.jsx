import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
const ConfirmRidePanel = (props) => {
  
  
const cancelRef = useRef(null)

useGSAP(() => {
  if (props.rideCancel) {
    gsap.set(cancelRef.current, { display: 'flex' });
    
  } else {
    gsap.set(cancelRef.current, {display: 'none'});
  }
}, [props.rideCancel]);

  return (
    <div className='confirm-panel'> 
            <div className='parent flex  flex-col'>
            <h1 onClick={()=>{
                props.setPanelOpen(false)
                props.setVehiclePanel(false)
                props.setConfirmRidePanel(false)
                props.findTripBtn(false)
              }}
              className='text-center'>
              <i className="font-semibold text-xl ri-arrow-down-wide-line"></i>
              </h1>
              <h1 className="font-bold text-2xl p-5">Confirm Your Ride</h1>
              <div className='flex justify-center'>
                </div>

                <div className='ml-10 mb-10 space-y-4'>
                      <div>
                        <div className='flex gap-4 text-2xl font-bold '><h1 ><i className="ri-map-pin-2-fill"></i></h1>
                        562/11A
                        </div>
                        <p className='text-lg text-gray-500'>{props.pickup}</p>
                        </div>
                      <div>
                        <div className='flex gap-4 text-2xl font-bold '><h1 ><i className="ri-map-pin-2-fill"></i></h1>
                        562/11A
                        </div>
                        <p className='text-lg text-gray-500'>{props.destination}</p>
                        </div>
                       

                      <div className=' flex gap-2'>
                      <div className='text-lg font-bold '>
                       <p> <i className=" text-2xl ri-cash-line"></i></p>
                       </div>
                       <p className='font-bold text-xl'>{props.fare[props.vehicleType]}</p>
                      </div>
                      <p className='text-lg text-gray-500'>Cash</p>

                      <button
                      ref={cancelRef}
                      className='text-red-700 font-bold capitalize  hidden'>Your ride was cancelled by captain</button>
                </div>

                <div>
                    <button 
                     onClick={()=>{
                      props.setDriverWaits(true)
                      props.setConfirmRidePanel(false)
                      props.createRide()
                     }} 
                    className='w-[90%] ml-4 mb-2 bg-green-700 font-semibold  text-white px-2 py-3 rounded-xl'>Confirm Ride</button>
                </div>
            </div>
    </div>
  )
}

export default ConfirmRidePanel
