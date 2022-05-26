const {ensureAuthenticated} = require('../middlewares/auth.middleware.js')
module.exports = app => {
    const book = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    // Create a new book
    router.post("/",ensureAuthenticated, book.create);
  
    // Retrieve all book
    router.get("/",ensureAuthenticated, book.getAll);
  
    // // Retrieve a single book with id
    router.get("/:id", ensureAuthenticated,book.findOne);
  
    // // Update a book with id
    router.put("/:id",ensureAuthenticated, book.update);
  
    // // Delete a book with id
    router.delete("/:id",ensureAuthenticated, book.delete);

  
    app.use('/api/book', router);
  };
  