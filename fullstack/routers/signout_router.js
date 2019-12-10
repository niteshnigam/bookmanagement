var express = require('express');
var router = express.Router();

function logout(req, res) {
    req.session.destroy(function(err) {
        req.logout();
        res.status(200).json({
            status: 200,
            msg: "Logged out"
        });
    });
}

router.get('/logout', logout)

module.exports = router;