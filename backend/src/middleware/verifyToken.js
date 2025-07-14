const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try {
         const token = req.cookies.token;
        console.log("TOKEN IS : ",token);

        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const decoted = jwt.verify(token, JWT_SECRET);
        if(!decoted) {
            return res.status(401).send({ message: "Unauthorized token or not valid" });
        }
        req.userId = decoted.userId;
        req.role = decoted.role;
        next();
    } catch (error) {
        console.error("Error while Verifying Token",error);
        return res.status(401).send({ message: "Unauthorized token " });
    }

}
module.exports = verifyToken;