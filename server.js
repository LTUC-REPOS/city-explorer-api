require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const Forecast = require("./Forecast.js");
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
  res.send("<h1>Welcome To Home Page</h1>");
});

//localhost:50000/weather?city=''&lon=''&lat=''
server.get("/weather", (req, res) => {
  let forecast = new Forecast(req.query);
  res.send(forecast.response);
});

ServerInit();
