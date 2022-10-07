const express = require("express");
const companyCont = require("../controllers/companyController");
const authController = require("../controllers/authController");
const router = express.Router();

// view Rendering below
router.get("/dashboard", companyCont.getChart);

// company CRUD below
router
  .route("/employee")
  .get(companyCont.getEmployee)
  .post(companyCont.postEmployee);

router
  .route("/customer")
  .get(companyCont.getCustomer)
  .post(companyCont.postCustomer);

router.route("/getPieChart").get(companyCont.getPieChart);

module.exports = router;
