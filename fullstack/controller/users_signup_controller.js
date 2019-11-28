const users = require('../models/users_model')
const validator = require("./validator_controller");
const passport = require('passport-local')

class User {
    constructor() {

    }
    signup(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.username) {
                reject({
                    status: 500,
                    msg: "username required"
                })
            } else {
                /*
                
                        check username format                
                
                    */
                if (validator.validateUsername(req.body.username)) { //condition for checking format is true or not
                    if (!req.body.password) {
                        reject({
                            status: 500,
                            msg: "password required"
                        })
                    } else {
                        /*
                            
                            Check password format

                        */

                        if (validator.validatePassword(req.body.password)) { //condition for checking format is true or not
                            users.find({ "username": req.body.username })
                                .then(data => {
                                    console.log("Data: ", data)
                                    if (data.length > 0) {
                                        reject({
                                            status: 500,
                                            msg: "Username already exists."
                                        })
                                    } else {
                                        users.create(req.body)
                                            .then(result => {
                                                resolve({
                                                    status: 200,
                                                    msg: "User created"
                                                })
                                            })
                                            .catch(err => {
                                                reject(err)
                                            })
                                    }
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        } else {
                            reject({
                                status: 500,
                                msg: "Password format not matched"
                            })
                        }
                    }
                } else {
                    reject({
                        status: 500,
                        msg: "Username format not matched"
                    })
                }
            }
        })
    }
}

module.exports = new User();