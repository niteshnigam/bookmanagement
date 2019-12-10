const router = require('express').Router();
const books = require('../controller/books_controller')
const authMiddleware = require('../middlewares/middleware');



function addBookRoute(req, res) {
    books.addbook(req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

function deletebookRoute(req, res) {
    books.deletebooks(req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

function getAllbooks(req, res) {
    books.getallbook(req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

router.post('/addbook', authMiddleware.middlewareAdmin, addBookRoute);
router.delete('/deletebook/:id', authMiddleware.middlewareAdmin, deletebookRoute);
router.get('/getallbooks', authMiddleware.middleware, getAllbooks)


module.exports = router