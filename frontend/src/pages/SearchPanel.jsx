import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';

const SearchPanel = ({ input, setInput, setPanelOpen, setVehiclePanel }) => {
  const [locations, setLocations] = useState([]); 

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!input || typeof input !== "string" || input.trim() === "") {
        console.warn("Invalid input for suggestions");
        setLocations([]);  // Clear suggestions when input is empty
        return;
      }
    
      try {
        const token = localStorage.getItem("token");
        const baseURL = import.meta.env.VITE_BASE_URL;
        const url = `${baseURL}/maps/get-suggestions`;
    
        const response = await axios.get(url, {
          params: { input: input.trim() },
          headers: { Authorization: `Bearer ${token}` }
        });
    
        // Ensure response contains valid suggestions array
        if (response.data && Array.isArray(response.data.suggestions)) {
          setLocations(response.data.suggestions); 
        } else {
          setLocations([]);
        }
      } catch (error) {
        setLocations([]); // Clear suggestions on error
      }
    };
    fetchSuggestions(); // calling fetch suggestions function
  }, [input]);  // Run when `input` changes
  

  return (
    <div>
      {locations.length > 0 ? (
        locations.map((elem, idx) => (
          <div key={idx}
            onClick={() => {
              setInput(elem);
            }}
            className='flex border-2 active:border-black  gap-2 space-y-2 mt-4 p-2 ml-2 rounded-xl justify-start font-bold'>
            <h1><i className="ri-map-pin-2-fill"></i></h1>
            <div>{elem}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-2"></p>
      )}
    </div>
  );
};

export default SearchPanel;
