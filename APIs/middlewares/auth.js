var jwt = require("jsonwebtoken");


function isAuthenticated(req, res, next) {

    try {

        if (!req.get("X-AUTH-TOKEN")) {
            console.error("token not passed");
            res.status(500).json({
                success: false,
                message: "token not passed"
            });
            return;
        }

        var user_credentials = jwt.verify(req.get("X-AUTH-TOKEN"), process.env.JWT_SECRET_KEY);

        if (user_credentials) {
            req.token = user_credentials;
            next();
        }
        else {
            throw new Error('Invalid Token');
        }
        
    } catch (err) {

        if (err.name == 'TokenExpiredError') {
            err.message = 'Token has expired, Please login again.'
        }
        else {
            console.error(err);
            err.message = 'Invalid Token. Try logging in again.'
        }

        res.status(401).json({
            success: false,
            message: err.message
        });
        return;
    }

}

module.exports = {
    isAuthenticated
}