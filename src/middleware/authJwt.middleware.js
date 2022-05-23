const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            message: "Missing Token!"
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({
                message: "Unauthorized Token!"
            });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    verifyToken,
}