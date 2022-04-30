require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

const Post = require('./models/Post.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');

  seedPosts();


  async function seedPosts() {
    console.log('seed posts');

    await Post.create({ title: 'The Silent Patient', author: 'Lizzy Rhodes', body: 'a women may or may not have killed her husband and a theapist is determind to make her talk to discover her secrets.' });
    await Post.create({ title: 'Post 2', author: 'Fred', body: 'Heyy First one!!.' });


    console.log('done seeding');

    db.close();

  }
});