const {ensureAuthenticated} = require('../middlewares/auth.middleware.js')
module.exports = app => {
    const loan = require("../controllers/loan.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new loan
    router.post("/loanBook",ensureAuthenticated, loan.loanBook);
  
    // // Retrieve all loans
    router.get("/",ensureAuthenticated, loan.getAll);
  
    // // Retrieve all published loans
    // router.get("/published", loans.findAllPublished);
  
    // // Retrieve a single loan with id
    router.get("/:id", ensureAuthenticated,loan.findByUser);


    router.get("/returnBook/:id",ensureAuthenticated, loan.returnBook);
  
    // // Update a loan with id
    // router.put("/:id", loans.update);
  
  
    app.use('/api/loan', router);
  };
  