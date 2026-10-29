const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
console.log(
    "Loaded auth routes:",
    authRoutes.stack
        .filter((layer) => layer.route)
        .map((layer) => Object.keys(layer.route.methods).join(",").toUpperCase() + " " + layer.route.path)
);
app.post("/api/auth/login-test", (req, res) => {
    res.json({
        success: true,
        message: "GramCraft test route is working!"
    });
});
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Home route
app.get("/", (req, res) => {
res.json({
message: "Welcome to GramCraft!",
status: "Backend is running successfully"
});
});

// Test MySQL database connection
app.get("/test-db", (req, res) => {
db.query("SELECT 1 AS result", (error, results) => {
if (error) {
return res.status(500).json({
success: false,
message: "Database query failed"
});
}


    res.json({
        success: true,
        message: "GramCraft database is working!",
        data: results
    });
});


});

// Protected route to test JWT authentication
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Access granted! Your token is valid.",
        user: req.user
    });
});

// Start server
app.listen(PORT, () => {
console.log(`GramCraft server running at http://localhost:${PORT}`);
});
