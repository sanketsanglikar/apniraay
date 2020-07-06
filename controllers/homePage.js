const Post = require('../database/models/Post')

module.exports = async (req , res) => {

    const posts = await Post.find({}).sort({createdAt:-1}).populate('author')
    
    res.render('index', {
               posts
               })
}