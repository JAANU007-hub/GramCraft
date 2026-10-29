const languageSelect = document.getElementById("languageSelect");

const supportTranslations = {
en: {
language: "Language:",
back: "← Back to Marketplace",
eyebrow: "Crafted with care, rooted in tradition",
heroTitle: "Every Handmade Product Has a Story.",
heroText: "Behind every handmade creation is an artisan's time, creativity, and skill. GramCraft connects rural artisans with customers who value their work.",
sectionTitle: "Why Support Our Artisans?",
sectionIntro: "Handmade products carry stories, preserve traditional skills, and create meaningful opportunities for artisan communities.",
card1Label: "01 / LIVELIHOODS",
card1Title: "Support Artisan Livelihoods",
card1Text: "Your purchase helps artisans earn income through their skills and creativity, supporting their families and livelihoods.",
card2Label: "02 / HERITAGE",
card2Title: "Keep Traditions Alive",
card2Text: "Handmade creations preserve local knowledge, cultural traditions, and valuable skills passed from one generation to another.",
card3Label: "03 / COMMUNITY",
card3Title: "Build Rural Opportunities",
card3Text: "Connecting artisans with wider markets creates opportunities beyond their local communities and helps their work reach more people.",
messageTitle: "Small Choices. Meaningful Impact.",
messageText: "Choosing a handmade product means valuing creativity, craftsmanship, and the people behind it. GramCraft brings artisans and customers closer through one connected marketplace.",
actionsTitle: "Discover Something Handmade",
actionsText: "Explore unique creations and find something made with care.",
exploreButton: "Explore the Marketplace",
footer: "© 2026 GramCraft · Celebrating rural craftsmanship"
},


hi: {
    language: "भाषा:",
    back: "← बाज़ार पर वापस जाएँ",
    eyebrow: "प्यार से बना, परंपराओं से जुड़ा",
    heroTitle: "हर हस्तनिर्मित उत्पाद की अपनी कहानी है।",
    heroText: "हर हस्तनिर्मित वस्तु के पीछे कारीगर का समय, रचनात्मकता और हुनर होता है। GramCraft ग्रामीण कारीगरों को उनके काम की कद्र करने वाले ग्राहकों से जोड़ता है।",
    sectionTitle: "हमारे कारीगरों का साथ क्यों दें?",
    sectionIntro: "हस्तनिर्मित उत्पाद कहानियों को संजोते हैं, पारंपरिक हुनर को बचाते हैं और कारीगर समुदायों के लिए नए अवसर बनाते हैं।",
    card1Label: "01 / आजीविका",
    card1Title: "कारीगरों की आजीविका में मदद करें",
    card1Text: "आपकी खरीदारी कारीगरों को अपने हुनर और रचनात्मकता से कमाई करने तथा अपने परिवार का सहयोग करने में मदद करती है।",
    card2Label: "02 / विरासत",
    card2Title: "परंपराओं को जीवित रखें",
    card2Text: "हस्तनिर्मित वस्तुएँ स्थानीय ज्ञान, सांस्कृतिक परंपराओं और पीढ़ी-दर-पीढ़ी चले आ रहे हुनर को संजोती हैं।",
    card3Label: "03 / समुदाय",
    card3Title: "ग्रामीण अवसर बढ़ाएँ",
    card3Text: "कारीगरों को बड़े बाज़ारों से जोड़ने से उनके स्थानीय समुदायों से बाहर भी नए अवसर मिलते हैं और उनका काम अधिक लोगों तक पहुँचता है।",
    messageTitle: "छोटे कदम, बड़ा बदलाव।",
    messageText: "हस्तनिर्मित उत्पाद चुनने का मतलब है रचनात्मकता, कारीगरी और उसे बनाने वाले लोगों की मेहनत की कद्र करना। GramCraft कारीगरों और ग्राहकों को एक ही बाज़ार में जोड़ता है।",
    actionsTitle: "कुछ खास हस्तनिर्मित खोजें",
    actionsText: "अनोखी रचनाएँ देखें और प्यार से बनाई गई कोई खास चीज़ चुनें।",
    exploreButton: "बाज़ार देखें",
    footer: "© 2026 GramCraft · ग्रामीण कारीगरी का उत्सव"
},

mr: {
    language: "भाषा:",
    back: "← बाजारपेठेत परत जा",
    eyebrow: "काळजीपूर्वक घडवलेले, परंपरेशी जोडलेले",
    heroTitle: "प्रत्येक हस्तनिर्मित वस्तूची एक गोष्ट असते.",
    heroText: "प्रत्येक हस्तनिर्मित वस्तूमागे कारागिरांचा वेळ, सर्जनशीलता आणि कौशल्य असते. GramCraft ग्रामीण कारागिरांना त्यांच्या कामाची कदर करणाऱ्या ग्राहकांशी जोडते.",
    sectionTitle: "आपल्या कारागिरांना पाठिंबा का द्यावा?",
    sectionIntro: "हस्तनिर्मित वस्तू कथा जपतात, पारंपरिक कौशल्य टिकवतात आणि कारागिरांच्या समुदायांसाठी नवीन संधी निर्माण करतात.",
    card1Label: "01 / उपजीविका",
    card1Title: "कारागिरांच्या उपजीविकेला मदत करा",
    card1Text: "तुमची खरेदी कारागिरांना त्यांच्या कौशल्यातून आणि सर्जनशीलतेतून उत्पन्न मिळवण्यास व त्यांच्या कुटुंबाला आधार देण्यास मदत करते.",
    card2Label: "02 / वारसा",
    card2Title: "परंपरा जिवंत ठेवा",
    card2Text: "हस्तनिर्मित वस्तू स्थानिक ज्ञान, सांस्कृतिक परंपरा आणि एका पिढीकडून दुसऱ्या पिढीकडे आलेली मौल्यवान कौशल्ये जपतात.",
    card3Label: "03 / समुदाय",
    card3Title: "ग्रामीण भागात संधी निर्माण करा",
    card3Text: "कारागिरांना मोठ्या बाजारपेठांशी जोडल्याने त्यांच्या स्थानिक समुदायाबाहेरही संधी मिळतात आणि त्यांचे काम अधिक लोकांपर्यंत पोहोचते.",
    messageTitle: "लहान निवड, मोठा परिणाम.",
    messageText: "हस्तनिर्मित वस्तू निवडणे म्हणजे सर्जनशीलता, कलाकुसर आणि ती बनवणाऱ्या लोकांच्या मेहनतीचा आदर करणे. GramCraft कारागीर आणि ग्राहकांना एकाच बाजारपेठेत जोडते.",
    actionsTitle: "काहीतरी हस्तनिर्मित खास शोधा",
    actionsText: "अनोख्या वस्तू पाहा आणि काळजीपूर्वक बनवलेली एखादी वस्तू निवडा.",
    exploreButton: "बाजारपेठ पाहा",
    footer: "© 2026 GramCraft · ग्रामीण कलाकुसरीचा गौरव"
}


};

function applySupportLanguage(language) {
const t = supportTranslations[language] || supportTranslations.en;


document.documentElement.lang = language;
localStorage.setItem("gramCraftLanguage", language);

document.getElementById("languageLabel").textContent = t.language;
document.getElementById("backLink").textContent = t.back;

document.querySelector(".eyebrow").textContent = t.eyebrow;
document.querySelector(".hero h1").textContent = t.heroTitle;
document.querySelector(".hero p").textContent = t.heroText;

document.querySelector(".section-title").textContent = t.sectionTitle;
document.querySelector(".section-intro").textContent = t.sectionIntro;

const cards = document.querySelectorAll(".card");

if (cards.length >= 3) {
    cards[0].querySelector(".card-number").textContent = t.card1Label;
    cards[0].querySelector("h3").textContent = t.card1Title;
    cards[0].querySelector("p").textContent = t.card1Text;

    cards[1].querySelector(".card-number").textContent = t.card2Label;
    cards[1].querySelector("h3").textContent = t.card2Title;
    cards[1].querySelector("p").textContent = t.card2Text;

    cards[2].querySelector(".card-number").textContent = t.card3Label;
    cards[2].querySelector("h3").textContent = t.card3Title;
    cards[2].querySelector("p").textContent = t.card3Text;
}

document.querySelector(".message h2").textContent = t.messageTitle;
document.querySelector(".message p").textContent = t.messageText;

document.querySelector(".actions h2").textContent = t.actionsTitle;
document.querySelector(".actions p").textContent = t.actionsText;
document.querySelector(".actions .button").textContent = t.exploreButton;

document.querySelector("footer").textContent = t.footer;


}

const savedLanguage = localStorage.getItem("gramCraftLanguage") || "en";

languageSelect.value = savedLanguage;
applySupportLanguage(savedLanguage);

languageSelect.addEventListener("change", function () {
applySupportLanguage(this.value);
});
