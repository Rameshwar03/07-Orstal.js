const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/newAppError");
const { response } = require("express");

var con = mysql.createConnection({
  host: "localhost",
  user: `${process.env.SQL_USERNAME}`,
  password: `${process.env.SQL_PASSWORD}`,
  database: "crm_database",
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};





const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.email);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  // user.userPassword = undefined;
  // user.conFirmPassword = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// First time login
exports.signup = catchAsync(async (req, res, next) => {
  var Query = "INSERT INTO users VALUES ? ";
  let newUser = req.body;
  console.log('newuser: ' + newUser)
  //id	firstName	lastName	email	password
  // if (newUser.password != newUser.email) {
  //   let error = new AppError("Password does not match");
  //   return next(error);
  // }

  let hashPass = await bcrypt.hash(newUser.password, 12);

  newUser.password = hashPass;

  var result = [];
  for (var i in newUser) {
    result.push(newUser[i]);
  }

  con.query(Query, [[result]], (err, data) => {
    if (err) {
      let error = new AppError(err.message);
      error.status = "Fail";
      next(error);
    } else createSendToken(newUser, 201, res);
  });
});

// LOGIN FOR USER
exports.login = catchAsync(async (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return next(new AppError("Incorrect provided email or password", 400));
  }

  let Query = "Select email,password from users where users.email = ? ";

  con.query(Query, [[user.email]], (err, data) => {
    if (err) {
      return next(new AppError(err.message, 400));
    } else {
      if (bcrypt.compare(user.password, data[0].password)) {
        createSendToken(user, 200, res);
      } else {
        return next(new AppError("Error Occurred", 400));
      }
    }
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token = req.headers;
  if (token.cookie) {
    token = token.cookie.split("=")[1];
  } else if (token.authorizaton) {
    token = token.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  } else if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      }
      req.user = decoded;
      return next();
    });
  } else {
    return res.unauthorized();
  }
});

// Logout function is remained to code
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });

  // cookie = req.headers;
  // res.clearCookie("jwt").redirect("/");
});
