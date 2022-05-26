module.exports = app => {
    const loan = require("../controllers/loan.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new loan
    router.post("/loanBook", loan.loanBook);
  
    // // Retrieve all loans
    router.get("/", loan.getAll);
  
    // // Retrieve all published loans
    // router.get("/published", loans.findAllPublished);
  
    // // Retrieve a single loan with id
    router.get("/:id", loan.findByUser);


    router.put("/:id", loan.returnBook);
  
    // // Update a loan with id
    // router.put("/:id", loans.update);
  
  
    app.use('/api/loan', router);
  };
  