const connection = require('./connection');

class Event {
    /**
     * @param {Object} obj object with event values 
     */
    constructor(obj) {
        if (typeof obj !== 'undefined') {
            this._id_event = obj.id_event === undefined ? -1 : obj.id_event;
            this._title = obj.title === undefined ? '' : obj.title;
            this._content = obj.mail === undefined ? '' : obj.content;
            this._id_category = obj.id_category === undefined ? -1 : obj.id_category;
            this._date = obj.date === undefined ? '' : obj.date;
            this._upvotes = obj.upvotes === undefined ? 0 : obj.upvotes;
            this._description = obj.description === undefined ? '' : obj.description;
            this._latitude = obj.latitude === undefined ? '' : obj.latitude;
            this._longitude = obj.longitude === undefined ? '' : obj.longitude;
        }
    }
    //getters
    get id_event() {
        return this._id_event;
    }
    get event() {
        return this;
    }

    async getAllEvents() {
        return new Promise((resolve, reject) => {
            let selectQuery = 'SELECT * FROM event inner join category on event.id_category=category.id_category';
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                try {
                    if (result.length > 0) {
                        resolve(result);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }
}

module.exports = Event;