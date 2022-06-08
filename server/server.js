require("dotenv").config();
const express = require("express"); // pulling express package
const app = express(); // instance to express
const cors = require("cors"); // cors instance
// const PORT = process.env.PORT; // our port number for API calls
const posts = require("./routes/PostRoute");

app.use(cors());



const Post = require("./models/Post"); // manipulate our post entries 

// We can use the FindOne method to fin dpost by author name!
// all() must be used after where()

// Mongoose
const mongoose = require("mongoose"); // pull in mongoose
mongoose.connect(process.env.MONGODB_URL); // connect to the mongoDB with mongoose connect method
const db = mongoose.connection; // db instance to mongoose connection method
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", _ => {
  console.log("We're connected!");
});


//heroku test s
app.get('/hello', (req, res) => {
  res.send('Hello!');
})
// =========== CRUD implementations ============= //



// Read ALL Posts (Read)

// The find methods retrieve all the documents of a collection when an empty object is passed.
// The find() method has two parameters – an object and a callback function. Here, we are passing an empty object.
//testing back to front confirmation
app.get("/home", (req, res) => {
  Post.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// Find ALL posts by Author Name
// STRETCH: Case insensitive
app.get("/all-posts", (req, res) => {
  Post.find({ author: req.query.author }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// Read ONE Post (Read+1)
// I am using the findById method to grab a specfic ID
// Should i use the req.query? let's check...
// set up a route endpoint
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

app.use("/", posts); // these routes require a JWT check

// We need a port to 'listen' to requests on
app.listen(process.env.PORT || 3001);
