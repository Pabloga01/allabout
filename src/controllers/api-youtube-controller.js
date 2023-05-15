
const apiYoutubeController = {};
const { select } = require('../models/operations');
const apiKey = 'AIzaSyArfQPK7Yrsdj51rT6yhqKcFkdgjJ8ReH8';


apiYoutubeController.getPopularVideosByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const countryCode = req.params.country;
    const maxResults = 50;
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${countryCode}&maxResults=${maxResults}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => console.error(error));
}



apiYoutubeController.getPopularChannelsByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const countryCode = req.params.country;
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&order=subscriberCount&type=channel&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const channelsInSpain = data.items.filter(channel => channel.snippet.country === countryCode);
            const sortedChannels = channelsInSpain.sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount);
            const topChannels = sortedChannels.slice(0, 10);
            console.log(topChannels);
            res.json(topChannels);
        })
        .catch(error => console.error(error));
}


apiYoutubeController.getPopularCategoriesByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    fetch(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=ES&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => {
            console.error(error);
        });
}




module.exports = apiYoutubeController;