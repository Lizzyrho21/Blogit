require('dotenv').config();
const express = require('express'); // pulling express package
const app = express();
const cors = require('cors');
const PORT = process.env.PORT

 const { auth } = require('express-openid-connect'); // For authentication route using Auth0

const { requiresAuth } = require('express-openid-connect'); // middleware for authentication routes


//Configuration for authentication 
// You can generate a suitable string for secret using openssl rand -hex 32 on the command line.
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_KEY,
    baseURL: 'http://localhost:3001',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: 'https://dev-dub2pki9.us.auth0.com'
    };

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
app.use(auth(config));
app.use(cors());

// Using Auth0
// I need a login route and a logout route!!
// The /login and /logout routes are already provided in the auth route
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });

    // User Profile Page
    app.get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user)); //sends JSON object of user info
        });

const Post = require('./models/Post');
        // Homepage 
        // The find methods retrieve all the documents of a collection when an empty object is passed.
        // The find() method has two parameters – an object and a callback function. Here, we are passing an empty object.
        app.get('/home', (req, res) => {
            Post.find({}, function(err, result) {
                if (err) {
                    console.log(err);
                    } else {
                    res.json(result);
                    }
                });
            
        });

    // all() must be used after where()


        // Mongoose
        const mongoose = require('mongoose'); // pull in mongoose
        mongoose.connect(process.env.MONGODB_URL); // connect to the mongoDB with mongoose connect method
        const db = mongoose.connection; // db instance to mongoose connection method
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', _ => {
        console.log('We\'re connected!');
        });

// =====================


// Create a Post (Create)
// April 30th or May 1st


// Read ALL Posts (Read)

// Read ONE Post (Read+1)

// Update a Post (Update)

// Delete a Post (Delete)











// We need a port to 'listen' to requests on
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

