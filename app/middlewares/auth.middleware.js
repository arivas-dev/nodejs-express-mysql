var jwt = require("jsonwebtoken");

exports.ensureAuthenticated = function (req, res, next) {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        var token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'the-super-strong-secrect');



        console.log("payload.sub", decoded);
        // req.user = payload.sub;
        console.log("req", req);
        next();
    } catch (error) {
       
        res.status(error.name === 'TokenExpiredError' ? 401 : 500).send({
            message: error.message
        });
    }
};