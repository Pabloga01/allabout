const apiSpotifyController = {};
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



apiSpotifyController.getAccessToken = (req, res) => {
    client_id = 'd65088e9dbd34323a48d30098ab193de';
    const client_secret = '4822855d4f9b49d781baf0400a94f536';

    const encoded = btoa(client_id + ':' + client_secret);

    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + encoded,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(response => response.json())
        .then(data => {
            const token = data.access_token; // Token de acceso
            accessToken = token;
            return token;

        })
        .catch(error => console.error(error));
}




apiSpotifyController.getPopularSongs = (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };
    fetch('https://api.spotify.com/v1/browse/categories/toplists/playlists?country=fr', options)
        .then(response => response.json())
        .then(data => {
            const tracks = data.tracks.items; // Lista de canciones
            console.log(tracks);
        })
        .catch(error => console.error(error));
}



