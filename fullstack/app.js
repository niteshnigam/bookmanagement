var express = require('express');
var app = express();
var mongoose = require('mongoose');
// const redis = require('redis');
// const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser')



const signin_route = require('./routers/signin_router')
const signup_router = require("./routers/signup_routers");
// const authRouter = require('./routers/signin_router');
// const passport = require('./controller/passport_signin_controller');
const bookGenre = require('./routers/bookGenre_router');
const books = require('./routers/books_router');
const logout = require('./routers/signout_router');
const review = require('./routers/bookReview_router');

//--------------------------------------------------------------------------------------------------------//

// let RedisStore = require('connect-redis')()
// let client = redis.createClient({
//     host: '127.0.0.1',
//     port: 6379,
//     prefix: 's'
// })

// -------------------------------------------------------------------------------------------------------//

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:qwerty12345@mycluster-vjppd.mongodb.net/Books-managing?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,

    }).then(() =>
        console.log('mongodb connection successfull')
    )
    .catch((err) =>
        console.error(err)
    );
//------------------------------------------------------------------------------------------------------//

app.use(cors({
    domain: 'localhost:4200'
}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cookieParser())
    // app.use(
    //     session({
    //         store: new RedisStore({
    //             client
    //         }),
    //         secret: 'lucifer',
    //         saveUninitialized: false,
    //         resave: false,
    //         cookie: { domain: false }
    //     })
    // )

// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());

app.use('/', signin_route);
app.use('/book', books);
app.use('/signup', signup_router);
app.use('/genre', bookGenre);
// app.use('/auth', authRouter(passport)); //Pass configured passport to auth router
app.use('/user', logout)
app.use('/bookreview', review)

app.use(require('connect-flash')());

module.exports = app;