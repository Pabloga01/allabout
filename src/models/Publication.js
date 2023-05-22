const connection = require('./connection');

class Publication {
    /**
     * @param {Object} obj object with event values 
     */
    constructor(obj) {
        if (typeof obj !== 'undefined') {
            this._id_publication = obj.id_publication === undefined ? -1 : obj.id_publication;
            this._id_user = obj.id_user === undefined ? -1 : obj.id_user;
            this._content = obj.mail === undefined ? '' : obj.content;
            this._id_category = obj.id_category === undefined ? -1 : obj.id_category;
            this._date = obj.date === undefined ? '' : obj.date;
            this._upvotes = obj.upvotes === undefined ? 0 : obj.upvotes;
            this._description = obj.description === undefined ? '' : obj.description;
            this._latitude = obj.latitude === undefined ? '' : obj.latitude;
            this._longitude = obj.longitude === undefined ? '' : obj.longitude;
            this._country = obj.country === undefined ? '' : obj.country;
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

    async deletePublication(id) {
        return new Promise((resolve, reject) => {
            let deleteQuery = "delete from publication where id_publication=" + id;
            console.log(deleteQuery);
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

    async getPublicationById() {
        return new Promise((resolve, reject) => {
            let selectQuery = "select * from publication where id_publication=" + this._id_publication;
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                const publication = new Publication();
                try {
                    publication._id_publication = result[0].id_publication;
                    publication._content = result[0].content;
                    publication._description = result[0].description;
                    publication._latitude = result[0].latitude;
                    publication._longitude = result[0].longitude;
                    publication._country = result[0].country;
                    publication._popularity = result[0].popularity;
                    publication._upvotes = result[0].upvotes;
                    publication._date = result[0].date;
                    publication._id_user = result[0].id_user;
                    publication._id_category = result[0].id_category;
                    if (result.length > 0) {
                        resolve(publication);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }

    async insertPublication(object) {
        return new Promise((resolve, reject) => {
            console.log(object);
            if (object.latitude === '') object.latitude = 0
            if (object.longitude === '') object.longitude = 0
            if (object.country == undefined) object.country = '';
            let selectQuery = "insert into publication(content,description,latitude,longitude,date,id_category,id_user,country,popularity) values('" + object.content + "','" + object.description + "'," + object.latitude + "," + object.longitude + ",'" + object.date + "'," + object.id_category + "," + object.id_user + ",'" + object.country + "',0)";
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


    async updatePublication(object) {
        return new Promise((resolve, reject) => {
            if (object.country == null) object.country = '';
            let selectQuery = "update publication set content='" + object.content + "',id_category=" + object.id_category + ",id_user=" + object.id_user + ",date='" + object.date + "',description='" + object.description + "',latitude=" + object.latitude + ",longitude=" + object.longitude + " where id_publication = " + object.id_publication;
            console.log(selectQuery)
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

    async getPublicationCategoriesCount() {
        return new Promise((resolve, reject) => {
            let selectQuery = "SELECT count(*) as count,cat_name FROM `publication` inner join category on publication.id_category=category.id_category group by category.id_category;";
            const result = connection.query(selectQuery, async function (err, result) {
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


    async getPublicationByCountry() {
        return new Promise((resolve, reject) => {
            let selectQuery = "SELECT * FROM `publication` inner join user on (publication.id_user=user.id_user) inner join category on(publication.id_category=category.id_category) where publication.country='" + this._country + "'";
            const result = connection.query(selectQuery, async function (err, result) {
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

    async getPublicationsByUserId() {
        return new Promise((resolve, reject) => {
            let selectQuery = "SELECT * from publication where id_user=" + this._id_user;
            const result = connection.query(selectQuery, async function (err, result) {
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