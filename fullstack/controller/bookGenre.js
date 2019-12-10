var bookGenre = require('../models/bookgenre_model');
class bookGenres {

    constructor() {

    }

    /* GET ALL bookgenres */
    getalldata(req) {
            // console.log('check')

            // console.log('Cookies: ', req.cookies)

            // Cookies that have been signed
            // console.log('Signed Cookies: ', req.signedCookies)


            return new Promise((resolve, reject) => {
                bookGenre.find(function(err, genre) {
                    if (err) reject(err);
                    resolve(genre);
                });
            });
        }
        /* GET SINGLE bookgenres BY ID */
    getsingledata(req) {
            return new Promise((resolve, reject) => {
                bookGenre.findById(req.params.id, function(err, post) {
                    console.log(req.params.id)
                    if (err) reject(err);
                    console.log(err)
                    resolve(post);
                    console.log(post)
                });
            })
        }
        /* SAVE bookgenres */
    postdata(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.name) {
                reject({
                    status: 500,
                    msg: "name required"
                })
            } else {
                bookGenre.find({ "name": req.body.name })
                    .then(data => {
                        console.log("Data: ", data)
                        if (data.length) {
                            reject({
                                status: 500,
                                msg: "name already exists."
                            })
                        } else {
                            bookGenre.create(req.body)
                                .then(result => {
                                    resolve({
                                        status: 200,
                                        msg: "book genre created"
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
            }
        })
    }
}

module.exports = new bookGenres();