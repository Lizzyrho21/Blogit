const express = require("express");
const router = express.Router();
const jwt = require("express-jwt"); // jwt instance
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser"); //??
const Post = require("../models/Post");



// What are JWTs?
const checkJwt = jwt.expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.

  aud: process.env.AUTH0_AUDIENCE,
  algorithms: ["RS256"],
});

router.use(bodyParser.json()); //returns middleware that only parses json and only looks at requests where Content-type matches the type option!

// Delete a Post (Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: req.params.id });
    const response = {
      message: "Post deleted successfully",
      post: post,
    };
    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.use(checkJwt);

// Create a Post (Create)
// May 2nd, 2022
router.post("/newpost", async (req, res, next) => {
  // We create a new post model object with our fields
  const post = new Post(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
  // saving our data
  await post.save();
  //sending data as response to server
});

// Update a Post (Update)
// we have the id in the endpoint for end users to click on a button and activate!
router.put("/update/:id", async (req, res) => {
  try {
    // we set a variable to run a method on the Post model, with 3 parameters.
    // id to update, update the body of post with user input, update the post.
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(post); // send it over!!
  } catch {
    res.status(500); // internal server error check
    res.send({ error: "Could not complete your request" });
  }
});

module.exports = router;
