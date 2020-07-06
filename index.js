const express = require('express')
const expressEdge = require('express-edge')
const edge = require('edge.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

const createPostController = require('./controllers/createPost')

const homePageController = require('./controllers/homePage')

const storePostController = require('./controllers/storePost')

const getPostController = require('./controllers/getPost')

const createUserController = require('./controllers/createUser')

const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')

const myPostController = require('./controllers/myPost')

//const searchResultController = require('./controllers/searchResult')

const app = new express()

//mongoose.connect('mongodb://localhost/node_js_blog')

mongoose.connect('mongodb+srv://apniraay:Sanket*5067@apniraay.hxjnw.gcp.mongodb.net/apniraay?retryWrites=true&w=majority')

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'secret',
    store :  new mongoStore({
        mongooseConnection : mongoose.connection
    })
}))

mongoose.connect('mongodb://localhost/node_js_blog')

const storePostMiddleware = require('./middleware/storePostMiddleware')

const authMiddleware = require('./middleware/auth')

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')




app.use(fileUpload())

app.use(express.static('public'))

app.use(expressEdge.engine)

app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended : true}))

app.use('/post/store', storePostMiddleware)

app.use(connectFlash())

app.use('*', (req, res, next) => {
    edge.global('authentication', req.session.userId)
    next()
})

app.get('/',homePageController)

app.get('/post/new', authMiddleware, createPostController)

app.post('/post/store', authMiddleware, storePostMiddleware ,storePostController)

app.get('/post/:id', getPostController)

app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)

app.get('/auth/login',redirectIfAuthenticated, loginController)

app.post('/users/login',redirectIfAuthenticated, loginUserController)

app.get('/auth/logout',authMiddleware, logoutController)

app.get('/mypost',authMiddleware, myPostController)

//app.get('/searchresult', searchResultController)

app.use((req, res) => res.render('not-found'))

app.listen(process.env.PORT || 5000, () => {
     console.log('App Listening on port: `${process.env.PORT || 5000}`')
 })
