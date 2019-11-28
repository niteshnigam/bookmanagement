var express = require('express');
var router = express.Router();
const sigin_controller = require('../controller/signin_controller')
    // var cookieParser = require('cookie-parser')


// module.exports = function(passport) {

//     router.post('/login', passport.authenticate('local', {
//         failureRedirect: '/auth/failed',
//     }), async function(req, res) {

//         // console.log('Cookies: ', req.cookies)
//         res.cookie('name1', 'value1');
//         // res.set
//         // console.log(res.cookie( ));
//         res.status(200).json({
//             status: 200,
//             msg: "Logged In",
//             // cookies: res.cookie
//         })
//     })

//     router.get('/failed', (req, res) => {
//         res.status(500).json({
//             status: 500,
//             msg: "Login Failed."
//         })
//     })

//     return router;
// };

function signinRoutes(req, res) {
    sigin_controller.signin(req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(err.status).json(err);
        })
}

router.post('/signin', signinRoutes);
module.exports = router;