
const apiNewsapi = {};
const express = require("express");
const app = express();



const storage = require('node-sessionstorage')

let accessToken = "";



apiNewsapi.getNewsByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const accessKey = '45f7b165d36148688708f7a7d6cc642e';
    const country = req.params.country;

    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + accessKey;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.articles); // Los titulares de noticias están en la propiedad "articles"
            res.json(data.articles);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

module.exports = apiNewsapi;