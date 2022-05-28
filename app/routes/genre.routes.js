const {ensureAuthenticated} = require('../middlewares/auth.middleware.js')
module.exports = app => {
    const genre = require("../controllers/genre.controller.js");
  
    var router = require("express").Router();

    // Retrieve all genre
    router.get("/",ensureAuthenticated, genre.getAll);
  
  
    app.use('/api/genre', router);
  };
  