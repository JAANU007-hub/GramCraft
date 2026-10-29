const express = require("express");
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// GET all products
router.get("/", (req, res) => {
const sql = `         SELECT
            id,
            artisan_id,
            name,
            description,
            price,
            stock,
            category,
            image_url,
            created_at
        FROM products
        ORDER BY created_at DESC
    `;


db.query(sql, (error, results) => {
    if (error) {
        console.error("Fetch products error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not fetch products."
        });
    }

    return res.status(200).json({
        success: true,
        count: results.length,
        products: results
    });
});


});

// POST a new product (artisans only)
router.post("/", verifyToken, (req, res) => {
// Check whether the logged-in user is an artisan
if (req.user.user_type !== "artisan") {
return res.status(403).json({
success: false,
message: "Only artisans can add products."
});
}


const { name, description, price, stock, category, image_url } = req.body;

// Validate required fields
if (!name || price === undefined || price === null || price === "") {
    return res.status(400).json({
        success: false,
        message: "Product name and price are required."
    });
}

const productName = name.trim();
const productPrice = Number(price);
const productStock = stock === undefined ? 0 : Number(stock);

if (!productName || productName.length > 150) {
    return res.status(400).json({
        success: false,
        message: "Product name must be between 1 and 150 characters."
    });
}

if (!Number.isFinite(productPrice) || productPrice <= 0) {
    return res.status(400).json({
        success: false,
        message: "Price must be a number greater than zero."
    });
}

if (
    !Number.isInteger(productStock) ||
    productStock < 0
) {
    return res.status(400).json({
        success: false,
        message: "Stock must be a non-negative whole number."
    });
}

const sql = `
    INSERT INTO products
    (artisan_id, name, description, price, stock, category, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

const values = [
    req.user.id,
    productName,
    description || null,
    productPrice,
    productStock,
    category || null,
    image_url || null
];

db.query(sql, values, (error, result) => {
    if (error) {
        console.error("Add product error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not add product."
        });
    }

    return res.status(201).json({
        success: true,
        message: "Product added successfully!",
        product: {
            id: result.insertId,
            artisan_id: req.user.id,
            name: productName,
            description: description || null,
            price: productPrice,
            stock: productStock,
            category: category || null,
            image_url: image_url || null
        }
    });
});


});


// GET products added by the logged-in artisan
router.get("/my-products", verifyToken, (req, res) => {
// Allow only artisans to access this route
if (req.user.user_type !== "artisan") {
return res.status(403).json({
success: false,
message: "Only artisans can view their own products."
});
}


const sql = `
    SELECT
        id,
        artisan_id,
        name,
        description,
        price,
        stock,
        category,
        image_url,
        created_at
    FROM products
    WHERE artisan_id = ?
    ORDER BY created_at DESC
`;

db.query(sql, [req.user.id], (error, results) => {
    if (error) {
        console.error("Fetch artisan products error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not fetch your products."
        });
    }

    return res.status(200).json({
        success: true,
        count: results.length,
        products: results
    });
});

});

// PUT: Update an existing product (artisan only)
router.put("/:id", verifyToken, (req, res) => {
// Only artisans can update products
if (req.user.user_type !== "artisan") {
return res.status(403).json({
success: false,
message: "Only artisans can update products."
});
}

const productId = Number(req.params.id);

if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
        success: false,
        message: "Invalid product ID."
    });
}

const { name, description, price, stock, category, image_url } = req.body;

// Check required fields
if (!name || price === undefined || price === null || price === "") {
    return res.status(400).json({
        success: false,
        message: "Product name and price are required."
    });
}

if (typeof name !== "string" || !name.trim() || name.trim().length > 150) {
    return res.status(400).json({
        success: false,
        message: "Product name must be between 1 and 150 characters."
    });
}

const productPrice = Number(price);
const productStock = stock === undefined ? 0 : Number(stock);

if (!Number.isFinite(productPrice) || productPrice <= 0) {
    return res.status(400).json({
        success: false,
        message: "Price must be greater than zero."
    });
}

if (!Number.isInteger(productStock) || productStock < 0) {
    return res.status(400).json({
        success: false,
        message: "Stock must be a non-negative whole number."
    });
}

const sql = `
    UPDATE products
    SET name = ?, description = ?, price = ?, stock = ?,
        category = ?, image_url = ?
    WHERE id = ? AND artisan_id = ?
`;

const values = [
    name.trim(),
    description || null,
    productPrice,
    productStock,
    category || null,
    image_url || null,
    productId,
    req.user.id
];

db.query(sql, values, (error, result) => {
    if (error) {
        console.error("Update product error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not update product."
        });
    }

    if (result.affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: "Product not found or you do not own this product."
        });
    }

    return res.status(200).json({
        success: true,
        message: "Product updated successfully!"
    });
});

});

// DELETE: Remove a product (artisan only)
router.delete("/:id", verifyToken, (req, res) => {
// Only artisans can delete products
if (req.user.user_type !== "artisan") {
return res.status(403).json({
success: false,
message: "Only artisans can delete products."
});
}


const productId = Number(req.params.id);

if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
        success: false,
        message: "Invalid product ID."
    });
}

const sql = `
    DELETE FROM products
    WHERE id = ? AND artisan_id = ?
`;

db.query(sql, [productId, req.user.id], (error, result) => {
    if (error) {
        console.error("Delete product error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Could not delete product."
        });
    }

    if (result.affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: "Product not found or you do not own this product."
        });
    }

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully!"
    });
});

});


module.exports = router;
