const express = require("express");
const app = express();
const mysql2 = require("mysql2");
app.use("/assets", express.static(__dirname + "/assets"));
const ejs = require("ejs");
const sha256 = require("crypto-js/sha256");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
});

connection.connect((error) => {
  if (error) throw error;
  else console.log("Connected to database successfully");
});
connection.query("use users");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/compose",(req,res)=>{
  
})

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = sha256(req.body.password).toString();
  function authenticateAdmin() {
    connection.query(
      "select * from users where username='" + username + "'",
      (err, rows) => {
        console.log(rows);
        if (err) throw err;
        if (rows.length === 0) res.send("<h1>Admins Only Access!</h1>");
        else {
          connection.query(
            "select password from users where username='" + username + "'",
            (err, rows) => {
              console.log(rows);
              if (err) throw err;
              Object.keys(rows).forEach((key) => {
                let row = rows[key];
                console.log(row.password);
                console.log(password);
                if (row.password === password) {
                  // localStorage.setItem("ADMIN_LOGIN","1");
                  res.render("compose");
                } else res.send("Please check your password");
              });
            }
          );
        }
      }
    );
  }
  authenticateAdmin();
});

let port = 3000;
app.listen(port, (req, res) => {
  console.log("Connected to server at port 3000");
});
