import { ArmorModel } from "../Models/ArmorModel.js";
import { WeaponModel } from "../Models/WeaponModel.js";
import { RingModel } from "../Models/RingModel.js";
import { SpellModel } from "../Models/SpellModel.js";
import { ItemModel } from "../Models/ItemModel.js";

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

// This is our fetchHands service function that is invoked
// by the fetchHandsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 3 (which is all hands). 
const fetchHands = async () => {
    const allHands = await ArmorModel.find({position: 3})
    return allHands
}

// This is our fetchLegs service function that is invoked
// by the fetchLegsEndpoint() function. It uses the mongoDB
// find() method to find all armor with a position of 4 (which is all legs). 
const fetchLegs = async () => {
    const allLegs = await ArmorModel.find({position: 4})
    return allLegs
}

// This is our fetchWeapons service function that is invoked
// by the fetchWeaponsEndpoint() function. It uses the mongoDB
// find() method to find all weapons in the database weapons collection. 
const fetchWeapons = async () => {
    const allWeapons = await WeaponModel.find({})
    return allWeapons
}

// This is our fetchRings service function that is invoked
// by the fetchRingsEndpoint() function. It uses the mongoDB
// find() method to find all rings in my database ring collection
const fetchRings = async () => {
    const allRings = await RingModel.find({})
    return allRings
}

// This is our fetchSpells service function that is invoked
// by the fetchSpellsEndpoint() function. It uses the mongoDB
// find() method to find all rings in my database ring collection
const fetchSpells = async () => {
    const allSpells = await SpellModel.find({})
    return allSpells
}

// This is our fetchItems service function that is invoked
// by the fetchItemsEndpoint() function. It uses the mongoDB
// find() method to find all items in my database items collection
const fetchItems = async () => {
    const allItems = await ItemModel.find({})
    return allItems
}

export { fetchChests, fetchHelmets, fetchHands, fetchLegs, fetchWeapons, fetchRings, fetchSpells, fetchItems }