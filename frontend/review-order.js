// GramCraft — Review Order Page

const REVIEW_CART_KEY = "gramcraftCart";
const REVIEW_DETAILS_KEY = "gramcraftDeliveryDetails";

const reviewItemsContainer = document.getElementById("reviewOrderItems");
const reviewDetailsContainer = document.getElementById("reviewDeliveryDetails");
const reviewQuantity = document.getElementById("reviewQuantity");
const reviewSubtotal = document.getElementById("reviewSubtotal");
const reviewTotal = document.getElementById("reviewTotal");
const reviewMessage = document.getElementById("reviewMessage");
const confirmOrderButton = document.getElementById("confirmOrderButton");
const reviewDeliveryCharge = document.getElementById("reviewDeliveryCharge");



const REVIEW_LANGUAGE_KEY = "gramCraftLanguage";

const reviewTranslations = {
en: {
language: "Language:",
editDelivery: "← Edit Delivery Details",
eyebrow: "ALMOST THERE",
title: "Review your",
titleSpan: "order.",
intro: "Take a moment to check your handmade treasures and delivery details before placing your order.",
products: "Your Selected Products",
productsIntro: "Make sure everything looks right.",
delivery: "Delivery Information",
deliveryIntro: "Where your handmade treasures will arrive.",
editDetails: "✎ Edit delivery details",
lastLook: "ONE LAST LOOK",
summary: "Order Summary",
quantity: "Total Quantity",
subtotal: "Items Subtotal",
charges: "Delivery Charges",
grandTotal: "Grand Total",
deliveryNote: "Delivery charges are calculated as 8% of your product subtotal.",
confirm: "Confirm & Place Order →",
returnCart: "← Return to Cart",
footer: "Made with care. Carried with love. 🌾",
fullName: "Full Name",
phone: "Mobile Number",
address: "House / Building / Street",
city: "Village / City",
district: "District",
state: "State",
pin: "PIN Code",
landmark: "Nearby Landmark",
notProvided: "Not provided",
emptyCart: "Your cart is empty. Please return to the marketplace and add products.",
invalidCart: "Your cart has no valid quantities. Please check your cart.",
missingDetails: "Delivery details were not found. Please return and fill in your details.",
addProducts: "Your cart is empty. Please add products first.",
enterDetails: "Please enter your delivery details first.",
placing: "Placing Your Order...",
orderError: "Unable to place your order.",
generalError: "Something went wrong. Please try again.",
customer: "Customer",
deliveryAddress: "Delivery Address",
productsLabel: "Products",
productsSubtotal: "Products Subtotal",
deliveryCharges: "Delivery Charges (8%)",
successLabel: "GRAMCRAFT ORDER CONFIRMED",
successTitle: "Your Order Has Been Placed!",
successDescription: "Thank you for supporting our local artisans. Your handmade treasures are now part of your journey!",
orderId: "Order ID",
continueShopping: "Continue Shopping →",
successFooter: "Made with care. Carried with love.",
imageUnavailable: "Product image unavailable",
treasure: "Handmade Treasure"
},


hi: {
    language: "भाषा:",
    editDelivery: "← डिलीवरी जानकारी बदलें",
    eyebrow: "बस होने ही वाला है",
    title: "अपने",
    titleSpan: "ऑर्डर की जाँच करें।",
    intro: "ऑर्डर देने से पहले अपने हस्तनिर्मित सामान और डिलीवरी की जानकारी जाँच लें।",
    products: "आपके चुने हुए उत्पाद",
    productsIntro: "जाँच लें कि सभी चीज़ें सही हैं।",
    delivery: "डिलीवरी की जानकारी",
    deliveryIntro: "आपकी हस्तनिर्मित वस्तुएँ यहाँ पहुँचेंगी।",
    editDetails: "✎ डिलीवरी जानकारी बदलें",
    lastLook: "एक आखिरी नज़र",
    summary: "ऑर्डर का सारांश",
    quantity: "कुल मात्रा",
    subtotal: "सामान की उपकुल कीमत",
    charges: "डिलीवरी शुल्क",
    grandTotal: "कुल कीमत",
    deliveryNote: "डिलीवरी शुल्क आपके सामान की कुल कीमत का 8% है।",
    confirm: "ऑर्डर पक्का करें →",
    returnCart: "← कार्ट पर वापस जाएँ",
    footer: "प्यार से बनाया। देखभाल से पहुँचाया। 🌾",
    fullName: "पूरा नाम",
    phone: "मोबाइल नंबर",
    address: "मकान / इमारत / सड़क",
    city: "गाँव / शहर",
    district: "ज़िला",
    state: "राज्य",
    pin: "पिन कोड",
    landmark: "पास की पहचान वाली जगह",
    notProvided: "जानकारी नहीं दी गई",
    emptyCart: "आपका कार्ट खाली है। बाज़ार में वापस जाकर सामान जोड़ें।",
    invalidCart: "आपके कार्ट में सामान की मात्रा सही नहीं है। कृपया जाँचें।",
    missingDetails: "डिलीवरी की जानकारी नहीं मिली। कृपया वापस जाकर जानकारी भरें।",
    addProducts: "आपका कार्ट खाली है। पहले सामान जोड़ें।",
    enterDetails: "कृपया पहले अपनी डिलीवरी की जानकारी भरें।",
    placing: "आपका ऑर्डर दिया जा रहा है...",
    orderError: "ऑर्डर देना संभव नहीं हुआ।",
    generalError: "कुछ गड़बड़ हुई। कृपया फिर कोशिश करें।",
    customer: "ग्राहक",
    deliveryAddress: "डिलीवरी का पता",
    productsLabel: "उत्पाद",
    productsSubtotal: "सामान की उपकुल कीमत",
    deliveryCharges: "डिलीवरी शुल्क (8%)",
    successLabel: "GRAMCRAFT ऑर्डर पक्का हुआ",
    successTitle: "आपका ऑर्डर दे दिया गया है!",
    successDescription: "स्थानीय कारीगरों का समर्थन करने के लिए धन्यवाद। आपके हस्तनिर्मित खज़ाने अब आपके सफ़र का हिस्सा हैं!",
    orderId: "ऑर्डर नंबर",
    continueShopping: "खरीदारी जारी रखें →",
    successFooter: "प्यार से बनाया। देखभाल से पहुँचाया।",
    imageUnavailable: "उत्पाद की तस्वीर उपलब्ध नहीं है",
    treasure: "हस्तनिर्मित खज़ाना"
},

mr: {
    language: "भाषा:",
    editDelivery: "← डिलिव्हरीची माहिती बदला",
    eyebrow: "आता फक्त शेवटचे पाऊल",
    title: "तुमच्या",
    titleSpan: "ऑर्डरची तपासणी करा.",
    intro: "ऑर्डर देण्यापूर्वी तुमच्या हस्तनिर्मित वस्तू आणि डिलिव्हरीची माहिती तपासा.",
    products: "तुम्ही निवडलेल्या वस्तू",
    productsIntro: "सर्व माहिती योग्य आहे याची खात्री करा.",
    delivery: "डिलिव्हरीची माहिती",
    deliveryIntro: "तुमच्या हस्तनिर्मित वस्तू येथे पोहोचतील.",
    editDetails: "✎ डिलिव्हरीची माहिती बदला",
    lastLook: "एक शेवटची नजर",
    summary: "ऑर्डरचा सारांश",
    quantity: "एकूण नग",
    subtotal: "वस्तूंची उपएकूण किंमत",
    charges: "डिलिव्हरी शुल्क",
    grandTotal: "एकूण किंमत",
    deliveryNote: "डिलिव्हरी शुल्क वस्तूंच्या एकूण किमतीच्या 8% आहे.",
    confirm: "ऑर्डर निश्चित करा →",
    returnCart: "← कार्टवर परत जा",
    footer: "काळजीपूर्वक बनवले. प्रेमाने पोहोचवले. 🌾",
    fullName: "पूर्ण नाव",
    phone: "मोबाइल नंबर",
    address: "घर / इमारत / रस्ता",
    city: "गाव / शहर",
    district: "जिल्हा",
    state: "राज्य",
    pin: "पिन कोड",
    landmark: "जवळची ओळखण्याची जागा",
    notProvided: "माहिती दिलेली नाही",
    emptyCart: "तुमचा कार्ट रिकामा आहे. बाजारात परत जाऊन वस्तू जोडा.",
    invalidCart: "कार्टमधील वस्तूंचे प्रमाण योग्य नाही. कृपया तपासा.",
    missingDetails: "डिलिव्हरीची माहिती सापडली नाही. कृपया परत जाऊन माहिती भरा.",
    addProducts: "तुमचा कार्ट रिकामा आहे. आधी वस्तू जोडा.",
    enterDetails: "कृपया आधी डिलिव्हरीची माहिती भरा.",
    placing: "तुमची ऑर्डर दिली जात आहे...",
    orderError: "ऑर्डर देता आली नाही.",
    generalError: "काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.",
    customer: "ग्राहक",
    deliveryAddress: "डिलिव्हरीचा पत्ता",
    productsLabel: "वस्तू",
    productsSubtotal: "वस्तूंची उपएकूण किंमत",
    deliveryCharges: "डिलिव्हरी शुल्क (8%)",
    successLabel: "GRAMCRAFT ऑर्डर निश्चित झाली",
    successTitle: "तुमची ऑर्डर नोंदवली गेली!",
    successDescription: "स्थानिक कारागिरांना पाठिंबा दिल्याबद्दल धन्यवाद. तुमच्या हस्तनिर्मित वस्तू आता तुमच्या प्रवासाचा भाग आहेत!",
    orderId: "ऑर्डर क्रमांक",
    continueShopping: "खरेदी सुरू ठेवा →",
    successFooter: "काळजीपूर्वक बनवले. प्रेमाने पोहोचवले.",
    imageUnavailable: "वस्तूचे छायाचित्र उपलब्ध नाही",
    treasure: "हस्तनिर्मित खास वस्तू"
}


};

function getReviewLanguage() {
const saved = localStorage.getItem(REVIEW_LANGUAGE_KEY) || "en";
return reviewTranslations[saved] ? saved : "en";
}




// Format amounts in Indian Rupees.
function formatRupees(amount) {
return Number(amount || 0).toLocaleString("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 2
});
}

// Safely read saved data.
function readLocalStorage(key) {
try {
const value = JSON.parse(localStorage.getItem(key));
return value;
} catch (error) {
return null;
}
}

// Display a message on the page.
function showReviewMessage(message) {
reviewMessage.textContent = message;
reviewMessage.hidden = false;
}

// Create an image element with a fallback.
function createProductImage(imageUrl, productName) {
const image = document.createElement("img");


image.className = "order-item-image";
image.alt = productName;
image.loading = "lazy";

image.src = imageUrl || "";

image.addEventListener("error", function () {
    image.removeAttribute("src");
    image.alt = "Product image unavailable";
}, { once: true });

return image;


}

// Display products from the saved cart.
function displayReviewProducts(cart) {
reviewItemsContainer.replaceChildren();


let totalQuantity = 0;
let subtotal = 0;

cart.forEach(function (product) {
    const quantity = Math.max(0, Number(product.quantity) || 0);
    const price = Math.max(0, Number(product.price) || 0);
    const productTotal = price * quantity;

    totalQuantity += quantity;
    subtotal += productTotal;

    const item = document.createElement("article");
    item.className = "order-item";

    const name = String(product.name || "Handmade Treasure");

    const image = createProductImage(product.image, name);

    const details = document.createElement("div");
    details.className = "order-item-details";

    const title = document.createElement("h3");
    title.textContent = name;

    const quantityText = document.createElement("p");
    quantityText.textContent =
        `${formatRupees(price)} × ${quantity}`;

    details.append(title, quantityText);

    const total = document.createElement("div");
    total.className = "order-item-price";
    total.textContent = formatRupees(productTotal);

    item.append(image, details, total);
    reviewItemsContainer.appendChild(item);
});

// Calculate delivery charges: 8% of product subtotal
const deliveryCharge = Math.round(subtotal * 0.08 * 100) / 100;

// Calculate final amount including delivery
const grandTotal = subtotal + deliveryCharge;

reviewQuantity.textContent = String(totalQuantity);
reviewSubtotal.textContent = formatRupees(subtotal);
reviewDeliveryCharge.textContent = formatRupees(deliveryCharge);
reviewTotal.textContent = formatRupees(grandTotal);

return cart.length > 0 && totalQuantity > 0;


}

// Display delivery information saved on the previous page.
function displayDeliveryDetails(details) {
reviewDetailsContainer.replaceChildren();


const fields = [
    {
        label: "Full Name",
        value: details.customerName,
        fullWidth: true
    },
    {
        label: "Mobile Number",
        value: details.customerPhone,
        fullWidth: true
    },
    {
        label: "House / Building / Street",
        value: details.addressLine,
        fullWidth: true
    },
    {
        label: "Village / City",
        value: details.villageCity
    },
    {
        label: "District",
        value: details.district
    },
    {
        label: "State",
        value: details.state
    },
    {
        label: "PIN Code",
        value: details.pinCode
    },
    {
        label: "Nearby Landmark",
        value: details.landmark || "Not provided",
        fullWidth: true
    }
];

fields.forEach(function (field) {
    const box = document.createElement("div");
    box.className = "review-detail";

    if (field.fullWidth) {
        box.classList.add("full-width");
    }

    const label = document.createElement("span");
    label.className = "review-detail-label";
    label.textContent = field.label;

    const value = document.createElement("div");
    value.className = "review-detail-value";
    value.textContent = field.value || "Not provided";

    box.append(label, value);
    reviewDetailsContainer.appendChild(box);
});


}

// Load the saved order information.
function loadReviewOrder() {
const cart = readLocalStorage(REVIEW_CART_KEY);
const deliveryDetails = readLocalStorage(REVIEW_DETAILS_KEY);


if (!Array.isArray(cart) || cart.length === 0) {
    showReviewMessage(
        "Your cart is empty. Please return to the marketplace and add products."
    );

    confirmOrderButton.disabled = true;
    return;
}

const hasProducts = displayReviewProducts(cart);

if (!hasProducts) {
    showReviewMessage(
        "Your cart has no valid quantities. Please check your cart."
    );

    confirmOrderButton.disabled = true;
    return;
}

if (!deliveryDetails || !deliveryDetails.customerName) {
    showReviewMessage(
        "Delivery details were not found. Please return and fill in your details."
    );

    confirmOrderButton.disabled = true;
    return;
}

displayDeliveryDetails(deliveryDetails);
confirmOrderButton.disabled = false;


}

// For now, confirm the review page is working.
// Actual order placement and database saving will be implemented next.
// Place the order through the backend API.
confirmOrderButton.addEventListener("click", async function () {
    const cart = readLocalStorage(REVIEW_CART_KEY);
    const deliveryDetails = readLocalStorage(REVIEW_DETAILS_KEY);

    if (!Array.isArray(cart) || cart.length === 0) {
        showReviewMessage("Your cart is empty. Please add products first.");
        return;
    }

    if (!deliveryDetails || !deliveryDetails.customerName) {
        showReviewMessage("Please enter your delivery details first.");
        return;
    }

    // Prevent duplicate orders from repeated clicks.
    confirmOrderButton.disabled = true;
    confirmOrderButton.textContent = "Placing Your Order...";

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerName: deliveryDetails.customerName,
                customerPhone: deliveryDetails.customerPhone,
                addressLine: deliveryDetails.addressLine,
                villageCity: deliveryDetails.villageCity,
                district: deliveryDetails.district,
                state: deliveryDetails.state,
                pinCode: deliveryDetails.pinCode,
                landmark: deliveryDetails.landmark || "",
                items: cart.map(product => ({
                    productId: Number(product.id),
                    quantity: Number(product.quantity)
                }))
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Unable to place your order."
            );
        }

        // Use the actual order details returned by the backend.
        const orderNumber = data.orderNumber;
        const subtotal = Number(data.subtotal);
        const deliveryCharge = Number(data.deliveryCharge);
        const grandTotal = Number(data.grandTotal);

        const orderDetails = {
            orderId: orderNumber,
            customer: deliveryDetails,
            products: cart,
            subtotal: subtotal,
            deliveryCharge: deliveryCharge,
            grandTotal: grandTotal,
            status: data.status,
            placedAt: new Date().toISOString()
        };

        localStorage.setItem(
            "gramcraftLatestOrder",
            JSON.stringify(orderDetails)
        );

        // Clear the cart only after the backend confirms success.
        localStorage.removeItem(REVIEW_CART_KEY);

        // Show the success popup.
        const modal = document.getElementById("orderSuccessModal");

        document.getElementById("successOrderId").textContent =
            orderNumber;

        document.getElementById("successGrandTotal").textContent =
            formatRupees(grandTotal);

        const detailsContainer =
            document.getElementById("successOrderDetails");

        detailsContainer.replaceChildren();

        const customer = document.createElement("p");
        customer.textContent =
            "Customer: " + deliveryDetails.customerName;

        const address = document.createElement("p");
        address.textContent =
            "Delivery Address: " +
            [
                deliveryDetails.addressLine,
                deliveryDetails.villageCity,
                deliveryDetails.district,
                deliveryDetails.state,
                deliveryDetails.pinCode
            ].filter(Boolean).join(", ");

        const items = document.createElement("p");
        items.textContent =
            "Products: " +
            cart.map(product =>
                `${product.name || "Handmade Treasure"} × ${Number(product.quantity)}`
            ).join(", ");

        const subtotalLine = document.createElement("p");
        subtotalLine.textContent =
            "Products Subtotal: " + formatRupees(subtotal);

        const deliveryLine = document.createElement("p");
        deliveryLine.textContent =
            "Delivery Charges (8%): " + formatRupees(deliveryCharge);

        detailsContainer.append(
            customer,
            address,
            items,
            subtotalLine,
            deliveryLine
        );

        // Show the success popup above the entire page.
// Show the success popup above the entire page.
modal.hidden = false;

modal.style.cssText = `
    display: flex !important;
    position: fixed !important;
    inset: 0 !important;
    z-index: 99999 !important;
    justify-content: center;
    align-items: center;
`;

document.body.classList.add("order-modal-open");

requestAnimationFrame(() => {
    modal.scrollIntoView({ block: "center" });
});

console.log("Success modal opened successfully!");

        // Launch confetti.
        const confettiContainer =
            document.getElementById("confettiContainer");
        console.log("Success modal opened successfully!");

        confettiContainer.replaceChildren();

        const confettiColors = [
            "#5C5011",
            "#8A7424",
            "#A43108",
            "#CF6811",
            "#D59F3F",
            "#EBD48F"
        ];

        for (let i = 0; i < 100; i++) {
            const piece = document.createElement("span");

            piece.className = "confetti-piece";
            piece.style.left = Math.random() * 100 + "%";
            piece.style.backgroundColor =
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ];
            piece.style.animationDelay = Math.random() * 2 + "s";
            piece.style.animationDuration =
                2 + Math.random() * 2 + "s";

            confettiContainer.appendChild(piece);
        }

    } catch (error) {
        console.error("Order placement error:", error);

        showReviewMessage(
            error.message ||
            "Something went wrong. Please try again."
        );

    } finally {
        confirmOrderButton.disabled = false;
        confirmOrderButton.textContent = "Confirm & Place Order →";
    }
});

// Continue shopping button
document.getElementById("continueShoppingButton")
    .addEventListener("click", function () {
        window.location.href = "products.html";
    });

loadReviewOrder();
