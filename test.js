const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node_js_test_blog')

//Post.create({
//    title : 'My second Blog post',
//    description : ' Second Blog Post Description',
//    content : ' Second Bla Bla Bla'
//}, (error,post) => {
//    console.log(error, post)
//})

Post.find({
    title : 'My first Blog post'
}, (error, post) => {
    console.log(error, post)
})