
const apiRedditController = {};


apiRedditController.getRedditCountryPopularPosts = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const country = req.params.country;

    fetch("https://www.reddit.com/r/" + country + "/top.json?t=month&limit=20", {
        headers: {
            "User-Agent": "myBot/0.0.1",
        },
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

    fetch("https://www.reddit.com/r/" + country + "/about.json", {
        headers: {
            "User-Agent": "myBot/0.0.1",
        },
    })
        .then((response) => response.json())
        .then((data) => {

            const categories = data.data.public_description.split("\n");
            console.log(categories);
            res.json(data);
        })
        .catch((error) => console.log(error));

}



module.exports = apiRedditController;