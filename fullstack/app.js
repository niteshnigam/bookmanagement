var express = require('express');
var app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser')



const signin_route = require('./routers/signin_router')
const signup_router = require("./routers/signup_routers");
const bookGenre = require('./routers/bookGenre_router');
const books = require('./routers/books_router');
const logout = require('./routers/signout_router');
const review = require('./routers/bookReview_router');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:########@mycluster-vjppd.mongodb.net/Books-managing?retryWrites=true&w=majority', {
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
app.use(flash());

app.use('/', signin_route);
app.use('/book', books);
app.use('/signup', signup_router);
app.use('/genre', bookGenre);
app.use('/user', logout)
app.use('/bookreview', review)

app.use(require('connect-flash')());

module.exports = app;
