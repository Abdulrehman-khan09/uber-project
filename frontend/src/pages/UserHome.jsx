import React, { useState, useRef ,useEffect,useContext} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from 'axios';
import SearchPanel from './SearchPanel';
import VehiclePanel from '../components/vehiclePanel';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import DriverWait from '../components/DriverWait';
import DriverPick from '../components/DriverPick';
import 'remixicon/fonts/remixicon.css';
import { UserDataContext } from '../Context/UserContext';
import { SocketContext } from '../Context/SocketContext';
import {useNavigate} from 'react-router-dom'
import LiveTracking from '../components/LiveTracking';


const UserHome = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [driverWaits, setDriverWaits] = useState(false);
  const [driverPick, setDriverPick] = useState(false);
  const [activeInput, setActiveInput] = useState(null); 
  const [findTripBtn, setfindTripBtn] = useState(false)
  const [fare, setfare] = useState({})
  const [vehicleType, setvehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [rideCancel, setrideCancel] = useState(false)
  const navigate = useNavigate()
  

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const DriverWaitPanelRef = useRef(null);
  const DriverPickPanelRef = useRef(null);
  const findTripBtnRef = useRef(null)

     
     // getting user data from context to send in backend socket function for execution
    const {user} = useContext(UserDataContext)
  
     // getting socket object from  socket context to send in backend socket function for execution
     const {Socket} = useContext(SocketContext)
     
   useEffect(() => {
    Socket.emit("join", { userType: "user", userId: user._id});
}, [user])


  // event of socket for confirmation of ride
  Socket.on("ride-confirmed", (data) => {
    setDriverPick(true)
    setDriverWaits(false)
    setConfirmRidePanel(false)
    setVehiclePanel(false)
    setRide(data)
  })

   // socket for ride started

   Socket.on('ride-started', (data) => {
      navigate('/user-riding', { state: { ride: data } })
   })
  
    // socket for cancel ride
     Socket.on('ride-cancelled',(data)=>{
       setConfirmRidePanel(true)
       setDriverPick(false)
       setrideCancel(true)
       setVehiclePanel(false)
     })

  

  
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', padding: 24 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: '0%', padding: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (findTripBtn) {
      gsap.to(findTripBtnRef.current, {display:"flex"});
    } else {
      gsap.to(findTripBtnRef.current,{display:"none"});
      
    }
  }, [findTripBtn]);

  useGSAP(() => {
    if (vehiclePanel)
       gsap.to(vehiclePanelRef.current, { y: "0" });
    else 
    gsap.to(vehiclePanelRef.current, { y: "100%" });
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) 
      gsap.to(ConfirmRidePanelRef.current, { y: "0" });
    else 
     gsap.to(ConfirmRidePanelRef.current, { y: "100%" });
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (driverWaits)
     gsap.to(DriverWaitPanelRef.current, { y: "0" });
    else 
    gsap.to(DriverWaitPanelRef.current, { y: "100%" });
  }, [driverWaits]);

  useGSAP(() => {
    if (driverPick) 
      gsap.to(DriverPickPanelRef.current, { y: "0" });
    else 
    gsap.to(DriverPickPanelRef.current, { y: "100%" });
  }, [driverPick]);



  const submitHandler = (e) => {
    e.preventDefault();
    setPickup('');
    setDestination('');
  };

  async function handleFindTrip  () {
    try {
      
        if(!pickup || !destination){
            alert('fields are required')
        }
        if(pickup && destination){
          setVehiclePanel(true);
          setPanelOpen(false);
        }
       
  
        const token = localStorage.getItem("token");
        const baseURL = import.meta.env.VITE_BASE_URL;
        const url = `${baseURL}/rides/get-fare`;

        // Make the API request
        const response = await axios.get(url, {
            params: { pickup, destination },
            headers: {
               Authorization: `Bearer ${token}`
               }
        });
        setfare(response.data.fare)
    } catch (error) {
        console.error("Error fetching fare:", error.response ? error.response.data : error.message);
    }
};
 
async function createRide  () {
  
  try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}/rides/create`;

      // Make the API request
      const response = await axios.post(url, {
             pickup, 
            destination,
            vehicleType,
      } ,
                 {
                  headers: {
                    Authorization: `Bearer ${token}`
                    }
                 })  
  } catch (error) {
      console.error("Error fetching fare:", error.response ? error.response.data : error.message);
  }
};


  return (
    <div className='h-screen relative overflow-hidden'>
      <p className='font-bold text-2xl absolute top-6 left-8'>Uber</p>
      
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>
      
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[28%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} 
          onClick={()=>{
            setPanelOpen(false)
            setfindTripBtn(false)
          }}
            className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>

          <form className='relative py-3' onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            
            {/* Pickup Input */}
            <input
              onClick={() => {
                setPanelOpen(true);
                setfindTripBtn(true)
                setActiveInput('pickup');
              }}
              required
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location'
            />

            {/* Destination Input */}
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveInput('destination');
                }}
                value={destination}
                required
                onChange={(e) => setDestination(e.target.value)}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                type="text"
                placeholder='Enter your destination'
              />
              </form>

              <div>
              <button 
              ref={findTripBtnRef}
               onClick={()=>{
                handleFindTrip()
               }}
               className="bg-black hidden justify-center text-white font-semibold px-2 py-2 w-full mb-4 rounded-full">Find Trip</button>
              </div>

         
        </div>

        {/* Animated Panels */}
        <div ref={panelRef} className='bg-white h-0'>
          <SearchPanel 
            input={activeInput === 'pickup' ? pickup : destination}
            setInput={activeInput === 'pickup' ? setPickup : setDestination}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div className="panel-container">
        <div ref={vehiclePanelRef} className="vehicle-panel bottom-0 w-full fixed z-10 bg-white translate-y-full">
          <VehiclePanel 
          findTripBtn={setfindTripBtn}
          vehicleType={setvehicleType}
           fare={fare} setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
        </div>
      </div>

      {/* Confirm Ride Panel */}
      <div ref={ConfirmRidePanelRef} className="bottom-0 w-full fixed z-10 bg-white translate-y-full">
        <ConfirmRidePanel
        findTripBtn={setfindTripBtn}
         createRide={createRide}
        rideCancel={rideCancel}
         pickup={pickup}
         destination={destination}
         fare={fare}
         vehicleType={vehicleType}
        setVehiclePanel={setVehiclePanel} setDriverWaits={setDriverWaits} setConfirmRidePanel={setConfirmRidePanel} setPanelOpen={setPanelOpen} />
      </div>

      {/* Driver Wait Panel */}
      <div ref={DriverWaitPanelRef} className="bottom-0 w-full fixed z-10 bg-white translate-y-full">
        <DriverWait 
           pickup={pickup}
           findTripBtn={setfindTripBtn}
           destination={destination}
           fare={fare}
           vehicleType={vehicleType}
        setDriverWaits={setDriverWaits} />
      </div>

      {/* Driver Pick Panel */}
      <div ref={DriverPickPanelRef} className="bottom-0 w-full translate-y-full fixed z-10 bg-white">
        
        <DriverPick setdriverPick={setDriverPick}  
        setVehiclePanel={setVehiclePanel}
        ride={ride} 
        vehicleType={vehicleType}
         findTripBtn={setfindTripBtn} />
      </div>
    </div>
  );
};

export default UserHome;
