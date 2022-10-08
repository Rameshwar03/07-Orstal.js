const path = require("path");
const catchAsync = require("../utils/catchAsync");
const express = require("express");
const AppError = require("../utils/newAppError");


exports.loginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

exports.signUpPage = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", {
    title: "sign up",
  });
});

exports.landingPage = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../public", "userDashboard.html"));
});

exports.dashboard = catchAsync(async (req, res, next) => {
  res.status(200).render("dashboard", {
    title: "Home",
  });
});

exports.product = catchAsync(async (req, res, next) => {
  let Query = "SELECT * FROM `product`";
  con.query(Query, (err, data) => {
    if (err) {
      let error = new AppError(err.message);
      error.status = "Fail";
      next(error);
    } else
      // res.status(200).json({
      //   status: 'success',
      //   data: {
      //     data
      //   }
      // })
      res.status(200).render('productTable', {
        title: 'Product', data
      })
  });
})

exports.posts = catchAsync(async (req, res, next) => {
  // RIGHTS OWN EMPLOYEE
  var Query = "INSERT INTO posts VALUES ? ";
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


exports.customerPage = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../public", "userDashboard.html"));
})

exports.getEmailPage = catchAsync(async (req, res, next) => {
  res.status(200).render('email')
})