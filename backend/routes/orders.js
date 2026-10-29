const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");

// Get order details and its products using order number
router.get("/:orderNumber", (req, res) => {
const { orderNumber } = req.params;


const orderQuery = `
    SELECT *
    FROM orders
    WHERE order_number = ?
    LIMIT 1
`;

db.query(orderQuery, [orderNumber], (err, orderResults) => {
    if (err) {
        console.error("Error fetching order:", err);
        return res.status(500).json({
            success: false,
            message: "Could not fetch order details."
        });
    }

    if (orderResults.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Order not found."
        });
    }

    const order = orderResults[0];

    const itemsQuery = `
        SELECT product_name, quantity, unit_price, item_total
        FROM order_items
        WHERE order_id = ?
    `;

    db.query(itemsQuery, [order.id], (itemsErr, itemsResults) => {
        if (itemsErr) {
            console.error("Error fetching order items:", itemsErr);
            return res.status(500).json({
                success: false,
                message: "Could not fetch order items."
            });
        }

        const trackingQuery = `
            SELECT order_status, status_message, location_name,
                   latitude, longitude, created_at
            FROM order_tracking
            WHERE order_id = ?
            ORDER BY created_at DESC
        `;

        db.query(trackingQuery, [order.id], (trackingErr, trackingResults) => {
            if (trackingErr) {
                console.error("Error fetching tracking:", trackingErr);
                return res.status(500).json({
                    success: false,
                    message: "Could not fetch tracking updates."
                });
            }

            res.json({
                success: true,
                order: order,
                items: itemsResults,
                tracking: trackingResults
            });
        });
    });
});


});


// Create a new order
router.post("/", (req, res) => {
const {
customerName,
customerPhone,
addressLine,
villageCity,
district,
state,
pinCode,
landmark,
items
} = req.body;


if (
    !customerName ||
    !customerPhone ||
    !addressLine ||
    !villageCity ||
    !district ||
    !state ||
    !pinCode ||
    !Array.isArray(items) ||
    items.length === 0
) {
    return res.status(400).json({
        success: false,
        message: "Please provide all required delivery details and order items."
    });
}

// Validate each cart item
for (const item of items) {
    if (
        !Number.isInteger(Number(item.productId)) ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID or quantity."
        });
    }
}

// Fetch actual product prices and stock from the database
const productIds = [...new Set(items.map(item => Number(item.productId)))];
const placeholders = productIds.map(() => "?").join(", ");

db.query(
    `SELECT id, name, price, stock FROM products WHERE id IN (${placeholders})`,
    productIds,
    (productError, products) => {
        if (productError) {
            console.error("Product lookup failed:", productError);
            return res.status(500).json({
                success: false,
                message: "Could not verify products."
            });
        }

        const productMap = new Map(
            products.map(product => [Number(product.id), product])
        );

        const quantities = new Map();

        for (const item of items) {
            const productId = Number(item.productId);
            const quantity = Number(item.quantity);
            quantities.set(
                productId,
                (quantities.get(productId) || 0) + quantity
            );
        }

        const verifiedItems = [];

        for (const [productId, quantity] of quantities) {
            const product = productMap.get(productId);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product ID ${productId} was not found.`
                });
            }

            if (quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} does not have enough stock.`
                });
            }

            const unitPrice = Number(product.price);

            verifiedItems.push({
                productId,
                productName: product.name,
                quantity,
                unitPrice,
                itemTotal: Math.round(unitPrice * quantity * 100) / 100
            });
        }

        const subtotal = Math.round(
            verifiedItems.reduce((sum, item) => sum + item.itemTotal, 0) * 100
        ) / 100;

        const deliveryCharge = Math.round(subtotal * 0.08 * 100) / 100;
        const grandTotal = Math.round((subtotal + deliveryCharge) * 100) / 100;

        const orderNumber = "GC-" + crypto.randomBytes(5).toString("hex").toUpperCase();

        db.beginTransaction(transactionError => {
            if (transactionError) {
                console.error("Transaction failed:", transactionError);
                return res.status(500).json({
                    success: false,
                    message: "Could not start order transaction."
                });
            }

            const orderData = {
                order_number: orderNumber,
                customer_name: customerName,
                customer_phone: customerPhone,
                address_line: addressLine,
                village_city: villageCity,
                district,
                state,
                pin_code: pinCode,
                landmark: landmark || null,
                subtotal,
                delivery_charge: deliveryCharge,
                grand_total: grandTotal,
                delivery_method: "local_delivery",
                order_status: "confirmed"
            };

            db.query("INSERT INTO orders SET ?", orderData, (orderError, result) => {
                if (orderError) {
                    return db.rollback(() => {
                        console.error("Order insert failed:", orderError);
                        res.status(500).json({
                            success: false,
                            message: "Could not save order."
                        });
                    });
                }

                const orderId = result.insertId;

                const saveItems = index => {
                    if (index >= verifiedItems.length) {
                        const trackingData = {
                            order_id: orderId,
                            order_status: "confirmed",
                            status_message: "Your order has been confirmed."
                        };

                        return db.query(
                            "INSERT INTO order_tracking SET ?",
                            trackingData,
                            trackingError => {
                                if (trackingError) {
                                    return db.rollback(() => {
                                        console.error("Tracking insert failed:", trackingError);
                                        res.status(500).json({
                                            success: false,
                                            message: "Could not save initial tracking status."
                                        });
                                    });
                                }

                                db.commit(commitError => {
                                    if (commitError) {
                                        return db.rollback(() => {
                                            console.error("Order commit failed:", commitError);
                                            res.status(500).json({
                                                success: false,
                                                message: "Could not complete order."
                                            });
                                        });
                                    }

                                    res.status(201).json({
                                        success: true,
                                        message: "Order created successfully.",
                                        orderNumber,
                                        subtotal,
                                        deliveryCharge,
                                        grandTotal,
                                        status: "confirmed"
                                    });
                                });
                            }
                        );
                    }

                    const item = verifiedItems[index];

                    db.query(
                        `INSERT INTO order_items
                        (order_id, product_id, product_name, quantity, unit_price, item_total)
                        VALUES (?, ?, ?, ?, ?, ?)`,
                        [
                            orderId,
                            item.productId,
                            item.productName,
                            item.quantity,
                            item.unitPrice,
                            item.itemTotal
                        ],
                        (itemError) => {
                            if (itemError) {
                                return db.rollback(() => {
                                    console.error("Order item insert failed:", itemError);
                                    res.status(500).json({
                                        success: false,
                                        message: "Could not save order products."
                                    });
                                });
                            }

                            // Reduce stock only after a conditional stock check
                            db.query(
                                `UPDATE products SET stock = stock - ?
                                 WHERE id = ? AND stock >= ?`,
                                [item.quantity, item.productId, item.quantity],
                                (stockError, stockResult) => {
                                    if (stockError || stockResult.affectedRows !== 1) {
                                        return db.rollback(() => {
                                            console.error("Stock update failed:", stockError);
                                            res.status(409).json({
                                                success: false,
                                                message: "Stock changed. Please review your cart."
                                            });
                                        });
                                    }

                                    saveItems(index + 1);
                                }
                            );
                        }
                    );
                };

                saveItems(0);
            });
        });
    }
);


});


// Update order delivery status
router.put("/:orderNumber/status", (req, res) => {
    const { orderNumber } = req.params;
    const { status } = req.body;

    const statusMessages = {
    confirmed: "Your order has been confirmed.",
    preparing: "Your order is being prepared.",
    picked_up: "Your order has been picked up.",
    in_transit: "Your order is on the way.",
    out_for_delivery: "Your order is out for delivery.",
    delivered: "Your order has been delivered.",
    cancelled: "Your order has been cancelled."
};

   if (!statusMessages[status]) {
    return res.status(400).json({
        success: false,
        message: "Invalid status. Please use a valid order status."
    });
}

    db.query(
        "SELECT id FROM orders WHERE order_number = ? LIMIT 1",
        [orderNumber],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not find order."
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found."
                });
            }

            const orderId = results[0].id;

            db.beginTransaction(transactionError => {
                if (transactionError) {
                    return res.status(500).json({
                        success: false,
                        message: "Could not start status update."
                    });
                }

                db.query(
                    "UPDATE orders SET order_status = ? WHERE id = ?",
                    [status, orderId],
                    updateError => {
                        if (updateError) {
                            return db.rollback(() => {
                                res.status(500).json({
                                    success: false,
                                    message: "Could not update order status."
                                });
                            });
                        }

                        db.query(
                            "INSERT INTO order_tracking (order_id, order_status, status_message) VALUES (?, ?, ?)",
                            [orderId, status, statusMessages[status]],
                            trackingError => {
                                if (trackingError) {
                                    return db.rollback(() => {
                                        res.status(500).json({
                                            success: false,
                                            message: "Could not save tracking update."
                                        });
                                    });
                                }

                                db.commit(commitError => {
                                    if (commitError) {
                                        return db.rollback(() => {
                                            res.status(500).json({
                                                success: false,
                                                message: "Could not complete update."
                                            });
                                        });
                                    }

                                    res.json({
                                        success: true,
                                        message: statusMessages[status],
                                        status
                                    });
                                });
                            }
                        );
                    }
                );
            });
        }
    );
});



module.exports = router;
