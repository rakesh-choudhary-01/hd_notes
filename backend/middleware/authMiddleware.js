const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token is not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.userId = decoded.userId.id;
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};