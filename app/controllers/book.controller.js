const Book = require('../models/book.model');

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!Object.keys(req.body).length) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Book
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        copies_available: req.body.copies_available,
        image: req.body.image,
        id_genre: req.body.id_genre,
        id_author: req.body.id_author,
        published: req.body.published,
    });

    // Save Tutorial in the database
    Book.create(book, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    Book.updateById(
        req.params.id,
        new Book(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Book with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Book with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};


exports.getAll = (req, res) => {
    Book.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        else res.send(data);
    });
};


exports.delete = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Book with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Book with id " + req.params.id
                });
            }
        } else res.send({ message: `Book was deleted successfully!` });
    });
};

// Find a single Book by Id
exports.findOne = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Book with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Book with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
