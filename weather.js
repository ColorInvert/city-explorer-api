// .env library access
require('dotenv').config();

//express server library
const express = require('express');

// initializing the express library
const app = express();

const axios = require('axios');


class Forecast {

  constructor(day) {

    this.weatherDate = day.datetime;
    this.weatherDescription = day.weather.description;
    this.weatherHigh = day.high_temp;
    this.weatherLow = day.low_temp;




  }
}

async function getWeather(req, res)  {

  var searchQuery = req.query.searchQuery;

  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=10`

  let weatherData = await axios.get(weatherUrl)

  console.log(weatherData.data.data)

  var forecastArray = weatherData.data.data.map(day => new Forecast(day))

  res.send(forecastArray);

};

module.exports = getWeather;