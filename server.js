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


const getWeather = require('./weather')
const getMovies = require('./movies')


app.get('/weather', getWeather);

app.get('/movies', getMovies);


app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error)
})

// turns the server on to the port specified
app.listen(PORT, () => console.log(`listening on ${PORT}`))