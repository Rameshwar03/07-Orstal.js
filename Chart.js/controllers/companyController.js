const path = require("path");
const mysql = require("mysql");
const catchAsync = require("../utils/catchAsync");
const { json } = require("express");
const AppError = require("../utils/newAppError");

var con = mysql.createConnection({
  host: "localhost",
  user: `${process.env.SQL_USERNAME}`,
  password: `${process.env.SQL_PASSWORD}`,
  database: "crm_database",
});

exports.getChart = catchAsync(async (req, res, next) => {
  res.status(200).render('dash', {
    title: 'Dashboard'
  })
});

exports.postEmployee = catchAsync(async (req, res, next) => {
  // Rights own only by HR of company
  // empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid
  var Query = "INSERT INTO employee VALUES ? ";
  let val = await req.body;
  var result = [];
  for (var i in val) result.push(val[i]);
  con.query(Query, [[result]], (err, data) => {
    if (err) {
      let error = new AppError(err.message);
      error.status = "Fail";
      next(error);
    } else
      res.status(201).json({
        status: "success",
        data: {
          data,
        },
      });
  });
});

// CREATE CUSTOMER
exports.postCustomer = catchAsync(async (req, res, next) => {
  // RIGHTS OWN EMPLOYEE
  var Query = "INSERT INTO customer VALUES ? ";
  let val = await req.body;
  var result = [];
  for (var i in val) result.push(val[i]);
  con.query(Query, [[result]], (err, data) => {
    if (err) {
      let error = new AppError(err.message);
      error.status = "Fail";
      next(error);
    } else
      res.status(201).json({
        status: "success",
        data: {
          data,
        },
      });
  });
});

// GET ALL EMPLOYEE
exports.getEmployee = catchAsync(async (req, res, next) => {
  // Rights own only by HR of company
  var Query = "Select empid,firstname,lastname,title from employee";
  con.query(Query, (err, data) => {
    if (err) {
      let error = new AppError("Employee data not found in databae!");
      (err.status = "Fail"), (err.statusCode = 404), next(error);
    } else {
      res.status(200).json({
        status: "success",
        data: {
          data,
        },
      });
    }
  });
});

// GET ALL CUSTOMER
exports.getCustomer = catchAsync(async (req, res, next) => {
  // Rights own only by Employee of company
  //
  var Query =
    "SELECT custid,companyname,contactname,city,country,fax FROM customer";

  var id = await req.body.empid;

  con.query(Query, (err, data) => {
    if (err) {
      let error = new AppError("Customer data not found in database!");
      (err.status = "Fail"), (err.statusCode = 404), next(error);
    } else if (data.length === 0) {
      res.status(404).json({
        status: "Fail",
        message: "Customer not found",
      });
    } else {
      res.status(200).render('customer', {
        title: 'Customer', data
      })
    }
  });
});

exports.postCustomer = catchAsync(async (req, res, next) => {
  let Query = "INSERT INTO Customer(custid, companyname, contactname, contacttitle, address, city, region, postalcode, country, phone, fax) VALUES ?"
  data = req.body;
  res.status(200).json({
    status: 'success',
    message: "Inserted"
  })
})

exports.getPieChart = catchAsync(async (req, res, next) => {
  let Query =
    "Select productid,custid,empid FROM orderdetail INNER JOIN salesorder WHERE orderdetail.orderid = salesorder.orderid ORDER BY empid ASC";
  con.query(Query, (err, data) => {
    if (err) return next(new AppError("Data not found", 404));
    else {
      res.status(200).json({
        status: "success",
        data,
      });
    }
  });
});

exports.getbarChart = catchAsync(async (req, res, next) => {
  let Query =
    "SELECT category.categoryid,category.categoryname ,product.productid FROM category Inner JOIN product WHERE category.categoryid=product.categoryid ORDER BY categoryid ASC;";
  con.query(Query, (err, data) => {
    if (err) return next(new AppError("Data not found", 404));
    else {
      res.status(200).json({
        status: "success",
        data,
      });
    }
  });
});
