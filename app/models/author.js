const sql = require("./db.js");

// constructor
const Author = function (author) {
    this.name = author.name
};


Author.getAll = result => {
    sql.query(`SELECT * FROM author`, (err, data) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, {data : data});
    });
};
module.exports = Author;