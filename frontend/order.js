// GramCraft — Order Page

const ORDER_CART_KEY = "gramcraftCart";
const ORDER_DETAILS_KEY = "gramcraftDeliveryDetails";
const LANGUAGE_KEY = "gramCraftLanguage";

const orderItemsContainer = document.getElementById("orderItems");
const orderQuantity = document.getElementById("orderQuantity");
const orderSubtotal = document.getElementById("orderSubtotal");
const orderTotal = document.getElementById("orderTotal");
const orderForm = document.getElementById("orderForm");
const orderFormMessage = document.getElementById("orderFormMessage");
const languageSelect = document.getElementById("languageSelect");

const orderTranslations = {
en: {
language: "Language:",
back: "← Back to Cart",
eyebrow: "ONE STEP CLOSER",
title: "Let's get your treasures",
titleSpan: "home.",
intro: "Share your delivery details below so your handmade treasures can find their way to you.",
delivery: "Delivery Details",
deliveryIntro: "Where should we deliver your order?",
information: "Your Information",
name: "Full Name *",
namePlaceholder: "Enter your full name",
phone: "Mobile Number *",
phonePlaceholder: "Enter your 10-digit mobile number",
phoneTitle: "Enter a valid 10-digit Indian mobile number",
addressHeading: "Where Should We Deliver?",
address: "House / Building / Street *",
addressPlaceholder: "House number, street or building",
city: "Village / City *",
cityPlaceholder: "Enter village or city",
district: "District *",
districtPlaceholder: "Enter district",
state: "State *",
selectState: "Select your state",
pin: "PIN Code *",
pinPlaceholder: "6-digit PIN code",
pinTitle: "Enter a valid 6-digit Indian PIN code",
landmark: "Nearby Landmark",
optional: "Optional",
landmarkPlaceholder: "E.g. near the village school",
addressHelp: "Need help with your address?",
addressTip: "Include a nearby school, temple, shop or another familiar place to help the delivery person find you.",
continue: "Continue to Place Order →",
footnote: "Please check your details before continuing.",
selection: "YOUR SELECTION",
summary: "Order Summary",
quantity: "Total Quantity",
subtotal: "Items Subtotal",
charges: "Delivery Charges",
pending: "To be confirmed",
total: "Items Total",
summaryNote: "Delivery charges will be confirmed before the order is finalised. No payment is collected on this page.",
editCart: "← Edit your cart",
footer: "Made with care. Carried with love. 🌾",
emptyCart: "Your cart is empty. Please add products before placing an order.",
emptyButton: "Your Cart Is Empty",
emptyContinue: "Your cart is empty. Please add products before continuing.",
handmade: "Handmade product",
treasure: "Handmade treasure",
quantityLabel: "Quantity"
},


hi: {
    language: "भाषा:",
    back: "← कार्ट पर वापस जाएँ",
    eyebrow: "बस एक कदम और",
    title: "आपके खास खज़ाने पहुँचें",
    titleSpan: "घर।",
    intro: "अपने हाथ से बने खज़ानों की डिलीवरी के लिए नीचे अपनी जानकारी भरें।",
    delivery: "डिलीवरी की जानकारी",
    deliveryIntro: "आपका ऑर्डर कहाँ पहुँचाना है?",
    information: "आपकी जानकारी",
    name: "पूरा नाम *",
    namePlaceholder: "अपना पूरा नाम लिखें",
    phone: "मोबाइल नंबर *",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर लिखें",
    phoneTitle: "सही 10 अंकों का भारतीय मोबाइल नंबर लिखें",
    addressHeading: "डिलीवरी कहाँ करनी है?",
    address: "मकान / इमारत / सड़क *",
    addressPlaceholder: "मकान नंबर, सड़क या इमारत लिखें",
    city: "गाँव / शहर *",
    cityPlaceholder: "गाँव या शहर का नाम लिखें",
    district: "ज़िला *",
    districtPlaceholder: "ज़िले का नाम लिखें",
    state: "राज्य *",
    selectState: "अपना राज्य चुनें",
    pin: "पिन कोड *",
    pinPlaceholder: "6 अंकों का पिन कोड",
    pinTitle: "सही 6 अंकों का भारतीय पिन कोड लिखें",
    landmark: "पास की पहचान वाली जगह",
    optional: "वैकल्पिक",
    landmarkPlaceholder: "जैसे गाँव के स्कूल के पास",
    addressHelp: "पते के लिए मदद चाहिए?",
    addressTip: "डिलीवरी करने वाले को जगह ढूँढने में मदद के लिए पास के स्कूल, मंदिर, दुकान या किसी परिचित जगह का नाम लिखें।",
    continue: "ऑर्डर जारी रखें →",
    footnote: "आगे बढ़ने से पहले अपनी जानकारी जाँच लें।",
    selection: "आपका चयन",
    summary: "ऑर्डर का सारांश",
    quantity: "कुल मात्रा",
    subtotal: "सामान की कुल कीमत",
    charges: "डिलीवरी शुल्क",
    pending: "बाद में बताया जाएगा",
    total: "सामान का कुल योग",
    summaryNote: "ऑर्डर पक्का होने से पहले डिलीवरी शुल्क बताया जाएगा। इस पेज पर कोई भुगतान नहीं लिया जाता।",
    editCart: "← कार्ट में बदलाव करें",
    footer: "प्यार से बनाया। देखभाल से पहुँचाया। 🌾",
    emptyCart: "आपका कार्ट खाली है। ऑर्डर करने से पहले उसमें सामान जोड़ें।",
    emptyButton: "आपका कार्ट खाली है",
    emptyContinue: "आपका कार्ट खाली है। आगे बढ़ने से पहले सामान जोड़ें।",
    handmade: "हस्तनिर्मित उत्पाद",
    treasure: "हस्तनिर्मित खज़ाना",
    quantityLabel: "मात्रा"
},

mr: {
    language: "भाषा:",
    back: "← कार्टवर परत जा",
    eyebrow: "आता फक्त एक पाऊल",
    title: "तुमच्या खास वस्तू पोहोचवा",
    titleSpan: "घरी.",
    intro: "तुमच्या हस्तनिर्मित वस्तू योग्य ठिकाणी पोहोचण्यासाठी खाली डिलिव्हरीची माहिती भरा.",
    delivery: "डिलिव्हरीची माहिती",
    deliveryIntro: "तुमची ऑर्डर कुठे पोहोचवायची?",
    information: "तुमची माहिती",
    name: "पूर्ण नाव *",
    namePlaceholder: "तुमचे पूर्ण नाव लिहा",
    phone: "मोबाइल नंबर *",
    phonePlaceholder: "10 अंकी मोबाइल नंबर लिहा",
    phoneTitle: "वैध 10 अंकी भारतीय मोबाइल नंबर लिहा",
    addressHeading: "डिलिव्हरी कुठे करायची?",
    address: "घर / इमारत / रस्ता *",
    addressPlaceholder: "घर क्रमांक, रस्ता किंवा इमारतीचे नाव लिहा",
    city: "गाव / शहर *",
    cityPlaceholder: "गाव किंवा शहराचे नाव लिहा",
    district: "जिल्हा *",
    districtPlaceholder: "जिल्ह्याचे नाव लिहा",
    state: "राज्य *",
    selectState: "तुमचे राज्य निवडा",
    pin: "पिन कोड *",
    pinPlaceholder: "6 अंकी पिन कोड",
    pinTitle: "वैध 6 अंकी भारतीय पिन कोड लिहा",
    landmark: "जवळची ओळखण्याची जागा",
    optional: "ऐच्छिक",
    landmarkPlaceholder: "उदा. गावातील शाळेजवळ",
    addressHelp: "पत्त्यासाठी मदत हवी आहे?",
    addressTip: "डिलिव्हरी करणाऱ्याला जागा शोधण्यास मदत होण्यासाठी जवळची शाळा, मंदिर, दुकान किंवा ओळखीची जागा नमूद करा.",
    continue: "ऑर्डरसाठी पुढे जा →",
    footnote: "पुढे जाण्यापूर्वी तुमची माहिती तपासा.",
    selection: "तुमची निवड",
    summary: "ऑर्डरचा सारांश",
    quantity: "एकूण नग",
    subtotal: "वस्तूंची उपएकूण किंमत",
    charges: "डिलिव्हरी शुल्क",
    pending: "नंतर कळवले जाईल",
    total: "वस्तूंची एकूण किंमत",
    summaryNote: "ऑर्डर निश्चित होण्यापूर्वी डिलिव्हरी शुल्क कळवले जाईल. या पेजवर कोणतेही पेमेंट घेतले जात नाही.",
    editCart: "← कार्टमध्ये बदल करा",
    footer: "काळजीपूर्वक बनवले. प्रेमाने पोहोचवले. 🌾",
    emptyCart: "तुमचा कार्ट रिकामा आहे. ऑर्डर करण्यापूर्वी त्यात वस्तू जोडा.",
    emptyButton: "तुमचा कार्ट रिकामा आहे",
    emptyContinue: "तुमचा कार्ट रिकामा आहे. पुढे जाण्यापूर्वी वस्तू जोडा.",
    handmade: "हस्तनिर्मित वस्तू",
    treasure: "हस्तनिर्मित खास वस्तू",
    quantityLabel: "प्रमाण"
}


};

// Read cart data saved by the marketplace
function getOrderCart() {
try {
const savedCart = JSON.parse(localStorage.getItem(ORDER_CART_KEY));
return Array.isArray(savedCart) ? savedCart : [];
} catch (error) {
return [];
}
}

// Format price in Indian Rupees
function formatOrderPrice(amount) {
return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

// Translate the order page
function applyOrderLanguage(language) {
const t = orderTranslations[language] || orderTranslations.en;


document.documentElement.lang = language;
localStorage.setItem(LANGUAGE_KEY, language);

const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
};

setText("#languageSelect + span", t.language);
setText("#backToCart", t.back);
setText(".order-eyebrow", t.eyebrow);

const title = document.querySelector(".order-heading h1");
if (title) {
    title.replaceChildren(document.createTextNode(t.title + " "));
    const span = document.createElement("span");
    span.textContent = t.titleSpan;
    title.appendChild(span);
}

setText(".order-heading > p", t.intro);
setText(".form-heading h2", t.delivery);
setText(".form-heading p", t.deliveryIntro);
setText(".form-section-heading:not(.address-heading) h3", t.information);
setText(".address-heading h3", t.addressHeading);

const labelMap = {
    customerName: t.name,
    customerPhone: t.phone,
    addressLine: t.address,
    villageCity: t.city,
    district: t.district,
    state: t.state,
    pinCode: t.pin,
    landmark: t.landmark
};

Object.entries(labelMap).forEach(([id, text]) => {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) {
        label.replaceChildren(document.createTextNode(text + " "));
        if (id === "landmark") {
            const optional = document.createElement("span");
            optional.className = "optional-label";
            optional.textContent = t.optional;
            label.appendChild(optional);
        }
    }
});

const placeholders = {
    customerName: t.namePlaceholder,
    customerPhone: t.phonePlaceholder,
    addressLine: t.addressPlaceholder,
    villageCity: t.cityPlaceholder,
    district: t.districtPlaceholder,
    pinCode: t.pinPlaceholder,
    landmark: t.landmarkPlaceholder
};

Object.entries(placeholders).forEach(([id, text]) => {
    const input = document.getElementById(id);
    if (input) input.placeholder = text;
});

const phone = document.getElementById("customerPhone");
if (phone) phone.title = t.phoneTitle;

const pin = document.getElementById("pinCode");
if (pin) pin.title = t.pinTitle;

const stateSelect = document.getElementById("state");
if (stateSelect && stateSelect.options.length) {
    stateSelect.options[0].textContent = t.selectState;
}

setText(".address-tip strong", t.addressHelp);

const addressTip = document.querySelector(".address-tip p");
if (addressTip) {
    const strong = addressTip.querySelector("strong");
    addressTip.replaceChildren();

    if (strong) {
        strong.textContent = t.addressHelp;
        addressTip.appendChild(strong);
        addressTip.appendChild(document.createTextNode(" "));
    }

    addressTip.appendChild(document.createTextNode(t.addressTip));
}

setText(".place-order-button", t.continue);
setText(".form-footnote", t.footnote);
setText(".summary-eyebrow", t.selection);
setText(".order-summary-card h2", t.summary);

const summaryLines = document.querySelectorAll(".order-summary-line > span:first-child");
if (summaryLines[0]) summaryLines[0].textContent = t.quantity;
if (summaryLines[1]) summaryLines[1].textContent = t.subtotal;
if (summaryLines[2]) summaryLines[2].textContent = t.charges;

setText(".delivery-pending", t.pending);
setText(".order-total-line > span", t.total);
setText(".order-summary-note", t.summaryNote);
setText(".edit-cart-link", t.editCart);
setText(".market-footer p", t.footer);

displayOrderSummary();


}

// Display cart products in the order summary
function displayOrderSummary() {
const cart = getOrderCart();
const t = orderTranslations[localStorage.getItem(LANGUAGE_KEY)] || orderTranslations.en;


orderItemsContainer.replaceChildren();

let quantityTotal = 0;
let subtotal = 0;

cart.forEach(product => {
    const quantity = Math.max(1, Number(product.quantity) || 1);
    const price = Math.max(0, Number(product.price) || 0);

    quantityTotal += quantity;
    subtotal += price * quantity;

    const item = document.createElement("article");
    item.className = "order-item";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "order-item-image";

    if (product.image) {
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name || t.handmade;
        image.loading = "lazy";

        image.onerror = () => {
            imageWrapper.replaceChildren();
            const fallback = document.createElement("span");
            fallback.textContent = "✿";
            imageWrapper.appendChild(fallback);
        };

        imageWrapper.appendChild(image);
    } else {
        const fallback = document.createElement("span");
        fallback.textContent = "✿";
        imageWrapper.appendChild(fallback);
    }

    const details = document.createElement("div");
    details.className = "order-item-details";

    const name = document.createElement("h3");
    name.textContent = product.name || product.title || t.treasure;

    const quantityText = document.createElement("p");
    quantityText.textContent = `${t.quantityLabel}: ${quantity}`;

    const priceText = document.createElement("div");
    priceText.className = "order-item-price";
    priceText.textContent = formatOrderPrice(price * quantity);

    details.append(name, quantityText, priceText);
    item.append(imageWrapper, details);
    orderItemsContainer.appendChild(item);
});

orderQuantity.textContent = quantityTotal;
orderSubtotal.textContent = formatOrderPrice(subtotal);
orderTotal.textContent = formatOrderPrice(subtotal);

const submitButton = orderForm.querySelector('button[type="submit"]');

if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = t.emptyCart;
    emptyMessage.className = "order-empty-message";
    orderItemsContainer.appendChild(emptyMessage);

    submitButton.disabled = true;
    submitButton.textContent = t.emptyButton;
    return;
}

submitButton.disabled = false;
submitButton.textContent = t.continue;


}

// Validate form and continue to review page
orderForm.addEventListener("submit", function (event) {
event.preventDefault();


const t = orderTranslations[localStorage.getItem(LANGUAGE_KEY)] || orderTranslations.en;
const cart = getOrderCart();

if (cart.length === 0) {
    orderFormMessage.textContent = t.emptyContinue;
    orderFormMessage.hidden = false;
    return;
}

if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
}

const formData = new FormData(orderForm);
const deliveryDetails = Object.fromEntries(formData.entries());

localStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(deliveryDetails));

window.location.href = "review-order.html";


});

// Restore the previously selected language
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";

if (languageSelect) {
languageSelect.value = savedLanguage;


languageSelect.addEventListener("change", function () {
    applyOrderLanguage(languageSelect.value);
});


}

applyOrderLanguage(savedLanguage);
