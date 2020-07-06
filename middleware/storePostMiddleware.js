module.exports = (req, res, next) => {
     if( !(req.files && req.files.image) ||  !req.body.webSeriesName || !req.body.genre || !req.body.ottPlatform ||  !req.body.ratings || !req.body.reviews){
        return res.redirect('/post/new')
     }
     else{
     next()
 }
 }