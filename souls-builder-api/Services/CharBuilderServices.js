import { ArmorModel } from "../Models/ArmorModel.js";
import { WeaponModel } from "../Models/WeaponModel.js";

// This is our fetchChests service function that is invoked
// by the fetchChestsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 2 (which is all chest pieces). 
const fetchChests = async () => {
    const allChests = await ArmorModel.find({position: 2})
    return allChests
}


// This is our fetchHelmets service function that is invoked
// by the fetchHelmetsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 1 (which is all helmets). 
const fetchHelmets = async () => {
    const allHelmets = await ArmorModel.find({position: 1})
    return allHelmets
}

// This is our fetchHelmets service function that is invoked
// by the fetchHelmetsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 1 (which is all helmets). 
const fetchHands = async () => {
    const allHands = await ArmorModel.find({position: 3})
    return allHands
}

// This is our fetchHelmets service function that is invoked
// by the fetchHelmetsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 1 (which is all helmets). 
const fetchLegs = async () => {
    const allLegs = await ArmorModel.find({position: 4})
    return allLegs
}

// This is our fetchHelmets service function that is invoked
// by the fetchHelmetsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 1 (which is all helmets). 
const fetchWeapons = async () => {
    const allWeapons = await WeaponModel.find({})
    return allWeapons
}

// This is our fetchHelmets service function that is invoked
// by the fetchHelmetsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 1 (which is all helmets). 
const fetchWeapon = async (weaponName) => {
    const singleWeapon = await WeaponModel.find({name: weaponName})
    return singleWeapon
}

export { fetchChests, fetchHelmets, fetchHands, fetchLegs, fetchWeapons, fetchWeapon }