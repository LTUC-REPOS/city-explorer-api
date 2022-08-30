class MovieModel {
  constructor(
    title,
    desc,
    avgVotes,
    totalVotes,
    poster,
    populartiy,
    relaseDate
  ) {
    this.title = title;
    this.overview = desc;
    this.average_votes = avgVotes;
    this.total_votes = totalVotes;
    this.image_url = poster;
    this.popularity = populartiy;
    this.released_on = relaseDate;
  }
}

module.exports = MovieModel;
