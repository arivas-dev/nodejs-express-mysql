const User = require('../models/user.model');

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!Object.keys(req.body).length) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Book
    const user = new User({
        name : req.body.name,
        dui : req.body.dui,
        telephone : req.body.telephone,
        id_rol : req.body.id_rol,
        password : req.body.password,
        email : req.body.email,
        last_login : req.body.last_login,
    });

    // Save Tutorial in the database
    User.create(user, (err, data) => {
        if (err) {
            if (err.kind === "user_in_use") {
                res.status(409).send({
                    message: `This email is already in use.`
                });
            } else {
                res.status(500).send({
                    message: `Error creating User with email: ${req.body.email}`
                });
            }
        } else res.send(data);
    });
};


exports.login = (req, res) => {
    // Validate request
    if (!Object.keys(req.body).length) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }

    // Create a Book
    const user = new User({
        password : req.body.password,
        email : req.body.email,
    });

    // Save Tutorial in the database
    User.login(user, (err, data) => {
        if (err) {
            if (err.kind === "bad_credentials") {
                res.status(409).send({
                    message: `Email or password is incorrect.`
                });
            } else {
                res.status(500).send({
                    message: s
                });
            }
        } else res.send(data);
    });
};



exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};


exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    });
};


// exports.delete = (req, res) => {
//     Book.remove(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Book with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete Book with id " + req.params.id
//                 });
//             }
//         } else res.send({ message: `Book was deleted successfully!` });
//     });
// };

// // Find a single Book by Id
// exports.findOne = (req, res) => {
//     Book.findById(req.params.id, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Book with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error retrieving Book with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     });
//   };
