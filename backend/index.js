const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require("./routes/login")
const registerRoute = require("./routes/register")
require("dotenv").config();


const client = require("prom-client");

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://user.local",
    credentials: true
}));




mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connection to database successful ! ");
}).catch((err) => {
    console.log("Connection to database has failed ! " + err);
})

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (err) {
    console.error("Erreur metrics:", err);
    res.status(500).send("metrics-error");
  }
});

app.use('/api/auth',registerRoute)
app.use('/api/auth',loginRoute)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening to the PORT : ${PORT}`);
});


