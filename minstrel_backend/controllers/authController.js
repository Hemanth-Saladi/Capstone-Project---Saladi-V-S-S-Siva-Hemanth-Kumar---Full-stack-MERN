const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// SIGNUP

exports.signup = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// LOGIN

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // ADMIN LOGIN
        if (email === "admin@minstrel.com" && password === "admin123") {
            return res.json({
                token: "admin-token",
                user: {
                    username: "Admin",
                    email: "admin@minstrel.com",
                    role: "admin"
                }
            });
        }

        // USER LOGIN
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            "minstrel_secret",
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                ...user._doc,
                role: "user"
            }
        });

    } catch (error) {

        res.status(500).json(error);

    }

};