const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
// const helmet = require("helmet");
const bodyParser = require("body-parser");
const GlobalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/newAppError");
const companyRouter = require("./routes/companyRouter");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//   service: " ",
//   auth: {
//     user: "ritik.203178101@vcet.edu.in",
//     pass: "Hello@123",
//   },
//   tls: {
//     rejectUnauthorized: false,

//   }
// })
// let mailOption = {
//   from: "ritik.203178101@vcet.edu.in",
//   to: `{users.email}`,
//   subject: "Testing",
//   text: " Email recarding the bussions "
// }

// transporter.sendMail(mailOption, function (err, success) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Email sent successfully');
//   }
// })

// setting views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// serving static files
app.use(express.static(path.join(__dirname, "/public/")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//SET SECURITY HTTP HEADERS
// app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.setHeader("script src 'self'  'https://cdn.tailwindcss.com'");
//   return next();
// });

// ROUTES
app.use("/", viewRouter);
app.use("/", userRouter);
app.use("/", companyRouter);

app.all("*", function (req, res, next) {
  const err = new AppError(`Can't find ${req.originalUrl} in this server!`);
  err.status = "fail";
  err.statusCode = error.statusCode;
  next(err);
});

app.use(GlobalErrorHandler);

module.exports = app;
