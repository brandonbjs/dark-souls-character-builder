import express from "express"; 
import cors from "cors";
import "./connect.js";
import { fetchHelmets } from "./Services/CharBuilderServices.js";

const app = express(); 

app.use(express.json());
app.use(cors());


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


//sets variable PORT to the port number we are using, 1234
let PORT = 1234;

//opens the PORT and listening for requests - logs this information
//uses function() callback function that will execute once the server starts listening on the specified PORT.
app.listen(PORT, function(){
    console.log("Listening at port:", PORT);
})