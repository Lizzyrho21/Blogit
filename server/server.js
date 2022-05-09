require("dotenv").config();
const express = require("express"); // pulling express package
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa'); 



// const { auth } = require('express-oauth2-jwt-bearer');


// const { auth } = require("express-openid-connect"); // For authentication route using Auth0

// const { requiresAuth } = require("express-openid-connect"); // middleware for authentication routes

//Configuration for authentication
// You can generate a suitable string for secret using openssl rand -hex 32 on the command line.
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET_KEY,
//   baseURL: "http://localhost:3001",
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: "https://dev-dub2pki9.us.auth0.com",
// };

// const { auth } = require('express-oauth2-jwt-bearer'); // jwt token

// // Authorization middleware. When used, the Access Token must
// // exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
//     audience: 'http://blogit/api',
//     issuerBaseURL: `https://dev-dub2pki9.us.auth0.com/`,
//   });

//What do I need here?

// Authentication Route
// ======================
// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));
app.use(cors());
app.use(bodyParser.json()); //returns middlewar that only parses json and only looks at requests where Content-type matches the type option!

// Using Auth0
// I need a login route and a logout route!!
// The /login and /logout routes are already provided in the auth route
// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });

// // User Profile Page
// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user)); //sends JSON object of user info
// });



const Post = require("./models/Post");

// We can use the FindOne method to fin dpost by author name!
// all() must be used after where()

// Mongoose
const mongoose = require("mongoose"); // pull in mongoose
mongoose.connect(process.env.MONGODB_URL); // connect to the mongoDB with mongoose connect method
const db = mongoose.connection; // db instance to mongoose connection method
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (_) => {
  console.log("We're connected!");
});

// =====================
// CRUD implementations =================

//PUBLIC ENDPOINTS////
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


// app.use(jwt());
const checkJwt = jwt.expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    // Validate the audience and the issuer.

    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

app.use(checkJwt);




// Create a Post (Create)
// May 2nd, 2022
app.post("/newpost", async (req, res, next) => {
  // We create a new post model object with our fields
  const post = new Post(req.body, (error, data) => {
    if (error) {
        return next(error)
    } else {
        console.log(data)
       
        res.json(data)
    }
})
  // saving our data
  await post.save();
  //sending data as response to server
 
});




///////////

// Update a Post (Update)
// we have the id in the endpoint for end users to click on a button and activate!
app.put("/update/:id", async (req, res) => {
    try{
        // we set a variable to run a method on the Post model, with 3 parameters.
        // id to update, update the body of post with user input, update the post.
        const post = await Post.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true} )
        res.send(post); // send it over!!
    }catch{
        res.status(500); // internal server error check
        res.send({error: "Could not complete your request"});

    }
})



// Delete a Post (Delete)
app.delete("/delete/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete({_id: req.params.id})
        const response = {
            message: "Post deleted successfully",
            post: post
        }
        return res.status(200).send(response);
        
    } catch (error) {
        res.status(500).send(error);
        
    }
})

// We need a port to 'listen' to requests on
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
