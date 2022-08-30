class WeatherModel {
  constructor(low, high, desc, date) {
    this.description = `Low of ${low}, high of ${high} with ${desc}`;
    this.date = date;
  }
}

module.exports = WeatherModel;
