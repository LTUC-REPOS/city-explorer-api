require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const weatherData = require("./data/weather.json");
server.use(cors());
const PORT = process.env.PORT;
