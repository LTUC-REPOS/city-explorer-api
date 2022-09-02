class MemoryData {
  data = {}; // obj

  /*
    data = { 
        amman : [{},{},{},{}],  
        paris : [{},{},{},{}]
    }

  */
  SaveToMemory = (cityName, dataFromAxious) => {
    let city = cityName.toLowerCase();
    this.data[city] = dataFromAxious;
  };

  ReadFromMemory = (cityName) => {
    let city = cityName.toLowerCase();
    return this.data[city];
  };

  CheckIfExists = (cityName) => {
    let city = cityName.toLowerCase();
    return this.data.hasOwnProperty(city);
  };
}

module.exports = MemoryData;
