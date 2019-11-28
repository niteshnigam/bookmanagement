const passport = require('passport');
const User = require('../models/users_model');
const bcrypt = require("bcrypt");
const flash = require('connect-flash')

const LocalStrategy = require('passport-local').Strategy;

/**
 * Called when user is added into the session.
 * It stores only the unique id of the user into the session.
 */
passport.serializeUser(function(user, done) {
    return done(null, user.id);
})

/**
 * Called when we need the values of the 
 * 
 * It takes the id into the session then finds the user in the database
 * and returns it.
 */
// You can store whole user data into the session to avoid calling database for user.
passport.deserializeUser(async function(id, done) {
    try {
        const userObj = await User.findById(id, '-password');
        return done(null, userObj);
    } catch (error) {
        done(error);
    }
})


// Passport Local Strategey
//  passReqToCallback' is set to true to access req object and to set some flash messages in case of any errors.



passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username', // the desired username 'username'
    passwordField: 'password', // the desired password'password'

}, async function(req, username, password, done) {
    // console.log("Async : ", password, username);

    //  Find User
    const userObj = await User.findOne({ "username": username });



    if (userObj && userObj._id) {


        //   Match Password
        console.log("Password: ", password, userObj.password);

        const match = await bcrypt.compare(password, userObj.password);

        console.log("Match: ", match)

        if (match) {

            /** All Set */
            return done(null, {
                id: userObj._id
            })
        }
    }
    req.flash('error', 'Wrong Credentials');


    //   Set error message in flash and call the callback.


    return done(null, false);
}));


module.exports = passport;