require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const Forecast = require("./Forecast.js");
const Movies = require("./Movies");
server.use(cors());
const PORT = process.env.PORT;
const MemoryData = require("./SaveInMemory");

let memoryData = new MemoryData();

function ServerInit() {
  server.listen(PORT, () => {
    console.log(`Server is up and listening on PORT : ${PORT}`);
  });

  server.get("*", (req, res) => {
    res.send("Error 404, Page Not Found");
  });
}

server.get("/", (req, res) => {
  res.send("<h1>Welcome To City Explorer Home Page</h1>");
});

server.get("/weather", (req, res) => {
  let forecast = new Forecast(req.query);
  let data = forecast.extractDataFromAPI();
  data.then((weatherData) => {
    res.send(weatherData);
  });
});

server.get("/movies", (req, res) => {
  let cityName = req.query.city;

  if (memoryData.CheckIfExists(cityName)) {
    console.log("Getting Data From Memory");
    let data = memoryData.ReadFromMemory(cityName);
    res.send(data);
  } else {
    console.log("Getting Data From API");
    let movies = new Movies(req.query);
    movies.extractDataFromAPI().then((result) => {
      memoryData.SaveToMemory(cityName, result);
      res.send(result);
    });
  }
});

ServerInit();
