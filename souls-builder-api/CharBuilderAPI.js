import express from "express"; 
import cors from "cors";
import "./connect.js";
// import { addPlayer, fetchPlayers, fetchTeam, findPlayerById, updatePlayer, deletePlayer, resetPlayers } from "./Services/DraftToolService.js";

const app = express(); 

app.use(express.json());
app.use(cors());


// TODO: write endpoints for API





//sets variable PORT to the port number we are using, 1234
let PORT = 1234;

//opens the PORT and listening for requests - logs this information
//uses function() callback function that will execute once the server starts listening on the specified PORT.
app.listen(PORT, function(){
    console.log("Listening at port:", PORT);
})