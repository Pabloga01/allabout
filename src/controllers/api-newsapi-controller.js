
const apiNewsapi = {};
const express = require("express");
const app = express();


apiNewsapi.getNewsByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const accessKey = '45f7b165d36148688708f7a7d6cc642e';
    const country = req.params.country;

    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + accessKey;

    fetchRetry('https://countriesnow.space/api/v0.1/countries', 50, 250)


    fetchRetry(apiUrl, 50, 250)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.articles); 
            res.json(data.articles);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(url, delay, tries, fetchOptions = {}) {
    function onError(err) {
        triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }
        return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
    }
    return fetch(url, fetchOptions).catch(onError);
}





module.exports = apiNewsapi;