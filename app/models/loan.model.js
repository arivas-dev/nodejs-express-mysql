const sql = require("./db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// constructor
const Loan = function (loan) {
    this.id_book = loan.id_book,
        this.id_user = loan.id_user,
        this.created_at = loan.created_at,
        this.returned_at = loan.returned_at,
        this.returned = loan.returned
};

//Fin by user Id
Loan.findById = (id, result) => {
    sql.query(`SELECT * FROM loan WHERE id_user = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, { data: res });
            return;
        }

        // not found Loan with the id
        result({ kind: "not_found" }, null);
    });
};


Loan.getAll = result => {
    sql.query(`SELECT loan.*,user.name as user,book.title FROM loan 
    inner join user on user.id = loan.id_user
    inner join book on book.id = loan.id_book`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("book: ", data);
        result(null, { data: data });
    });
};

Loan.loanBook = (loan, result) => {

    sql.query(`SELECT count(*) as cantidad FROM loan where id_book = ${loan.id_book} AND returned = 0`, async (err, cant) => {


        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (cant.length) {
            const loan_quantity = cant[0]['cantidad']
            sql.query(`SELECT * FROM book where id = ${loan.id_book}`, (err, book) => {
                const copies_available = book[0]['copies_available']
                if (err) {
                    console.log("error:: ", err);
                    result(err, null);
                    return;
                }
                console.log("sql.query  -  loan_quantity", loan_quantity,copies_available);



                if (loan_quantity < copies_available) {
                    sql.query("INSERT INTO loan SET ?", loan, (err, insert) => {
                        console.log("sql.query  -  err", err);
                        if (err) {
                            console.log("error:::", err);
                            result(err, null);
                            return
                        }

                        sql.query(
                            `UPDATE user SET created_at = now() WHERE id = '${insert.insertId}'`
                        );

                        result(null, { id: insert.insertId, ...loan });

                    });
                } else {
                    result({ kind: 'not_available' }, null);
                }
            })
        } else {
            sql.query("INSERT INTO loan SET ?", loan, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                result(null, { id: res.insertId, ...book });
            });
        }

    })
};
Loan.returnBook = (id, result) => {

    sql.query(`SELECT *  FROM loan where id = ${id}`, async (err, data) => {

        if (err) {
            result(err, null);
            return;
        }
        if (data.length) {
            sql.query(`
            UPDATE loan SET returned_at = now(),returned = 1 WHERE id = ${id}`,
                (err, updated) => {
                console.log("sql.query  -  data", updated);

                    if (err) {
                        console.log("error:: ", err);
                        result(err, null);
                        return;
                    }



                    result(null, { data: data.length ? data[0] : [] });

                })
        } else {
            result({ kind: 'not_found' }, null);
        }

    })
};


module.exports = Loan;