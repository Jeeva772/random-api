const express = require("express");
const mongoose = require("mongoose");
const json = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cron = require('node-cron')

const countryRouter = require("./routes/country");
const countryController = require('./controller/country-controller');

const app = express();// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//adding express router
app.use(countryRouter);

// Connecting to Mongo DB
mongoose.connect('mongodb://mongo1:27017', {useNewUrlParser: true});
const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('database is connected successfully');
});
conn.on('disconnected',() =>{
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

// setup cron job
cron.schedule("* * * * *", () => {
     console.log("Synchronization start");
     countryController.fetchRandomApiData();
     console.log("Synchronization end");
 })

 app.listen(8000, () => {
  console.log("Express server listening on port 8000");
});