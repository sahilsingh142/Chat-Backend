import jwt from "jsonwebtoken";

export const jwtAutherMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ err: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ err: 'Token missing' });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decode;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ err: "Invalid Token" });
    }
};

export const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRETKEY)
}