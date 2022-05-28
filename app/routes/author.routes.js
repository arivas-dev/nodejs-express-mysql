const {ensureAuthenticated} = require('../middlewares/auth.middleware.js')
module.exports = app => {
    const author = require("../controllers/author.controller.js");
  
    var router = require("express").Router();

    // Retrieve all author
    router.get("/",ensureAuthenticated, author.getAll);
  
  
    app.use('/api/author', router);
  };
  