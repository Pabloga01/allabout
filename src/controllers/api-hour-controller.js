const apiHourController = {};
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



apiHourController.getHourByCountry = async (req, res) => {
    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(response => response.json())
        .then(data => {
            const token = data.access_token; // Token de acceso
            accessToken = token;
            return token;

        })
        .catch(error => console.error(error));

    const res = await fetch(`http://worldtimeapi.org/api/timezone/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();

}