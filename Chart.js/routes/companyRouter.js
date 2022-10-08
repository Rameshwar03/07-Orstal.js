const express = require("express");
const companyCont = require("../controllers/companyController");
const authController = require("../controllers/authController");
const view = require("../controllers/viewsController");
const router = express.Router();

// view Rendering below
// router.get("/dash", companyCont.getChart);

// company CRUD below
router
  .route("/employee")
  .get(companyCont.getEmployee)
  .post(companyCont.postEmployee);

router
  .route("/customer")
  .get(companyCont.getCustomer)


router.route("/getPieChart").get(companyCont.getPieChart);

router.route("/getbarChart").get(companyCont.getbarChart);


module.exports = router;
