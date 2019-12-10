const express = require("express");
const router = express.Router();

const bookreview = require('../controller/bookreview_controller')
const authMiddleware = require('../middlewares/middleware');


function bookreviewRoute(req, res) {
    bookreview.addReview(req)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

router.post('/', authMiddleware.middleware, bookreviewRoute);

module.exports = router;