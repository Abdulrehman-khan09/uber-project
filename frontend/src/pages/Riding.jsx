import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const navigate = useNavigate();
  const { Socket } = useContext(SocketContext);

  // Listen for "ride-ended" event
  Socket.on("ride-ended", (data) => {
    navigate("/user-home");
  });

  return (
    <div className="relative h-screen w-screen bg-gray-100">
      {/* Home Icon */}
      <Link to="/user-home" className="absolute top-6 left-8 z-10">
        <i className="text-3xl ri-home-4-line"></i>
      </Link>

      
      <div className="h-2/3 w-full">
        <LiveTracking />
      </div>

    
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
      
          <img
            className="w-28 h-auto rounded-lg object-cover"
            src="data:image/jpeg;base64,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"
            alt="UberGo"
          />
          <div className="ml-3 flex flex-col">
            <p className="font-bold capitalize text-xl">
              {rideData.captain.fullname.firstname +
                " " +
                rideData.captain.fullname.lastname}
            </p>
            <p className="font-bold text-lg text-gray-700">
              {rideData.captain.vehicle.carPlate}
            </p>
          </div>
        </div>

      
        <div className="ml-2 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold">
              <i className="ri-map-pin-2-fill"></i>
              562/11A
            </div>
            <p className="text-md font-bold">{rideData.destination}</p>
          </div>

          <div className="flex items-center gap-2">
            <i className="ri-cash-line text-2xl text-green-600"></i>
            <p className="font-bold text-xl">{rideData.fare}</p>
          </div>
            <span className="text-md font-bold ml-1">Cash</span>
        </div>

      
        <div className="mt-6">
          <button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                       text-white font-semibold text-lg py-3 rounded-xl shadow-md"
          >
            Happy Journey!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
