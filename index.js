//IMPORTS
import express from "express";
import mysql2 from "mysql2";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { application } from "./firebaseConfig.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

//INITIALIZATION
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const auth = getAuth();

//APP.USE
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//MYSQL CONNECTION
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
//CONNECTION INITIALIZED

//POSTS
let postList;
function renderPostlist() {
  connection.query("select * from posts", (err, results, fields) => {
    if (err) throw err;
    postList = results;
  });
}

//ROUTES INITIALIZATION
app.get("/", (req, res) => {
  renderPostlist();
  res.render("index", { posts: postList });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/compose", (req, res) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      res.render("compose");
    } else {
      res.redirect("/login");
    }
  });
});

//POST ROUTES
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      res.redirect("/compose");
    })
    .catch((error) => {
      res.send("Please check login credentials");
    });
});

app.post("/compose", (req, res) => {
  signOut(auth)
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/compose1", (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.postContent;
  connection.query(
    "INSERT INTO posts (postTitle,postContent) VALUES ('" +
      title +
      "','" +
      content +
      "')",
    (err) => {
      if (err) throw err;
      else {
        res.send("Post added successfully");
      }
    }
  );
});

//SERVER START
let port = 3000;
app.listen(port, () => {
  console.log("Connected to server at port 3000");
});
