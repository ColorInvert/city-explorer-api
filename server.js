'use strict'


// .env library access
require('dotenv').config();

//express server library
const express = require('express');

// initializing the express library
const app = express();

const cors = require('cors');

const axios = require('axios');

// Anyone can make a request to our server
app.use(cors());

let PORT = process.env.PORT || 3002;

// default home route
app.get('/', (request, response) => {
  response.send('Hey your default endpoint is working');
});

// console.logs will get logged in terminal and not browser
app.get('/bananas', (req, res) => {
  console.log("Hey Im here");
  res.send('This is bananas')
})

//sends back whole list 
app.get('/list', (req, res) => {
  res.send(lists);
})












class Forecast {

  constructor(day) {

    this.weatherDate = day.datetime;

    this.weatherDescription = day.weather.description;

    this.weatherHigh = day.high_temp;
    this.weatherLow = day.low_temp;

  }
}

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


// handle a /weather request, taking "lat" "lon" and "searchQuery" args
app.get('/weather', async (req, res) => {

  var searchQuery = req.query.searchQuery;


  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=10`

  let weatherData = await axios.get(weatherUrl)
  console.log(weatherData.data.data)
  var forecastArray = weatherData.data.data.map(day => new Forecast(day))

  res.send(forecastArray);

});

app.get('/movies', async (req, res) => {

  var searchQuery = req.query.searchQuery;

  let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

  let movieData = await axios.get(moviesUrl)
  console.log(movieData.data.results)

  var filmographyArray = movieData.data.results.map(film => new Filmography(film))

  console.log(filmographyArray)
  res.send(filmographyArray)




});




class List {
  constructor(type) {
    let newList = lists.lists.find(list => list.listName === type);
    // Deconstructing
    // let {items} = lists.lists.find(list => list.listName === type);
    this.items = newList.items;
  }

  getItems() {
    return this.items.map(item => {
      return { name: item.name, description: item.description }
    })
  }
}

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error)
})

// turns the server on to the port specified
app.listen(PORT, () => console.log(`listening on ${PORT}`))