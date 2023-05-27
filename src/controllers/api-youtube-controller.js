
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

    fetchRetry(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${countryCode}&maxResults=${maxResults}&key=${apiKey}`, 50, 250)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        }).catch(error => console.error(error));

    // fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${countryCode}&maxResults=${maxResults}&key=${apiKey}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             res.json(data);
    //         })
    //         .catch(error => console.error(error));
}


apiYoutubeController.getPopularChannelsByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const countryCode = req.params.country;

    // fetchRetry(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&order=subscriberCount&type=channel&key=${apiKey}`, 50, 250)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         const channelsInSpain = data.items.filter(channel => channel.snippet.country === countryCode);
    //         const sortedChannels = channelsInSpain.sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount);
    //         const topChannels = sortedChannels.slice(0, 10);
    //         console.log(topChannels);
    //         res.json(topChannels);
    //     })
    //     .catch(error => console.error(error));



    (async () => {
        let arDataChannels = [];

        const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&chart=mostPopular&regionCode=${countryCode}&maxResults=10`;
        const query = await fetch(url)
        const data = await query.json();

        data.items.forEach(async item => {
            const channelId = item.snippet.channelId;
            const url2 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
            const query2 = await fetch(url2)
            const data2 = await query2.json();
            arDataChannels.push(data2);
            if (arDataChannels.length == data.items.length) {

                arDataChannels = arDataChannels.filter((obj, index, self) =>
                    index === self.findIndex((o) =>
                        JSON.stringify(o) === JSON.stringify(obj)
                    )
                );

                res.json(arDataChannels);
            }
        })
    })()


}


apiYoutubeController.getPopularCategoriesByCountry = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    fetchRetry(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=ES&key=${apiKey}`, 50, 250)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => {
            console.error(error);
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





module.exports = apiYoutubeController;