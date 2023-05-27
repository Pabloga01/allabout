
const apiRedditController = {};


apiRedditController.getRedditCountryPopularPosts = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const country = req.params.country;
    const time = req.params.time;

    fetchRetry("https://www.reddit.com/r/" + country + "/top.json?t=" + time + "&limit=20", 50, 250, {
        headers: { "User-Agent": "myBot/0.0.1", }
    })
        .then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => console.log(error));

}

apiRedditController.getRedditCountryPopularCategories = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const country = req.params.country;

    fetchRetry("https://www.reddit.com/r/" + country + "/about.json", 50, 250, {
        headers: { "User-Agent": "myBot/0.0.1", }
    })
        .then((response) => response.json())
        .then((data) => {

            const categories = data.data.public_description.split("\n");
            console.log(categories);
            res.json(data);
        })
        .catch((error) => console.log(error));

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




module.exports = apiRedditController;