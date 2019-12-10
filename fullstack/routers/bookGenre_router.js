const router = require('express').Router();
const bookgenre = require('../controller/bookGenre');
const authMiddleware = require('../middlewares/middleware');


function getAllData(req, res) {

    bookgenre.getalldata(req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        });
}

function getsingledataroute(req, res) {
    bookgenre.getsingledata(req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}



function createbookgenre(req, res) {
    bookgenre.postdata(req)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}


router.get('/getbookgenres', authMiddleware.middleware, getAllData);

router.get('/bookgenres/:id', authMiddleware.middleware, getsingledataroute);

router.post('/createbookgenres', authMiddleware.middlewareAdmin, createbookgenre);


module.exports = router;