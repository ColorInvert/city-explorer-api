// .env library access
require('dotenv').config();

//express server library
const express = require('express');

// initializing the express library
const app = express();

const axios = require('axios');


class Filmography {

  constructor(film) {

    this.title = film.original_title;
    this.overview = film.overview;
    this.averageVotes = film.vote_average
    this.totalVotes = film.vote_count
    this.imgUrl = film.poster_path
    this.popularity = film.popularity
    this.releaseDate = film.release_date

  }
}

async function getMovies(req, res)  {
  
  var searchQuery = req.query.searchQuery;

  let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

  let movieData = await axios.get(moviesUrl)

  console.log(movieData.data.results)

  var filmographyArray = movieData.data.results.map(film => new Filmography(film))

  console.log(filmographyArray)

  res.send(filmographyArray)

};

module.exports = getMovies;