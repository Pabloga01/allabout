const connection = require('./connection');

class Category {
    /**
     * @param {Object} obj object with event values 
     */
    constructor(obj) {
        if (typeof obj !== 'undefined') {
            this._id_category = obj.id_category === undefined ? -1 : obj.id_category;
            this._cat_name = obj.cat_name === undefined ? '' : obj.cat_name;
            this._description = obj.description === undefined ? '' : obj.description;
            this._popularity = obj.popularity === undefined ? 0 : obj.popularity;
        }
    }

    async getAllCategories() {
        return new Promise((resolve, reject) => {
            let selectQuery = 'SELECT * FROM category ;';
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


    async insertCategory(object) {
        return new Promise((resolve, reject) => {
            let selectQuery = "insert into category (cat_name,description,popularity_cat) values('" + object.cat_name + "','" + object.description + "',0) ";
            console.log(selectQuery);
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



    async deleteCategory(object) {
        return new Promise((resolve, reject) => {
            let selectQuery = 'delete from category where id_category=' + object.id_category;
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


module.exports = Category;