const sql = require("./db.js");

// constructor
const Book = function (book) {
    this.title = book.title;
    this.description = book.description;
    this.copies_available = book.copies_available;
    this.image = book.image;
    this.id_genre = book.id_genre;
    this.id_author = book.id_author;
    this.published = book.published;
};


Book.create = (newBook, result) => {
    sql.query("INSERT INTO book SET ?", newBook, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created book: ", { id: res.insertId, ...newBook });
        result(null, { id: res.insertId, ...newBook });
    });
};

Book.findById = (id, result) => {
    sql.query(`SELECT 
    book.*,author.name as author,
    (SELECT book.copies_available - COUNT(id) FROM loan where book.id = loan.id_book AND loan.returned = 0) as in_stock 
    FROM book inner join author on author.id = book.id_author WHERE book.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found book: ", res[0]);
            result(null, res[0]);
            return;
        }else{
            result({ kind: "not_found" }, null);
        }

        // not found Book with the id
    });
};


Book.getAll = result => {
    sql.query(`SELECT 
                book.*,author.name as author,
                (SELECT book.copies_available - COUNT(id) FROM loan where book.id = loan.id_book AND loan.returned = 0) as in_stock 
                FROM book inner join author on author.id = book.id_author`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("book: ", data);
        result(null, {data : data});
    });
};

Book.updateById = (id, book, result) => {
    sql.query(
        "UPDATE book SET title = ?, description = ?,copies_available = ? WHERE id = ?",
        [book.title, book.description, book.copies_available,id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Book with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated book: ", { id: id, ...book });
            result(null, { id: id, ...book });
        }
    );
};


Book.remove = (id, result) => {
    sql.query("DELETE FROM book WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted book with id: ", id);
        result(null, res);
    });
};

module.exports = Book;