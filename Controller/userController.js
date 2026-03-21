import SchemaData from '../UserSchema/userSchema.js';
import { generateToken} from '../Jwt/token.js';

export const signup = async (req, res) => {
    try {
        const userSchemaData = new SchemaData(req.body);
        const saveData = await userSchemaData.save();

        res.status(201).json({ message: "Signup successful", data: saveData })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const matchData = await SchemaData.findOne({ email });
        if (!matchData) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        if (matchData.password !== password) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const payload = {
            id: matchData.id,
            name: matchData.name
        }
        const token = generateToken(payload);
        res.status(201).json({ message: "Login successful", data: matchData, token: token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

export const main = (req, res) => {
    res.json({
        message: "Welcome to Main Section",
        user: req.user,
    });
}
