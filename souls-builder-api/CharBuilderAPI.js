import express from "express"; 
import cors from "cors";
import "./connect.js";
import { fetchChests, fetchHelmets, fetchHands, fetchLegs, fetchWeapons, fetchWeapon } from "./Services/CharBuilderServices.js";

const app = express(); 

app.use(express.json());
app.use(cors());


//R - fetchChestsEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting chest pieces from DB"
async function fetchChestsEndpoint(request,response){
    try {
        const chests = await fetchChests();
        return response.status(200).json(chests);
    } catch (error) {
        return response.status(500).send({ error: "Error getting chest pieces from DB", details: error.message })
    }
};

app.get('/fetchChests', fetchChestsEndpoint);


//R - fetchHelmetEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting helmets from DB"
async function fetchHelmetsEndpoint(request,response){
    try {
        const helmets = await fetchHelmets();
        return response.status(200).json(helmets);
    } catch (error) {
        return response.status(500).send({ error: "Error getting helmets from DB", details: error.message })
    }
};

app.get('/fetchHelmets', fetchHelmetsEndpoint);

//R - fetchHandsEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting hands from DB"
async function fetchHandsEndpoint(request,response){
    try {
        const hands = await fetchHands();
        return response.status(200).json(hands);
    } catch (error) {
        return response.status(500).send({ error: "Error getting hands from DB", details: error.message })
    }
};

app.get('/fetchHands', fetchHandsEndpoint);

//R - fetchLegsEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting legs from DB"
async function fetchLegsEndpoint(request,response){
    try {
        const legs = await fetchLegs();
        return response.status(200).json(legs);
    } catch (error) {
        return response.status(500).send({ error: "Error getting legs from DB", details: error.message })
    }
};

app.get('/fetchLegs', fetchLegsEndpoint);

//R - fetchWeaponsEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting weapons from DB"
async function fetchWeaponsEndpoint(request,response){
    try {
        const weapons = await fetchWeapons();
        return response.status(200).json(weapons);
    } catch (error) {
        return response.status(500).send({ error: "Error getting weapons from DB", details: error.message })
    }
};

app.get('/fetchWeapons', fetchWeaponsEndpoint);

//R - fetchWeaponEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting weapon from DB"
    async function fetchWeaponEndpoint(request,response){
        try {
            const { weaponName } = request.query;
            const weapon = await fetchWeapon(weaponName);
            return response.status(200).json(weapon);
        } catch (error) {
            return response.status(500).send({ error: "Error getting weapon from DB", details: error.message })
        }
    };
    
    app.get('/fetchWeapon', fetchWeaponEndpoint);

//sets variable PORT to the port number we are using, 1234
let PORT = 1234;

//opens the PORT and listening for requests - logs this information
//uses function() callback function that will execute once the server starts listening on the specified PORT.
app.listen(PORT, function(){
    console.log("Listening at port:", PORT);
})