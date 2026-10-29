// GramCraft Shopping Cart

const CART_STORAGE_KEY = "gramcraftCart";

const languageSelect = document.getElementById("languageSelect");

const cartTranslations = {
en: {
language: "Language:",
continueShopping: "← Continue Shopping",
eyebrow: "YOUR LITTLE COLLECTION",
title: "Your Shopping Cart",
intro: "Every handmade treasure carries a little story. Here's what you've picked.",
yourItems: "Your Items",
item: "item",
items: "items",
emptyTitle: "Your cart is waiting for a little love.",
emptyText: "You haven't added any handmade treasures yet.",
explore: "Explore Products →",
summaryEyebrow: "THE TOTAL",
summaryTitle: "Order Summary",
subtotal: "Items subtotal",
delivery: "Delivery",
deliveryNote: "Calculated at checkout",
estimatedTotal: "Estimated total",
summaryNote: "Your final delivery charges will be confirmed before you place your order.",
checkout: "Proceed to Checkout →",
continueExploring: "Continue exploring",
footer: "Made with care. Carried with love. 🌾",
remove: "Remove",
decrease: "Decrease quantity",
increase: "Increase quantity",
handmade: "Handmade",
handmadeProduct: "Handmade product",
handmadeTreasure: "Handmade treasure",
emptyAlert: "Your cart is empty. Please add a product first."
},


hi: {
    language: "भाषा:",
    continueShopping: "← खरीदारी जारी रखें",
    eyebrow: "आपका छोटा-सा संग्रह",
    title: "आपकी शॉपिंग कार्ट",
    intro: "हर हस्तनिर्मित खजाने की अपनी कहानी है। देखें, आपने क्या चुना है।",
    yourItems: "आपके उत्पाद",
    item: "उत्पाद",
    items: "उत्पाद",
    emptyTitle: "आपकी कार्ट आपके इंतज़ार में है।",
    emptyText: "आपने अभी तक कोई हस्तनिर्मित वस्तु नहीं जोड़ी है।",
    explore: "उत्पाद देखें →",
    summaryEyebrow: "कुल राशि",
    summaryTitle: "ऑर्डर का विवरण",
    subtotal: "उत्पादों का कुल मूल्य",
    delivery: "डिलीवरी",
    deliveryNote: "चेकआउट पर गणना होगी",
    estimatedTotal: "अनुमानित कुल राशि",
    summaryNote: "ऑर्डर देने से पहले डिलीवरी शुल्क की पुष्टि की जाएगी।",
    checkout: "चेकआउट करें →",
    continueExploring: "खरीदारी जारी रखें",
    footer: "प्यार और देखभाल से बनाया गया। 🌾",
    remove: "हटाएँ",
    decrease: "मात्रा घटाएँ",
    increase: "मात्रा बढ़ाएँ",
    handmade: "हस्तनिर्मित",
    handmadeProduct: "हस्तनिर्मित उत्पाद",
    handmadeTreasure: "हस्तनिर्मित वस्तु",
    emptyAlert: "आपकी कार्ट खाली है। कृपया पहले कोई उत्पाद जोड़ें।"
},

mr: {
    language: "भाषा:",
    continueShopping: "← खरेदी सुरू ठेवा",
    eyebrow: "तुमचा छोटासा संग्रह",
    title: "तुमची शॉपिंग कार्ट",
    intro: "प्रत्येक हस्तनिर्मित वस्तूची एक गोष्ट असते. तुम्ही निवडलेल्या वस्तू येथे पाहा.",
    yourItems: "तुमच्या वस्तू",
    item: "वस्तू",
    items: "वस्तू",
    emptyTitle: "तुमची कार्ट तुमची वाट पाहत आहे.",
    emptyText: "तुम्ही अजून कोणतीही हस्तनिर्मित वस्तू जोडलेली नाही.",
    explore: "वस्तू पाहा →",
    summaryEyebrow: "एकूण रक्कम",
    summaryTitle: "ऑर्डरचा तपशील",
    subtotal: "वस्तूंची एकूण किंमत",
    delivery: "डिलिव्हरी",
    deliveryNote: "चेकआउटच्या वेळी मोजली जाईल",
    estimatedTotal: "अंदाजे एकूण रक्कम",
    summaryNote: "ऑर्डर देण्यापूर्वी अंतिम डिलिव्हरी शुल्क निश्चित केले जाईल.",
    checkout: "चेकआउट करा →",
    continueExploring: "खरेदी सुरू ठेवा",
    footer: "काळजीपूर्वक बनवलेले. प्रेमाने पोहोचवलेले. 🌾",
    remove: "काढून टाका",
    decrease: "संख्या कमी करा",
    increase: "संख्या वाढवा",
    handmade: "हस्तनिर्मित",
    handmadeProduct: "हस्तनिर्मित वस्तू",
    handmadeTreasure: "हस्तनिर्मित खजिना",
    emptyAlert: "तुमची कार्ट रिकामी आहे. कृपया आधी एखादी वस्तू जोडा."
}


};

function getCartLanguage() {
return localStorage.getItem("gramCraftLanguage") || "en";
}

function applyCartLanguage(language) {
const t = cartTranslations[language] || cartTranslations.en;


document.documentElement.lang = language;
localStorage.setItem("gramCraftLanguage", language);

document.getElementById("languageLabel").textContent = t.language;
document.getElementById("continueShoppingTop").textContent = t.continueShopping;

document.querySelector(".cart-eyebrow").textContent = t.eyebrow;
document.querySelector(".cart-heading h1").innerHTML = `${t.title}<span>.</span>`;
document.querySelector(".cart-heading p").textContent = t.intro;

document.querySelector(".cart-section-heading h2").textContent = t.yourItems;

document.querySelector(".empty-cart h2").textContent = t.emptyTitle;
document.querySelector(".empty-cart p").textContent = t.emptyText;
document.querySelector(".cart-shop-button").textContent = t.explore;

document.querySelector(".summary-eyebrow").textContent = t.summaryEyebrow;
document.querySelector(".cart-summary h2").textContent = t.summaryTitle;

const summaryLines = document.querySelectorAll(".summary-line");
summaryLines[0].children[0].textContent = t.subtotal;
summaryLines[1].children[0].textContent = t.delivery;
summaryLines[1].children[1].textContent = t.deliveryNote;

document.querySelector(".summary-total span").textContent = t.estimatedTotal;
document.querySelector(".summary-note").textContent = t.summaryNote;
document.getElementById("checkoutButton").textContent = t.checkout;
document.querySelector(".back-shopping").textContent = t.continueExploring;
document.querySelector(".market-footer p").textContent = t.footer;

renderCart();


}

function initializeCartLanguage() {
const savedLanguage = getCartLanguage();


if (languageSelect) {
    languageSelect.value = savedLanguage;

    languageSelect.addEventListener("change", function () {
        applyCartLanguage(this.value);
    });
}

applyCartLanguage(savedLanguage);


}


const cartItemsContainer = document.getElementById("cartItems");
const emptyCartMessage = document.getElementById("emptyCart");
const cartItemCount = document.getElementById("cartItemCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");


// Get cart data from localStorage
function getCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY)
        );

        return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
        return [];
    }
}


// Save cart data
function saveCart(cart) {
    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );
}


// Format prices in Indian Rupees
function formatPrice(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN");
}


// Display all cart products
function renderCart() {
    const cart = getCart();
    const t = cartTranslations[getCartLanguage()] || cartTranslations.en;

    cartItemsContainer.replaceChildren();

    let totalQuantity = 0;
    let subtotal = 0;

    cart.forEach(product => {
        const quantity = Math.max(1, Number(product.quantity) || 1);
        const price = Math.max(0, Number(product.price) || 0);

        totalQuantity += quantity;
        subtotal += price * quantity;

        const item = document.createElement("article");
        item.className = "cart-item";

        // Product image
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "cart-item-image";

        if (product.image) {
            const image = document.createElement("img");

            image.src = product.image;
            image.alt = product.name || "Handmade product";
            image.loading = "lazy";

            image.onerror = function () {
                imageWrapper.replaceChildren();

                const fallback = document.createElement("span");
                fallback.textContent = "✿";
                fallback.setAttribute("aria-label", "Product image unavailable");

                imageWrapper.appendChild(fallback);
            };

            imageWrapper.appendChild(image);
        } else {
            const fallback = document.createElement("span");
            fallback.textContent = "✿";
            imageWrapper.appendChild(fallback);
        }

        // Product details
        const details = document.createElement("div");
        details.className = "cart-item-details";

        const category = document.createElement("span");
        category.className = "cart-item-category";
        category.textContent = product.category || t.handmade;

        const name = document.createElement("h3");
        name.className = "cart-item-name";
       name.textContent = product.name || product.title || t.handmadeTreasure;

        const priceText = document.createElement("p");
        priceText.className = "cart-item-price";
        priceText.textContent = formatPrice(price);

        // Quantity controls and remove button
        const bottom = document.createElement("div");
        bottom.className = "cart-item-bottom";

        const quantityControl = document.createElement("div");
        quantityControl.className = "quantity-control";

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.setAttribute("aria-label", t.decrease);
        decreaseButton.disabled = quantity <= 1;

        decreaseButton.addEventListener("click", () => {
            updateQuantity(product.id, -1);
        });

        const quantityText = document.createElement("span");
        quantityText.textContent = quantity;

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute("aria-label", t.increase);

        increaseButton.addEventListener("click", () => {
            updateQuantity(product.id, 1);
        });

        quantityControl.append(
            decreaseButton,
            quantityText,
            increaseButton
        );

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-cart-item";
        removeButton.textContent =  t.remove;
        removeButton.addEventListener("click", () => {
            removeFromCart(product.id);
        });

        bottom.append(quantityControl, removeButton);

        details.append(
            category,
            name,
            priceText,
            bottom
        );

        item.append(imageWrapper, details);
        cartItemsContainer.appendChild(item);
    });

    // Update item count
    cartItemCount.textContent =
    `${totalQuantity} ${totalQuantity === 1 ? t.item : t.items}`;
    // Update totals
    cartSubtotal.textContent = formatPrice(subtotal);
    cartTotal.textContent = formatPrice(subtotal);

    // Show empty cart message when needed
    const isEmpty = cart.length === 0;

    emptyCartMessage.hidden = !isEmpty;
    cartItemsContainer.hidden = isEmpty;
    checkoutButton.disabled = isEmpty;
}


// Increase or decrease quantity
function updateQuantity(productId, change) {
    const cart = getCart();

    const product = cart.find(
        item => String(item.id) === String(productId)
    );

    if (!product) return;

    const newQuantity = (Number(product.quantity) || 1) + change;

    if (newQuantity < 1) return;

    product.quantity = newQuantity;

    saveCart(cart);
    renderCart();
}


// Remove a product completely
function removeFromCart(productId) {
    const updatedCart = getCart().filter(
        item => String(item.id) !== String(productId)
    );

    saveCart(updatedCart);
    renderCart();
}


// Temporary checkout handler

checkoutButton.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
        const t = cartTranslations[getCartLanguage()] || cartTranslations.en;
alert(t.emptyAlert);
        return;
    }

    window.location.href = "order.html";
});




// Load cart when the page opens
initializeCartLanguage();