import React from 'react'

const DriverWait = (props) => {
  return (
    <div className='confirm-panel'> 
    <div className='parent flex  flex-col'>
    <h1 onClick={()=>{
               props.setDriverWaits(false)
               props.findTripBtn(false)
         }}
          className='text-center'><i className=" font-semibold text-xl ri-arrow-down-wide-line"></i></h1>
        <h1 className="font-bold  text-xl p-2">Looking For Drivers Nearby</h1>
        <div className='flex justify-center'>
          <img className='w-48' src='data:image/jpeg;base64,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'
         alt="UberGo"/>
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
              
        </div>

        <div>
           
        </div>
    </div>
</div>
  )
}

export default DriverWait
