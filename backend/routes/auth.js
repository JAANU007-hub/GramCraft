const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, user_type } = req.body;


        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            });
        }

        // Validate user type
        const allowedTypes = ["customer", "artisan"];

        const userType = user_type || "customer";

        if (!allowedTypes.includes(userType)) {
            return res.status(400).json({
                success: false,
                message: "User type must be customer or artisan."
            });
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Require a minimum password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long."
            });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 12);

        const sql = `
        INSERT INTO users (name, email, password, user_type)
        VALUES (?, ?, ?, ?)
    `;

        db.query(
            sql,
            [name.trim(), email.trim().toLowerCase(), hashedPassword, userType],
            (error, result) => {
                if (error) {
                    if (error.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            success: false,
                            message: "This email is already registered."
                        });
                    }

                    console.error("Registration database error:", error.message);

                    return res.status(500).json({
                        success: false,
                        message: "Could not register user."
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: "Registration successful!",
                    user: {
                        id: result.insertId,
                        name: name.trim(),
                        email: email.trim().toLowerCase(),
                        user_type: userType
                    }
                });
            }
        );
    } catch (error) {
        console.error("Registration error:", error.message);

        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred."
        });
    }


});

// Login an existing user
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required."
        });
    }

    // Find user by email
    const sql = `
        SELECT id, name, email, password, user_type
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email.trim().toLowerCase()], async (error, results) => {
        if (error) {
            console.error("Login database error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Login failed. Please try again."
            });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const user = results[0];

        try {
            // Compare entered password with stored password hash
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    user_type: user.user_type
                },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            // Login successful
            return res.status(200).json({
                success: true,
                message: "Login successful!",
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    user_type: user.user_type
                }
            });
        } catch (error) {
            console.error("Password verification failed.");

            return res.status(500).json({
                success: false,
                message: "An unexpected error occurred."
            });
        }
    });
});

module.exports = router;
