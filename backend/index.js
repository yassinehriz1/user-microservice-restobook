const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require("./routes/login")
const registerRoute = require("./routes/register")
const grpcServer = require('./grpc/grpc-server.js'); 
require("dotenv").config();


const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://user.local",
    credentials: true
}));


console.log("Teste marche")


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connection to database successful ! ");
}).catch((err) => {
    console.log("Connection to database has failed ! " + err);
})



app.use('/api/auth',registerRoute)
app.use('/api/auth',loginRoute)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening to the PORT : ${PORT}`);
});


grpcServer.start();