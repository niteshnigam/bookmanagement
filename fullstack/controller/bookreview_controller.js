const review = require('../models/booksreview_model')

class bookReview {
    constructor() {

    }
    addReview(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.Rating) {
                reject({
                    status: 500,
                    msg: "please give ratings"
                })
            } else {
                if (!req.body.description) {
                    reject({
                        status: 500,
                        msg: "please give decription"
                    })
                } else {
                    var obj = {
                        Username: req.decoded.payload.subject,
                        Rating: req.body.Rating,
                        description: req.body.description,
                        // status: 'Submitted'
                    }
                    review.create(obj)
                        .then(data => {
                            resolve({
                                msg: "review submitted",
                                status: 200
                            })
                        })
                        .catch(err => {
                            reject(err)
                        })

                }
            }
        })
    }
}
module.exports = new bookReview();