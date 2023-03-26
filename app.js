const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongoDB
const dbURI =
  "mongodb+srv://mahdich:iLK5K8Xu4pKSDevg@cluster0.ecz2c6w.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("64206cd7808a0e028f522bf8")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consecteteur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consecteteur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consecteteur",
    },
  ];
  res.render("index", { title: "home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/create-blog", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
