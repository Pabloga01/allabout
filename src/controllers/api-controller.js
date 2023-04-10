const apiController = {};
const { select } = require('../models/operations');
const { querySelectAllUsers } = require('../models/User');
const express = require("express");
const app = express();
const User = require('../models/User');
const Event = require('../models/Event');
const Publication= require('../models/Publication');

const storage = require('node-sessionstorage')


//select queries all tables
apiController.getAllUsers = (req, res) => {
    let user = new User();
    (async () => {
        let allUsers = await user.getAllUsers();
        if (typeof allUsers !== 'undefined' && allUsers != false) {
            res.json(allUsers);
        }
    })()
};

apiController.getAllEvents = (req, res) => {
    let event = new Event();
    (async () => {
        let allEvents = await event.getAllEvents();
        if (typeof allEvents !== 'undefined' && allEvents != false) {
            res.json(allEvents);
        }
    })()
};

apiController.getAllPublications = (req, res) => {
    let publication = new Publication();
    (async () => {
        let allPublications = await publication.getAllPublications();
        if (typeof allPublications !== 'undefined' && allPublications != false) {
            res.json(allPublications);
        }
    })()
};


//insert operations all tables
apiController.insertUser = (req, res) => {
    let user = new User();
    (async () => {
        let insert = await user.insertUser(req.body);
        if (typeof insert !== 'undefined' && insert != false) {
            res.json(insert);
        }
    })()
};

apiController.insertEvent = (req, res) => {
    let event = new Event();
    (async () => {
        let insertEvent = await event.insertEvent(req.body);
        if (typeof insertEvent !== 'undefined' && insertEvent != false) {
            res.json(insertEvent);
        }
    })()
};

apiController.insertPublication = (req, res) => {
    let publication = new Publication();
    (async () => {
        let insertPublication = await publication.insertPublication(req.body);
        if (typeof insertPublication !== 'undefined' && insertPublication != false) {
            res.json(insertPublication);
        }
    })()
};


//update operations all tables
apiController.updateUser = (req, res) => {
    let user = new User();
    (async () => {
        let allUsers = await user.updateUser(req.body);
        if (typeof allUsers !== 'undefined' && allUsers != false) {
            res.json(allUsers);
        }
    })()
};

apiController.updateEvent = (req, res) => {   
    let event = new Event();
    (async () => {
        let allEvents = await event.updateEvent(req.body);
        if (typeof allEvents !== 'undefined' && allEvents != false) {
            res.json(allEvents);
        }
    })()
};

apiController.updatePublication = (req, res) => {
    let publication = new Publication();
    (async () => {
        let allPublications = await publication.updatePublication(req.body);
        if (typeof allPublications !== 'undefined' && allPublications != false) {
            res.json(allPublications);
        }
    })()
};


//delete operations for user,events and publications
apiController.deleteUser = (req, res) => {
    let user = new User({ mail: req.params.mail });
    (async () => {
        const userQ = await user.getUserByMail();
        let deletedUser = await user.deleteUser(userQ._id_user);
        if (deletedUser != false) {
            res.json(true);
        } else {
            res.json(false);
        }
    })()
};
apiController.deleteEvent = (req, res) => {
    let event = new Event({ _id_event: req.params.id });
    (async () => {
        let deletedUser = await event.deleteEvent(req.params.id);
        if (deletedUser != false) {
            res.json(true);
        } else {
            res.json(false);
        }
    })()
};
apiController.deletePublication = (req, res) => {
    let publication = new Publication({ _id_publication: req.params.id });
    (async () => {
        let deletedUser = await publication.deletePublication(req.params.id);
        if (deletedUser != false) {
            res.json(true);
        } else {
            res.json(false);
        }
    })()
};



//queries
apiController.userquerybymail = (req, res) => { 
    const user = new User({ mail: req.params.mail });
    (async () => {
        const userQ = await user.getUserByMail();
        if (userQ != false) {
            res.json(userQ);
        } else {
            res.json(false);
        }
    })()
}

apiController.eventQueryById = (req, res) => { 
    const event = new Event({ id_event: req.params.id });
    (async () => {
        const eventQ= await event.getEventById();
        if (eventQ != false) {
            res.json(eventQ);
        } else {
            res.json(false);
        }
    })()
}

apiController.publicationQueryById = (req, res) => { 
    const publication = new Publication({ id_publication: req.params.id });
    (async () => {
        const publicationQ= await publication.getPublicationById();
        if (publicationQ != false) {
            res.json(publicationQ);
        } else {
            res.json(false);
        }
    })()
}

apiController.usersByCountry = (req, res) => { 
    const user = new User();
    (async () => {
        const publicationQ= await user.getUserCountriesCount();
        if (publicationQ != false) {
            res.json(publicationQ);
        } else {
            res.json(false);
        }
    })()
}

apiController.publicationsByCategory = (req, res) => { 
    const publication = new Publication();
    (async () => {
        const publicationQ= await publication.getPublicationCategoriesCount();
        if (publicationQ != false) {
            res.json(publicationQ);
        } else {
            res.json(false);
        }
    })()
}


module.exports = apiController
