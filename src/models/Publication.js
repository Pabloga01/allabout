const connection = require('./connection');

class Publication {
    /**
     * @param {Object} obj object with event values 
     */
    constructor(obj) {
        if (typeof obj !== 'undefined') {
            this._id_publication = obj.id_publication === undefined ? -1 : obj.id_publication;
            this._id_user = obj.id_user === undefined ? -1 : obj.id_user ;
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
    get id_publication() {
        return this._id_publication;
    }
    get publication() {
        return this;
    }

    async getAllPublications() {
        return new Promise((resolve, reject) => {
            let selectQuery = 'SELECT * FROM publication inner join category on publication.id_category=category.id_category inner JOIN user on publication.id_user= user.id_user;';
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

module.exports = Publication;