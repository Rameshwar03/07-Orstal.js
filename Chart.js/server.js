const dotenv = require("dotenv");
const mysql = require("mysql");
const port = 3000;

dotenv.config({ path: "config.env" });
const app = require("./app");

con = mysql.createConnection({
  host: "localhost",
  user: `${process.env.SQL_USERNAME}`,
  password: `${process.env.SQL_PASSWORD}`,
  database: "crm_database",
});

con.connect((error) => {
  if (error) {
    console.log(error)
  }
  else {
    console.log("Conncected")
  }
});


app.listen(port || process.env.PORT, () => {
  console.log(
    `App listening on port ${port || process.env.PORT} in ${process.env.NODE_ENV
    }`
  );
});
