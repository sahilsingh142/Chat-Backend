import jwt from "jsonwebtoken";

export const jwtAutherMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split('')[1];
    if (!token) return res.status(401).json({ err: 'Unauthorized' })
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decode;
        next();
    } catch (err) {
        console.log(err);
        res.status.json({ err: "Invalid Token" })
    }
}

export const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRETKEY)
}