const express = require("express");
const usersrouter = express.Router();

const users_controller = require('../controller/users_signup_controller')

function signupRoute(req, res) {
    users_controller.signup(req)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

usersrouter.post('/', signupRoute);

module.exports = usersrouter;