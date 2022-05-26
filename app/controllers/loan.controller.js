const Loan = require('../models/loan.model')


// Find all loans by id_user
exports.findByUser = (req, res) => {
    Loan.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Loan with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Loan with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


exports.getAll = (req, res) => {
    Loan.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving loan."
            });
        else res.send(data);
    });
};


exports.loanBook = (req, res) => {
    // Validate request
    if (!Object.keys(req.body).length) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }

    // Create a Loan
    const loan = new Loan({
        id_book: req.body.id_book,
        id_user: req.body.id_user,
        created_at: req.body.created_at,
        returned_at: req.body.returned_at,
        returned: req.body.returned
    });

    // Save Tutorial in the database
    Loan.loanBook(loan, (err, data) => {
        if (err) {

            if (err.kind === "not_available") {
                res.status(409).send({
                    message: `This book is not available.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the loan."
                });
            }
        } else res.send(data);
    });
};


// Find all loans by id_user
exports.returnBook = (req, res) => {
    Loan.returnBook(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Loan with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error returning Loan with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};