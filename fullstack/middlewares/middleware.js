const jwt = require('jsonwebtoken')

function middleware(req, res, next) {
    try {
        const jwt_token = req.headers.authorization;
        jwt.verify(jwt_token, 'SECRET', function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    "error": true,
                    msg: 'UNAUTHORIZED ACCESS'
                })
            } else {
                console.log(decoded.payload)
                req.decoded = decoded
                next();
            }
        })
    } catch (error) {
        return res.status(401).json({
            msg: "auth failed"
        })
    }


}

function middlewareAdmin(req, res, next) {
    try {
        const jwt_token = req.headers.authorization;
        jwt.verify(jwt_token, 'SECRET', function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    "error": true,
                    msg: 'please login first'
                })
            } else {

                if (decoded.payload.role.toLowerCase() == "admin") {
                    req.decoded = decoded
                    return next();
                } else {
                    return res.status(401).json({
                        status: 401,
                        msg: "UNAUTHORIZED ACCESS"
                    })

                }
            }
        })
    } catch (error) {
        return res.status(401).json({
            msg: "auth failed"
        })
    }

}
module.exports = {
    middleware: middleware,
    middlewareAdmin: middlewareAdmin
}