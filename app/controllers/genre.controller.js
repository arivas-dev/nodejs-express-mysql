const Genre = require('../models/genre.model');


exports.getAll = (req, res) => {
    Genre.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving genres."
            });
        else res.send(data);
    });
};
