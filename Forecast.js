const weatherData = require("./data/weather.json");
const axios = require("axios");
const WeatherModel = require("./Models/WeatherModel");
class Forecast {
  obj = { description: ``, date: `` };
  response = [];
  data;

  constructor(data) {
    console.log("Inside Class");
    this.data = data;
    this.extractDataFromAPI();
    console.log("Inside Cnstructor");
    console.log(this.response);
  }

  extractDataFromFile = () => {
    let isCityEmpty = this.data.city == "" || this.data.city == undefined;
    let isLongitudeEmpty = this.data.long == "" || this.data.long == undefined;
    let isLatitudeEmpty = this.data.lat == "" || this.data.lat == undefined;
    let selectedCity = "";

    if (isCityEmpty && isLongitudeEmpty && isLatitudeEmpty) {
      this.response = {
        error: "No Data Provided",
        code: "400",
      };
      return;
    }

    if (!isCityEmpty) {
      selectedCity = weatherData.find((city) => {
        if (city.city_name == this.data.city) {
          return city;
        }
      });
    }

    if (!isLongitudeEmpty && !isLatitudeEmpty) {
      selectedCity = weatherData.find((city) => {
        if (
          parseInt(city.lat) == parseInt(this.data.lat) &&
          parseInt(city.lon) == parseInt(this.data.long)
        ) {
          return city;
        }
      });
    }

    if (selectedCity == "" || selectedCity == undefined) {
      this.response = {
        error: "Sorry, Can't Find any data, try again later",
        code: "401",
      };

      return;
    }

    this.response = selectedCity.data.map((info) => {
      let obj = {
        description: `Low of ${info.low_temp}, high of ${info.max_temp} with ${info.weather.description}`,
        date: info.datetime,
      };
      return obj;
    });
  };

  CreateWeatherResponse = (selectedCity) => {
    let foreCast = selectedCity.data.map((info) => {
      return new WeatherModel(
        info.low_temp,
        info.max_temp,
        info.weather.description,
        info.datetime
      );
    });
    return foreCast;
  };

  extractDataFromAPI = async () => {
    let isCityEmpty = this.data.city == "" || this.data.city == undefined;
    let isLongitudeEmpty = this.data.long == "" || this.data.long == undefined;
    let isLatitudeEmpty = this.data.lat == "" || this.data.lat == undefined;
    let selectedCity = "";
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}`;
    if (isCityEmpty && isLongitudeEmpty && isLatitudeEmpty) {
      this.response = {
        error: "No Data Provided",
        code: "400",
      };
      return;
    }

    if (!isCityEmpty) {
      url += "&city=" + this.data.city;
      let weartherRes = await axios.get(url);
      selectedCity = weartherRes.data;
    }

    if (!isLongitudeEmpty && !isLatitudeEmpty) {
      url += "&lat=" + this.data.lat;
      url += "&lon=" + this.data.long;
      let weartherRes = await axios.get(url);
      selectedCity = weartherRes.data;
    }

    if (selectedCity == "" || selectedCity == undefined) {
      this.response = {
        error: "Sorry, Can't Find any data, try again later",
        code: "401",
      };
      return;
    }
    return this.CreateWeatherResponse(selectedCity);
  };
}

module.exports = Forecast;
