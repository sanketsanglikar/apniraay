const Post = require('../database/models/Post')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const dom = new JSDOM(``, {
//   url: "localhost:4000/",
//   contentType: "text/html"
// });

// console.log(dom.document.getElementById('search').value)


module.exports = async (req , res) => {

    const posts = await Post.find({}).sort({createdAt:-1}).populate('author')

    
    res.render('searchResult', {
               posts
               })
}