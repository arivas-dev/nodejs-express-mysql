const sql = require("./db.js");

// constructor
const Genre = function (genre) {
    this.name = genre.name
};


Genre.getAll = result => {
    sql.query(`SELECT * FROM genre`, (err, data) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, {data : data});
    });
};
module.exports = Genre;