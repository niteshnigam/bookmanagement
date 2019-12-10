const books = require('../models/book_model')

class books_controller {
    constructor() {

    }

    addbook(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.bookName) {
                reject({
                    status: 500,
                    msg: "book name required"
                })
            } else {
                if (!req.body.description) {
                    reject({
                        status: 500,
                        msg: "please give description"
                    })
                } else {
                    if (!req.body.genreID) {
                        reject({
                            status: 500,
                            msg: "genre ID required"
                        })
                    } else {
                        books.create(req.body)
                            .then(result => {
                                resolve({
                                    status: 200,
                                    msg: "book is added successfully"
                                })
                            })
                            .catch(err => {
                                reject(err)
                            })
                    }
                }
            }

        })
    }

    deletebooks(req) {
        return new Promise((resolve, reject) => {
            books.findByIdAndRemove(req.params.id, function(err, obj) {
                if (err) reject(err);
                resolve(obj);
            })
        })
    }
    getallbook(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.bookName) {
                books.find(function(err, obj) {
                    if (err) reject(err);
                    resolve(obj);
                });
            } else {
                var reg = new RegExp(req.body.bookName, "g")
                var selector = {
                    "bookName": { $regex: reg, $options: "i" }
                }
                books.find(selector)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        });
    }


}
module.exports = new books_controller();