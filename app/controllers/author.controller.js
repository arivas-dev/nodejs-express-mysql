const Author = require('../models/genre.model');


exports.getAll = (req, res) => {
    Author.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving author."
            });
        else res.send(data);
    });
};
