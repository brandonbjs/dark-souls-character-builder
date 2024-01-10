import { ArmorModel } from "../Models/ArmorModel.js";

// This is our fetchHelmets service function that is invoked
// by the fetchHelmetsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 1 (which is all helmets). 
const fetchHelmets = async () => {
    const allHelmets = await ArmorModel.find({position: 1})
    return allHelmets
}

export { fetchHelmets }