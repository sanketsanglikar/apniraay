const Post = require('../database/models/Post')


module.exports = async (req, res) => {

	if(req.session.userId){
		const posts =await Post.find({author: req.session.userId}).populate('author') 
		
	return res.render('mypost', {posts})
	
}

else{
	return res.redirect('/auth/login')
}
}

	