require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const Forecast = require("./Forecast.js");
const Movies = require("./Movies");
const PORT = process.env.PORT;

server.use(cors());

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

//localhost:50000/weather?city=''&lon=''&lat=''
server.get("/weather", (req, res) => {
  let forecast = new Forecast(req.query);
  let data = forecast.extractDataFromAPI();
  data.then((weatherData) => {
    res.send(weatherData);
  });
});

server.get("/movies", (req, res) => {
  let movies = new Movies(req.query);
  movies.extractDataFromAPI().then((data) => {
    res.send(data);
  });
});

ServerInit();
