require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const Forecast = require("./Forecast.js");

server.use(cors());

function ServerInit() {
  server.get("*", (req, res) => {
    res.send("Error 404, Page Not Found");
  });
}

server.get("/", (req, res) => {
  res.send("<h1>Welcome To Home Page</h1>");
});

//localhost:50000/weather?city=''&lon=''&lat=''
server.get("/weather", (req, res) => {
  let forecast = new Forecast(req.query);
  res.send(forecast.response);
});

ServerInit();
