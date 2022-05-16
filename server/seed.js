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

    await Post.create({ title: 'How To Utilize The MERN Stack', author: 'Lizzy Rhodes', body: 'This is a test example of text!' });
    await Post.create({ title: 'CSS Grid For Beginners', author: 'Fred Johnson', body: 'This is another test example of text. You may update or delete it.' });
    await Post.create({ title: 'React Testing Made Easy', author: 'Maria fourbes', body: 'This is another test example of text. You may update or delete it.' });



    console.log('done seeding');

    db.close();

  }
});