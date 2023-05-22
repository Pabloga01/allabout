const apiOpenWeatherMap = {};
const { select } = require('../models/operations');
const { querySelectAllUsers } = require('../models/User');
const express = require("express");
const app = express();
const User = require('../models/User');
const Event = require('../models/Event');
const Publication = require('../models/Publication');
const fs = require('fs');
const geoJson = require('../rsc/geojson.json')


const storage = require('node-sessionstorage')

let accessToken = "";



apiOpenWeatherMap.getCitiesByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const country = req.params.country;
    fetch('https://countriesnow.space/api/v0.1/countries')
        .then(response => response.json())
        .then(data => {
            if (data.data.country === country) res.json(element.cities);
            data.data.forEach(element => {
                if (element.country.toLowerCase() === country.toLowerCase()) {
                    console.log(element.country)
                    res.json(element.cities);
                    return;
                }
            });
        }).catch(error => console.error(error));;

}

apiOpenWeatherMap.getWeatherByCity = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const city = req.params.city;
    const apiKey = 'f55dc6f3eb5aaa59ee508d71cdffa0c8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        }).catch(error => console.error(error));
}




module.exports = apiOpenWeatherMap;