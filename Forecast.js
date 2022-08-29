const weatherData = require("./data/weather.json");
class Forecast {
  obj = { description: ``, date: `` };
  response = [];
  data;

  constructor(data) {
    console.log("Inside Class");
    this.data = data;
    this.extractData();
  }

  extractData = () => {
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
}

module.exports = Forecast;
