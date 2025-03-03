const axios = require("axios");
const captainModel = require('../models/captain.model')

//  Function to convert address to lat/lng
module.exports.getCoordinates = async (address) => {
    try {
        const apiKey = process.env.TOMTOM_API_KEY;
        const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}`;

        const response = await axios.get(url);
        const results = response.data.results;

        if (!results || results.length === 0) {
            throw new Error(`Location not found: ${address}`);
        }

        return results[0].position; // Returns { lat: 33.6844, lon: 73.0479 }
    } catch (error) {
        throw new Error(`Could not fetch coordinates for ${address}`);
    }
};

//  Function to get distance & travel time
module.exports.getDistanceTime = async (pickup, destination) => {
    try {
        const apiKey = process.env.TOMTOM_API_KEY;

        // 🔹 Convert addresses to coordinates
        const pickupCoordinates = await this.getCoordinates(pickup);
        const destinationCoordinates = await this.getCoordinates(destination);

        // 🔹 Call TomTom Routing API
        const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${pickupCoordinates.lat},${pickupCoordinates.lon}:${destinationCoordinates.lat},${destinationCoordinates.lon}/json?key=${apiKey}`;

        const response = await axios.get(routeUrl);

        if (!response.data.routes || response.data.routes.length === 0) {
            throw new Error("No route found");
        }

        const route = response.data.routes[0];

        return {
            distanceInKm: (route.summary.lengthInMeters / 1000).toFixed(2) + " km",
            travelTimeInMinutes: (route.summary.travelTimeInSeconds / 60).toFixed(2) + " minutes"
        };
    } catch (error) {
        throw new Error("Could not fetch route details");
    }
};


//  Function to get location suggestions
module.exports.getSuggestion = async (input) => {
    try {
        const apiKey = process.env.TOMTOM_API_KEY;
        const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(input)}.json?key=${apiKey}`;

        const response = await axios.get(url);
        const results = response.data.results;

        if (!results || results.length === 0) {
            return []
        }
        return results.map((place) => place.address.freeformAddress); // Extracts readable addresses
    } catch (error) {
        
        throw new Error("Could not fetch suggestions");
    }
};

module.exports.getCaptainsInRadius = async (lng, ltd, radius) => {
    try {
        if(!ltd || !lng || !radius){
            console.log("Latitude, Longitude and Radius are required")
        }
        console.log(ltd,lng,radius)
      // radius is in  km
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371]
                }
            }
        });
        return captains;
    } catch (error) {
        throw new Error(error.message);
    }
};

