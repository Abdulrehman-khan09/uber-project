import React from 'react'
import { useContext } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'
const DriverDetails = () => {
  const {captain} = useContext(CaptainDataContext)
  return (
    <div>
         {/* Profile and Earnings */}
         <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
           
            <span className="font-medium capitalize text-lg relative left-[110px]">{captain.fullname.firstname + " " + captain.fullname.lastname}</span>
          </div>
       
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
               <h1 className="w-6 h-6 mb-1 text-gray-700"><i className="ri-time-line"></i></h1>
            <span className="font-semibold">10.2</span>
            <span>Hours</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
         <h1 className="w-6 h-6 mb-1 text-gray-700"><i className="ri-speed-up-line"></i></h1>
            <span className="font-semibold">1000</span>
            <span>km</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
          <h1 className="w-6 h-6 mb-1 text-gray-700"><i className="ri-booklet-line"></i></h1>
            <span className="font-semibold">10.2</span>
            <span>Note</span>
          </div>
        </div>
    </div>
  )
}

export default DriverDetails
