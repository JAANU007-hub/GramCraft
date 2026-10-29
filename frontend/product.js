
/* ==========================================
   GRAMCRAFT MARKETPLACE
   Category filtering and product cards
========================================== */

const API_URL = "http://localhost:5000/api/products";

const categoryList = document.getElementById("categoryList");
const productsGrid = document.getElementById("productsGrid");
const productSearch = document.getElementById("productSearch");
const productCount = document.getElementById("productCount");
const productsMessage = document.getElementById("productsMessage");
const emptyProducts = document.getElementById("emptyProducts");
const resetFilters = document.getElementById("resetFilters");


let allProducts = [
    {
        id: 1,
        name: "Handcrafted Clay Keychain",
        category: "Handmade Crafts",
        price: 180,
        description: "A little handmade treasure, carefully shaped and painted by local artisans.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80"

    },
    {
        id: 3,
        name: "Terracotta Flower Vase",
        category: "Pottery",
        price: 350,
        description: "A rustic terracotta vase that brings warmth and a natural touch to your home.",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Handwoven Table Mat",
        category: "Mat",
        price: 220,
        description: "A beautiful woven mat made with care to add an earthy touch to your table.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80"
    }
];


let selectedCategory = "All";

const categorySymbols = {
    "Pottery": "◒",
    "Handmade Crafts": "❋",
    "Home Decor": "⌂",
    "Textiles": "▧",
    "Jewellery": "◇",
    "Cloth": "▧",
    "Mat": "▤"
};

/* ==========================================
   LOAD PRODUCTS FROM BACKEND
========================================== */

async function loadProducts() {
    showMessage("Loading handmade treasures...");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load products.");
        }

        const data = await response.json();

        const databaseProducts = Array.isArray(data)
            ? data
            : Array.isArray(data.products)
                ? data.products
                : [];

        if (databaseProducts.length === 0) {
            throw new Error("No products received from the database.");
        }

        // Use actual products received from the database.
        allProducts = databaseProducts;

        renderProducts();

    } catch (error) {
        console.error("Product loading error:", error);

        // Keep existing sample products if the backend is unavailable.
        renderProducts();

        showMessage(
            "Showing sample products. The marketplace server is unavailable."
        );
    }
}

/* ==========================================
   DISPLAY MESSAGE
========================================== */

function showMessage(message) {
    if (productsMessage) {
        productsMessage.textContent = message;
        productsMessage.hidden = false;
    }
}

function hideMessage() {
    if (productsMessage) {
        productsMessage.hidden = true;
    }
}

/* ==========================================
   CATEGORY SELECTION
========================================== */

if (categoryList) {
    categoryList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-category]");

        if (!button) return;

        selectedCategory = button.dataset.category;

        categoryList.querySelectorAll("[data-category]").forEach(item => {
            const isActive = item === button;

            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        renderProducts();
    });
}

/* ==========================================
   SEARCH PRODUCTS
========================================== */

if (productSearch) {
    productSearch.addEventListener("input", renderProducts);
}

/* ==========================================
   RENDER PRODUCT CARDS
========================================== */

function renderProducts() {
    if (!productsGrid) return;

    hideMessage();

    const searchTerm = productSearch
        ? productSearch.value.trim().toLowerCase()
        : "";

    const filteredProducts = allProducts.filter(product => {
        const category = String(product.category || "");

        const matchesCategory =
            selectedCategory === "All" ||
            category.toLowerCase() === selectedCategory.toLowerCase();

        const searchableText = [
            product.name,
            product.title,
            product.description,
            product.category
        ].filter(Boolean).join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    productsGrid.innerHTML = "";

    filteredProducts.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });

    // Add an item card to the currently selected category.
    productsGrid.appendChild(createAddItemCard());

    if (productCount) {
        const count = filteredProducts.length;
        productCount.textContent =
            `${count} ${count === 1 ? "treasure" : "treasures"}`;
    }

    if (emptyProducts) {
        emptyProducts.hidden = filteredProducts.length !== 0;
    }
}


function addToCart(product) {
    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("gramcraftCart")) || [];

        if (!Array.isArray(cart)) {
            cart = [];
        }
    } catch (error) {
        cart = [];
    }

    const productId = String(product.id);

    const existingItem = cart.find(
        item => String(item.id) === productId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name || product.title || "Handmade treasure",
            price: Number(product.price),
            image: product.image_url || product.image || "",
            category: product.category || "Handmade",
            quantity: 1
        });
    }

    localStorage.setItem("gramcraftCart", JSON.stringify(cart));

    buttonFeedback("Added to your cart! 🛍️");
}

function buttonFeedback(message) {
    let toast = document.getElementById("cartToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cartToast";
        toast.className = "cart-toast";
        toast.setAttribute("role", "status");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.gramcraftToastTimer);

    window.gramcraftToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* ==========================================
   CREATE A PRODUCT CARD
========================================== */

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "product-image";

    if (product.image_url || product.image) {
        const image = document.createElement("img");

        image.src = product.image_url || product.image;
        image.alt = product.name || product.title || "Handmade product";
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.remove();
            imageWrapper.textContent = "✿";
            imageWrapper.classList.add("product-placeholder");
        }, { once: true });

        imageWrapper.appendChild(image);
    } else {
        imageWrapper.textContent = categorySymbols[product.category] || "✿";
        imageWrapper.classList.add("product-placeholder");
    }

    const body = document.createElement("div");
    body.className = "product-card-body";

    const category = document.createElement("span");
    category.className = "product-category";
    const categoryTranslations = {
    en: {
        "Pottery": "Pottery",
        "Handmade Crafts": "Handmade Crafts",
        "Home Decor": "Home Decor",
        "Textiles": "Textiles",
        "Jewellery": "Jewellery",
        "Cloth": "Cloth",
        "Mat": "Mat"
    },
    hi: {
        "Pottery": "मिट्टी के बर्तन",
        "Handmade Crafts": "हस्तनिर्मित शिल्प",
        "Home Decor": "घर की सजावट",
        "Textiles": "कपड़ा",
        "Jewellery": "आभूषण",
        "Cloth": "कपड़े",
        "Mat": "चटाई"
    },
    mr: {
        "Pottery": "मातीची भांडी",
        "Handmade Crafts": "हस्तनिर्मित कला",
        "Home Decor": "घराची सजावट",
        "Textiles": "वस्त्र",
        "Jewellery": "दागिने",
        "Cloth": "कापड",
        "Mat": "चटई"
    }
};

category.textContent =
    (categoryTranslations[language] || categoryTranslations.en)[product.category]
    || product.category
    || cardText.handmade;

    const title = document.createElement("h3");
    title.textContent = product.name || product.title || "Handmade treasure";

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent =
        product.description || cardText.description;

    const bottom = document.createElement("div");
    bottom.className = "product-card-bottom";

    const price = document.createElement("span");
    price.className = "product-price";

    const numericPrice = Number(product.price);

    price.textContent = Number.isFinite(numericPrice)
        ? `₹${numericPrice.toLocaleString("en-IN")}`
        : cardText.unavailable;

    const button = document.createElement("button");

button.type = "button";
button.className = "add-to-cart";
button.textContent = cardText.addToCart;

button.addEventListener("click", () => {
    addToCart(product);
});

    bottom.append(price, button);
    body.append(category, title, description, bottom);
    card.append(imageWrapper, body);

    return card;
}

const language = localStorage.getItem("gramCraftLanguage") || "en";

const cardTranslations = {
    en: {
        addToCart: "＋ Add to Cart",
        handmade: "Handmade",
        description: "Made with care by a local artisan.",
        unavailable: "Price unavailable"
    },
    hi: {
        addToCart: "＋ कार्ट में जोड़ें",
        handmade: "हस्तनिर्मित",
        description: "स्थानीय कारीगर द्वारा प्यार से बनाया गया।",
        unavailable: "कीमत उपलब्ध नहीं"
    },
    mr: {
        addToCart: "＋ कार्टमध्ये जोडा",
        handmade: "हस्तनिर्मित",
        description: "स्थानिक कारागिरांनी काळजीपूर्वक बनवलेले.",
        unavailable: "किंमत उपलब्ध नाही"
    }
};

const cardText = cardTranslations[language] || cardTranslations.en;

/* ==========================================
   ADD NEW ITEM CARD
========================================== */

function createAddItemCard() {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "add-item-card";
    card.setAttribute(
        "aria-label",
        `Add a new item to ${selectedCategory}`
    );

    const plus = document.createElement("span");
    plus.className = "add-item-plus";
    plus.textContent = "+";

    const title = document.createElement("strong");
    title.textContent = "Add New Item";

    const description = document.createElement("span");
    description.textContent = selectedCategory === "All"
        ? "Add a handmade treasure"
        : `Add an item to ${selectedCategory}`;

    card.append(plus, title, description);

    card.addEventListener("click", () => {
        openAddItemForm();
    });

    return card;
}

/* ==========================================
   TEMPORARY ADD ITEM FORM
========================================== */

function openAddItemForm() {
const formPanel = document.getElementById("addProductPanel");

if (!formPanel) {
    alert("Product form not found. Please check products.html.");
    return;
}

formPanel.hidden = false;
formPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

const nameInput = document.getElementById("productName");

if (nameInput) {
    nameInput.focus({ preventScroll: true });
}


}


/* ==========================================
   RESET FILTERS
========================================== */

if (resetFilters) {
    resetFilters.addEventListener("click", () => {
        selectedCategory = "All";

        if (productSearch) {
            productSearch.value = "";
        }

        if (categoryList) {
            const allButton = categoryList.querySelector(
                '[data-category="All"]'
            );

            categoryList.querySelectorAll("[data-category]").forEach(button => {
                const isActive = button === allButton;

                button.classList.toggle("active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });
        }

        renderProducts();
    });
}

/* ==========================================
   START MARKETPLACE
========================================== */

loadProducts();



/* ==========================================
   GRAMCRAFT MARKETPLACE LANGUAGE SUPPORT
========================================== */

const marketplaceTranslations = {
    en: {
        backHome: "← Back to Home",
        myCart: "🛍️ My Cart",
        eyebrow: "MADE BY HANDS, SHARED WITH LOVE",
        heroTitle: "Little treasures.<br><span>Beautiful stories.</span>",
        heroDescription: "Explore handmade creations from rural artisans. Every piece carries a little tradition and a lot of love.",
        discover: "Discover treasures ↓",
        collection: "THE ARTISAN COLLECTION",
        collectionTitle: "Find your kind of special.",
        collectionDescription: "From everyday essentials to thoughtful gifts, discover something made with heart.",
        purchaseTitle: "Every purchase matters",
        purchaseDescription: "Support India's rural artisans",
        categories: "Explore by category",
        categoryDescription: "Find something you love",
        all: "All treasures",
        pottery: "Pottery",
        crafts: "Handmade crafts",
        decor: "Home decor",
        textiles: "Textiles",
        jewellery: "Jewellery",
        cloth: "Cloth",
        mat: "Mat",
        formEyebrow: "MADE WITH LOVE ♡",
        formTitle: "Share your handmade treasure",
        formDescription: "Add your product details and let more people discover your craft.",
        productName: "Product name *",
        price: "Price (₹) *",
        category: "Category *",
        chooseCategory: "Choose a category",
        story: "Product story *",
        photo: "Product photo *",
        choosePhoto: "Choose a photo",
        uploadPhoto: "Upload an image from your device",
        removePhoto: "Remove photo",
        cancel: "Cancel",
        addProduct: "Add my product →",
        emptyTitle: "No treasures found just yet.",
        emptyDescription: "Try another search or explore a different category.",
        showAll: "Show all products",
        artisanEyebrow: "FOR OUR ARTISANS",
        artisanTitle: "Your craft deserves to be discovered.",
        artisanDescription: "Have something beautiful to share? Bring your creations to the GramCraft community.",
        artisanButton: "Visit artisan space →",
        footer: "From village hands to happy homes."
    },

    hi: {
        backHome: "← होम पर जाएँ",
        myCart: "🛍️ मेरी कार्ट",
        eyebrow: "हाथों से बना, प्यार से साझा किया गया",
        heroTitle: "छोटे खज़ाने।<br><span>खूबसूरत कहानियाँ।</span>",
        heroDescription: "ग्रामीण कारीगरों की हस्तनिर्मित कलाकृतियाँ देखें। हर वस्तु में परंपरा और प्यार है।",
        discover: "खज़ाने देखें ↓",
        collection: "कारीगरों का संग्रह",
        collectionTitle: "अपने लिए कुछ खास खोजें।",
        collectionDescription: "रोज़मर्रा की ज़रूरतों से लेकर उपहारों तक, दिल से बनी चीज़ें खोजें।",
        purchaseTitle: "हर खरीदारी मायने रखती है",
        purchaseDescription: "भारत के ग्रामीण कारीगरों का साथ दें",
        categories: "श्रेणी के अनुसार देखें",
        categoryDescription: "अपनी पसंद की चीज़ खोजें",
        all: "सभी उत्पाद",
        pottery: "मिट्टी के बर्तन",
        crafts: "हस्तनिर्मित शिल्प",
        decor: "घर की सजावट",
        textiles: "कपड़ा",
        jewellery: "आभूषण",
        cloth: "कपड़े",
        mat: "चटाई",
        formEyebrow: "प्यार से बनाया गया ♡",
        formTitle: "अपनी हस्तनिर्मित वस्तु साझा करें",
        formDescription: "अपने उत्पाद की जानकारी जोड़ें और अधिक लोगों तक अपना हुनर पहुँचाएँ।",
        productName: "उत्पाद का नाम *",
        price: "कीमत (₹) *",
        category: "श्रेणी *",
        chooseCategory: "श्रेणी चुनें",
        story: "उत्पाद की कहानी *",
        photo: "उत्पाद की तस्वीर *",
        choosePhoto: "तस्वीर चुनें",
        uploadPhoto: "अपने डिवाइस से तस्वीर अपलोड करें",
        removePhoto: "तस्वीर हटाएँ",
        cancel: "रद्द करें",
        addProduct: "उत्पाद जोड़ें →",
        emptyTitle: "अभी कोई उत्पाद नहीं मिला।",
        emptyDescription: "दूसरी खोज करें या कोई अन्य श्रेणी चुनें।",
        showAll: "सभी उत्पाद दिखाएँ",
        artisanEyebrow: "हमारे कारीगरों के लिए",
        artisanTitle: "आपके हुनर को पहचान मिलनी चाहिए।",
        artisanDescription: "क्या आपके पास साझा करने के लिए कुछ सुंदर है? अपनी कलाकृतियाँ GramCraft समुदाय तक पहुँचाएँ।",
        artisanButton: "कारीगर अनुभाग देखें →",
        footer: "गाँव के हाथों से आपके घर तक।"
    },

    mr: {
        backHome: "← मुख्यपृष्ठावर जा",
        myCart: "🛍️ माझी कार्ट",
        eyebrow: "हातांनी बनवलेले, प्रेमाने जपलेले",
        heroTitle: "छोटीशी भेटवस्तू.<br><span>सुंदर गोष्टी.</span>",
        heroDescription: "ग्रामीण कारागिरांनी तयार केलेल्या हस्तनिर्मित वस्तू पाहा. प्रत्येक वस्तूत परंपरा आणि प्रेम आहे.",
        discover: "वस्तू पाहा ↓",
        collection: "कारागिरांचा संग्रह",
        collectionTitle: "तुमच्यासाठी काही खास शोधा.",
        collectionDescription: "दैनंदिन वापराच्या वस्तूंपासून भेटवस्तूंपर्यंत, मनापासून बनवलेल्या वस्तू शोधा.",
        purchaseTitle: "प्रत्येक खरेदी महत्त्वाची आहे",
        purchaseDescription: "भारतातील ग्रामीण कारागिरांना साथ द्या",
        categories: "वर्गानुसार पाहा",
        categoryDescription: "तुमच्या आवडीची वस्तू शोधा",
        all: "सर्व वस्तू",
        pottery: "मातीची भांडी",
        crafts: "हस्तनिर्मित कला",
        decor: "घराची सजावट",
        textiles: "वस्त्र",
        jewellery: "दागिने",
        cloth: "कापड",
        mat: "चटई",
        formEyebrow: "प्रेमाने बनवलेले ♡",
        formTitle: "तुमची हस्तनिर्मित वस्तू शेअर करा",
        formDescription: "तुमच्या उत्पादनाची माहिती द्या आणि तुमचे कौशल्य अधिक लोकांपर्यंत पोहोचवा.",
        productName: "उत्पादनाचे नाव *",
        price: "किंमत (₹) *",
        category: "वर्ग *",
        chooseCategory: "वर्ग निवडा",
        story: "उत्पादनाची गोष्ट *",
        photo: "उत्पादनाचा फोटो *",
        choosePhoto: "फोटो निवडा",
        uploadPhoto: "तुमच्या डिव्हाइसवरून फोटो अपलोड करा",
        removePhoto: "फोटो काढून टाका",
        cancel: "रद्द करा",
        addProduct: "उत्पादन जोडा →",
        emptyTitle: "सध्या कोणतीही वस्तू सापडली नाही.",
        emptyDescription: "दुसरे काही शोधा किंवा वेगळा वर्ग निवडा.",
        showAll: "सर्व वस्तू दाखवा",
        artisanEyebrow: "आपल्या कारागिरांसाठी",
        artisanTitle: "तुमच्या कौशल्याला ओळख मिळायला हवी.",
        artisanDescription: "तुमच्याकडे शेअर करण्यासाठी सुंदर वस्तू आहे का? तुमच्या कलाकृती GramCraft समुदायापर्यंत पोहोचवा.",
        artisanButton: "कारागिरांचा विभाग पाहा →",
        footer: "गावातील हातांपासून तुमच्या घरापर्यंत."
    }
};

const marketplaceLanguageSelect = document.getElementById("languageSelect");

function applyMarketplaceLanguage(language) {
    const text = marketplaceTranslations[language];

    if (!text) return;

    document.documentElement.lang = language;
    localStorage.setItem("gramCraftLanguage", language);

    const setText = (selector, value, html = false) => {
        const element = document.querySelector(selector);
        if (!element) return;

        if (html) {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    };

    setText(".back-home", text.backHome);
    setText(".market-nav .text-link", text.myCart);
    setText(".market-eyebrow", text.eyebrow);
    setText(".market-hero h1", text.heroTitle, true);
    setText(".market-hero-content > p", text.heroDescription);
    setText(".browse-button", text.discover);
    setText(".section-eyebrow", text.collection);
    setText(".marketplace-heading h2", text.collectionTitle);
    setText(".marketplace-heading > div > p", text.collectionDescription);
    setText(".artisan-note strong", text.purchaseTitle);
    setText(".artisan-note small", text.purchaseDescription);
    setText(".category-heading h3", text.categories);
    setText(".category-heading > span", text.categoryDescription);

    const categoryNames = [
        text.all, text.pottery, text.crafts, text.decor,
        text.textiles, text.jewellery, text.cloth, text.mat
    ];

    document.querySelectorAll(".category-button").forEach((button, index) => {
        const label = button.querySelector("span:last-child");
        if (label && categoryNames[index]) {
            label.textContent = categoryNames[index];
        }
    });

    setText(".add-product-heading .form-eyebrow", text.formEyebrow);
    setText(".add-product-heading h2", text.formTitle);
    setText(".add-product-heading p", text.formDescription);
    setText('label[for="productName"]', text.productName);
    setText('label[for="productPrice"]', text.price);
    setText('label[for="productCategory"]', text.category);
    setText('label[for="productDescription"]', text.story);
    setText('label[for="productImage"]', text.photo);
    setText(".image-upload-box strong", text.choosePhoto);
    setText(".image-upload-box > span:last-of-type", text.uploadPhoto);
    setText("#removeProductImage", text.removePhoto);
    setText("#cancelProductForm", text.cancel);
    setText("#submitProductButton", text.addProduct);
    setText(".empty-products h3", text.emptyTitle);
    setText(".empty-products p", text.emptyDescription);
    setText("#resetFilters", text.showAll);
    setText(".invitation-copy > span", text.artisanEyebrow);
    setText(".invitation-copy h2", text.artisanTitle);
    setText(".invitation-copy p", text.artisanDescription);
    setText(".artisan-button", text.artisanButton);
    setText(".market-footer > p", text.footer);

    const categorySelect = document.getElementById("productCategory");

    if (categorySelect) {
        const options = categorySelect.options;
        if (options.length >= 8) {
            options[0].textContent = text.chooseCategory;
            options[1].textContent = text.pottery;
            options[2].textContent = text.crafts;
            options[3].textContent = text.decor;
            options[4].textContent = text.textiles;
            options[5].textContent = text.jewellery;
            options[6].textContent = text.cloth;
            options[7].textContent = text.mat;
            if (options[8]) options[8].textContent = language === "hi" ? "अन्य" : language === "mr" ? "इतर" : "Other";
        }
    }

    renderProducts();
}

if (marketplaceLanguageSelect) {
    const savedMarketplaceLanguage =
        localStorage.getItem("gramCraftLanguage") || "en";

    marketplaceLanguageSelect.value = savedMarketplaceLanguage;

    marketplaceLanguageSelect.addEventListener("change", function () {
        applyMarketplaceLanguage(this.value);
    });

    applyMarketplaceLanguage(savedMarketplaceLanguage);
}