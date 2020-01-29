const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send(`Access Denied`);

    try{
        req.admin = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
};

