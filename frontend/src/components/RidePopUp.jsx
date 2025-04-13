import LiveTracking from "./LiveTracking";

const RidePopUp = (props) => {
  return (
    <div className=" bg-white">
      

      {/* Ride Details */}
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-3">New Ride Available!</h1>

        <div className="bg-yellow-300 rounded-lg p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrQFFAs5EYXh7vQWpY3BgNOHsLG_QiTQm6g&s"
                alt="Driver"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold capitalize">
              {props.ride?.user.fullname.firstname +
                " " +
                props.ride?.user.fullname.lastname}
            </span>
          </div>
          <span className="font-medium">2.2 KM</span>
        </div>

        {/* Pickup & Destination */}
        <div className="space-y-3 mb-6 ml-6">
          <div className="flex items-center gap-3">
            <h1>
              <i className="ri-map-pin-2-fill"></i>
            </h1>
            <div>
              <div className="font-bold text-xl">562/11-A</div>
              <div className="text-sm">{props.ride?.pickup}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h1>
              <i className="ri-map-pin-2-fill"></i>
            </h1>
            <div>
              <div className="font-bold text-xl">562/11-A</div>
              <div className="text-sm">{props.ride?.destination}</div>
            </div>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center ml-6 gap-3 mb-8">
          <p>
            <i className="text-2xl ri-cash-line"></i>
          </p>
          <div>
            <div className="font-bold text-xl">{props.ride?.fare}</div>
            <div className="text-sm">Cash Cash</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              props.confirmRide();
              props.setConfirmRidePopup(true);
              props.setRidePopUpPanel(false);
            }}
            className="w-full py-3 bg-green-600 text-white rounded-md font-bold"
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-md font-bold"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
