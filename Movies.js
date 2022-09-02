const axios = require("axios");
const MovieModel = require("./Models/MovieModel");
class Movies {
  response = [];
  data;

  constructor(data) {
    this.data = data;
    this.extractDataFromAPI();
  }

  CreateMoviesResponse = (moviesArray) => {
    let result = moviesArray.results.map((movie) => {
      return new MovieModel(
        movie.original_title,
        movie.overview,
        movie.vote_average,
        movie.vote_count,
        movie.poster_path,
        movie.popularity,
        movie.release_date
      );
    });
    return result;
  };

  extractDataFromAPI = async () => {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIES_KEY}&&language=en-US&include_adult=false&page=1`;

    url += " &query=" + this.data.city;
    let moviesData = await axios.get(url);
    let moviesArray = moviesData.data;

    return this.CreateMoviesResponse(moviesArray);
  };
}

module.exports = Movies;
