const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Register new user
const Register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });


    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

//login controller

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email

        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }

        );

        res.status(200).json({ message: "Login successful", token });


    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const Profile = async (req, res) => {
    try{
        const user = { _id: req.user.id, email: req.user.email };
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}




module.exports = { Register, Login, Profile};