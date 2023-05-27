const apiOpenWeatherMap = {};



const storage = require('node-sessionstorage')

let accessToken = "";



apiOpenWeatherMap.getCitiesByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const country = req.params.country;

    fetchRetry('https://countriesnow.space/api/v0.1/countries',50,250)
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


    fetchRetry(apiUrl, 50, 250)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        }).catch(error => console.error(error));
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


module.exports = apiOpenWeatherMap;