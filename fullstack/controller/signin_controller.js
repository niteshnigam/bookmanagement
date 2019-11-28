const bcrypt = require("bcrypt");
const User = require('../models/users_model');
const validator = require("./validator_controller");
const jwt = require("jsonwebtoken")


class signin {
    constructor() {

    }

    signin(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.username) {
                reject({
                    status: 500,
                    msg: "username required"
                })
            } else {
                if (!req.body.password) {
                    reject({
                        status: 500,
                        msg: "password required"
                    })
                } else {
                    if (validator.validateUsername(req.body.username)) {
                        User.findOne({ "username": req.body.username })
                            .then(data => {
                                console.log("Data:", data)
                                if (data) {
                                    bcrypt.compare(req.body.password, data.password)
                                        .then(isMatch => {
                                            if (isMatch) {
                                                let payload = { subject: data.username, id: data.id, role: data.role }
                                                let jwt_token = jwt.sign({
                                                        payload
                                                    },
                                                    'SECRET', {
                                                        expiresIn: "1h"
                                                    }
                                                );
                                                resolve({
                                                    msg: "successfully logged in",
                                                    data: {
                                                        email: req.body.email,
                                                        jwt_token: jwt_token
                                                    }
                                                })
                                            } else {
                                                reject({
                                                    status: 400,
                                                    msg: "Authentication failed"
                                                })
                                            }

                                        })
                                        .catch(err => {
                                            reject(err)
                                        })
                                } else {
                                    reject({
                                        status: 400,
                                        msg: "user not found"
                                    })
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    } else {
                        reject({
                            status: 500,
                            msg: "username format is not correct"
                        })
                    }

                }
            }
        })
    }
}

module.exports = new signin();