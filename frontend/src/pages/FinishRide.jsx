import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const FinishRide = (props) => {
  const navigate = useNavigate()

  const finishRide = async () =>{
    try{
       const token = localStorage.getItem('token-cap')
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/ride-end`,{
          rideId:props.ride._id
        },{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200){
          navigate('/captain-home')
        }
        
    }catch(err){
       console.log(err)
    }
  }
  return (
    <div className="w-full max-w-md mx-auto bg-white">
      {/* Map Section */}
      <div className="w-full bg-gray-100">
        <div className="absolute top-4 left-4 text-xl font-bold">Uber</div>
        <img
         className="object-cover w-screen"
         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgBWkh-2RpEXtRmA1vxakcVsTzG3XVMnd3Q&s" alt="" />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Finish this Ride</h1>

        {/* Rider Card */}
        <div className="border-2 border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrQFFAs5EYXh7vQWpY3BgNOHsLG_QiTQm6g&s" alt="Rider" className="w-full h-full object-cover" />
            </div>
            <span className="font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</span>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 font-bold">
            
            <h1 ><i className="ri-map-pin-2-fill"></i></h1>
            <div>
              <div className="font-medium">562/11-A</div>
              <div className="text-sm font-bold">{props.ride?.pickup}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
          <h1 ><i className="ri-map-pin-2-fill"></i></h1>
            <div>
              <div className="font-medium">562/11-A</div>
              <div className="text-sm font-bold">{props.ride?.destination}</div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-8">
        <p> <i className=" text-2xl ri-cash-line"></i></p>
          <div>
            <div className="font-medium">{props.ride?.fare}</div>
            <div className="text-sm font-bold">Cash</div>
          </div>
        </div>

        {/* Action Button */}
        <button 
        onClick={finishRide}
        className="w-full py-3  flex justify-center  bg-green-600 text-white rounded-md font-medium">Finish Ride</button>
      </div>
    </div>
  )
}


export default FinishRide