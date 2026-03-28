import jwt from "jsonwebtoken";
import User from "../UserSchema/userSchema.js";

export const jwtAutherMiddleware = async (req, res, next) => {
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
        const user = await User.findById(decode.id).select("-password");
        if (!user) {
            return res.status(400).json({ error: "No user found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ err: "Invalid Token" });
    }
};

export const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRETKEY)
}