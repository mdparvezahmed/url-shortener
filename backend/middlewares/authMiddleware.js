const jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();

        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

    } else {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }
}


module.exports = verifyToken;