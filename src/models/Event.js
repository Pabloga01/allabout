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


    async deleteEvent(id) {
        return new Promise((resolve, reject) => {
            let deleteQuery = "delete from event where id_event=" + id;
            connection.query(deleteQuery, async function (err, result) {
                if (err) return reject(err);
                try {
                    if (result) {
                        resolve(true);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }


    async getEventById() {
        return new Promise((resolve, reject) => {
            let selectQuery = "select * from event where id_event=" + this._id_event;
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                const event = new Event();
                try {
                    event._id_event = result[0].id_event;
                    event._title = result[0].title;
                    event._description = result[0].description;
                    event._content = result[0].content;
                    event._latitude = result[0].latitude;
                    event._longitude = result[0].longitude;
                    event._popularity = result[0].popularity;
                    event._upvotes = result[0].upvotes;
                    event._date = result[0].date;
                    event._id_category = result[0].id_category;
                    if (result.length > 0) {
                        resolve(event);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }

    async insertEvent(object) {
        return new Promise((resolve, reject) => {
            let selectQuery = "insert into event(title,description,content,latitude,longitude,date,id_category,popularity) values('" + object.title + "','" + object.description + "','" + object.content + "'," + object.latitude + "," + object.longitude + ",'" + object.date + "'," + object.id_category+",0)";
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                try {
                    if (result) {
                        resolve(true);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }

    async updateEvent(object) {
        return new Promise((resolve, reject) => {
            let selectQuery = "update event set title='" + object.title + "',content='" + object.content + "',id_category=" + object.id_category + ",date='" + object.date + "',description='" + object.description + "',latitude=" + object.latitude + ",longitude=" + object.longitude + " where id_event = " + object.id_event;
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                try {
                    if (result) {
                        resolve(true);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }





}

module.exports = Event;