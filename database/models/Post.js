const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    
    webSeriesName : String,
    
    genre : String,
    
    ottPlatform : String,

    ratings : String,

    reviews : String,
    
    author : {
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'User',
    	require : true
    },
    image : String,
    
    createdAt : {
        
        type: Date,
        
        default : new Date()
    }
})
                  
const Post = mongoose.model('Post',PostSchema)

module.exports = Post