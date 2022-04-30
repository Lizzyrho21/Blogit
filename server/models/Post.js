

'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date_created: { type: Date, required: false},
});


const postModel = mongoose.model('post', postSchema);

module.exports = postModel;