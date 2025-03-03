const mapsService = require("../services/maps.services")
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {address} = req.query

    try{
         const coordinates = await mapsService.getCoordinates(address)
         res.status(200).json(coordinates)

    } catch (error) {
    throw new Error("Internal server error");
}
    
}

module.exports.getDistanceTime = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;

        if (!pickup || !destination) {
            return res.status(400).json({ error: "Pickup and destination are required" });
        }
        const distanceTime = await mapsService.getDistanceTime(pickup, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports.getSuggestions = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { input } = req.query;

        if (!input) {
            return res.status(400).json({ error: "input is required" });
        }

        const suggestions = await mapsService.getSuggestion(input);
        return res.status(200).json({ suggestions });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};