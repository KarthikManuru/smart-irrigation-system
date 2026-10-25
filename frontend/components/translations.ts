export type Lang =
  | "en"
  | "hi"
  | "kn"
  | "ta"
  | "te"
  | "ml"
  | "mr"
  | "bn"
  | "gu"
  | "pa"
  | "or";

export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
];

export interface Dict {
  brand: string;
  nav: {
    home: string;
    features: string;
    about: string;
    contact: string;
    login: string;
    dashboard: string;
  };
  brandSub: string;
  hero: {
    line1: string;
    line2: string;
    line3: string;
    description: string;
    getStarted: string;
    watchDemo: string;
    features: { title: string; sub: string }[];
    stats: { title: string; sub: string }[];
  };
  cards: { weather: string; city: string; soil: string; optimal: string };
  // Two lines, shown at the bottom right of the hero
  tagline: [string, string];
}

const en: Dict = {
  brand: "Annadata",
  nav: {
    home: "Home",
    features: "Features",
    about: "About",
    contact: "Contact",
    login: "Login",
    dashboard: "Go to Dashboard",
  },
  brandSub: "Smart Irrigation for a Sustainable Tomorrow",
  hero: {
    line1: "Smarter Irrigation.",
    line2: "Healthier Crops.",
    line3: "A Greener Future.",
    description:
      "AI-powered irrigation system that uses real-time sensor data, weather forecasts and machine learning to give you the right amount of water, at the right time.",
    getStarted: "Get Started",
    watchDemo: "Watch Demo",
    features: [
      { title: "Real-time", sub: "Sensor Data" },
      { title: "Weather", sub: "Forecasts" },
      { title: "AI-Powered", sub: "Recommendations" },
      { title: "Multi-Language", sub: "Support" },
      { title: "Mobile-First", sub: "PWA" },
    ],
    stats: [
      { title: "Save Water", sub: "Up to 40%" },
      { title: "Increase Yield", sub: "Up to 30%" },
      { title: "Sustainable Farming", sub: "For Future Generations" },
    ],
  },
  cards: {
    weather: "Partly Cloudy",
    city: "Bengaluru",
    soil: "Soil Moisture",
    optimal: "Optimal",
  },
  tagline: ["ಸ್ಮಾರ್ಟ್ ರೈತ,", "ಸಮೃದ್ಧ ಭವಿಷ್ಯ"],
};

const hi: Dict = {
  brand: "अन्नदाता",
  nav: {
    home: "होम",
    features: "सुविधाएँ",
    about: "हमारे बारे में",
    contact: "संपर्क",
    login: "लॉगिन",
    dashboard: "डैशबोर्ड पर जाएँ",
  },
  brandSub: "टिकाऊ कल के लिए स्मार्ट सिंचाई",
  hero: {
    line1: "स्मार्ट सिंचाई।",
    line2: "स्वस्थ फसलें।",
    line3: "हरा-भरा भविष्य।",
    description:
      "एआई-आधारित सिंचाई प्रणाली, जो रीयल-टाइम सेंसर डेटा, मौसम पूर्वानुमान और मशीन लर्निंग की मदद से आपको सही समय पर सही मात्रा में पानी देने की सलाह देती है।",
    getStarted: "शुरू करें",
    watchDemo: "डेमो देखें",
    features: [
      { title: "रीयल-टाइम", sub: "सेंसर डेटा" },
      { title: "मौसम", sub: "पूर्वानुमान" },
      { title: "एआई-आधारित", sub: "सुझाव" },
      { title: "बहु-भाषा", sub: "समर्थन" },
      { title: "मोबाइल-फर्स्ट", sub: "PWA" },
    ],
    stats: [
      { title: "पानी बचाएँ", sub: "40% तक" },
      { title: "पैदावार बढ़ाएँ", sub: "30% तक" },
      { title: "टिकाऊ खेती", sub: "आने वाली पीढ़ियों के लिए" },
    ],
  },
  cards: {
    weather: "आंशिक बादल",
    city: "बेंगलुरु",
    soil: "मिट्टी की नमी",
    optimal: "उत्तम",
  },
  tagline: ["आप देश का पेट भरते हैं,", "हम आपके साथ हैं।"],
};

const kn: Dict = {
  brand: "ಅನ್ನದಾತ",
  nav: {
    home: "ಮುಖಪುಟ",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    login: "ಲಾಗಿನ್",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ",
  },
  brandSub: "ಸುಸ್ಥಿರ ನಾಳೆಗಾಗಿ ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ",
  hero: {
    line1: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ.",
    line2: "ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು.",
    line3: "ಹಸಿರು ಭವಿಷ್ಯ.",
    description:
      "ನೈಜ-ಸಮಯದ ಸೆನ್ಸರ್ ಡೇಟಾ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಮಷಿನ್ ಲರ್ನಿಂಗ್ ಬಳಸಿ, ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಸರಿಯಾದ ಪ್ರಮಾಣದ ನೀರನ್ನು ಸೂಚಿಸುವ AI ಆಧಾರಿತ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    watchDemo: "ಡೆಮೊ ನೋಡಿ",
    features: [
      { title: "ನೈಜ-ಸಮಯ", sub: "ಸೆನ್ಸರ್ ಡೇಟಾ" },
      { title: "ಹವಾಮಾನ", sub: "ಮುನ್ಸೂಚನೆ" },
      { title: "AI ಆಧಾರಿತ", sub: "ಶಿಫಾರಸುಗಳು" },
      { title: "ಬಹು-ಭಾಷೆ", sub: "ಬೆಂಬಲ" },
      { title: "ಮೊಬೈಲ್-ಫಸ್ಟ್", sub: "PWA" },
    ],
    stats: [
      { title: "ನೀರು ಉಳಿಸಿ", sub: "40% ವರೆಗೆ" },
      { title: "ಇಳುವರಿ ಹೆಚ್ಚಿಸಿ", sub: "30% ವರೆಗೆ" },
      { title: "ಸುಸ್ಥಿರ ಕೃಷಿ", sub: "ಮುಂದಿನ ಪೀಳಿಗೆಗಾಗಿ" },
    ],
  },
  cards: {
    weather: "ಭಾಗಶಃ ಮೋಡ",
    city: "ಬೆಂಗಳೂರು",
    soil: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    optimal: "ಉತ್ತಮ",
  },
  tagline: ["ಸ್ಮಾರ್ಟ್ ರೈತ,", "ಸಮೃದ್ಧ ಭವಿಷ್ಯ"],
};

const ta: Dict = {
  brand: "அன்னதாதா",
  nav: {
    home: "முகப்பு",
    features: "அம்சங்கள்",
    about: "எங்களைப் பற்றி",
    contact: "தொடர்பு",
    login: "உள்நுழை",
    dashboard: "டாஷ்போர்டுக்குச் செல்லவும்",
  },
  brandSub: "நிலையான நாளைக்கான ஸ்மார்ட் நீர்ப்பாசனம்",
  hero: {
    line1: "ஸ்மார்ட் நீர்ப்பாசனம்.",
    line2: "ஆரோக்கியமான பயிர்கள்.",
    line3: "பசுமையான எதிர்காலம்.",
    description:
      "நிகழ்நேர சென்சார் தரவு, வானிலை முன்னறிவிப்பு மற்றும் இயந்திரக் கற்றலைப் பயன்படுத்தி, சரியான நேரத்தில் சரியான அளவு தண்ணீரைப் பரிந்துரைக்கும் AI அடிப்படையிலான நீர்ப்பாசன அமைப்பு.",
    getStarted: "தொடங்குங்கள்",
    watchDemo: "டெமோ பாருங்கள்",
    features: [
      { title: "நிகழ்நேர", sub: "சென்சார் தரவு" },
      { title: "வானிலை", sub: "முன்னறிவிப்பு" },
      { title: "AI அடிப்படையிலான", sub: "பரிந்துரைகள்" },
      { title: "பல மொழி", sub: "ஆதரவு" },
      { title: "மொபைல்-முதல்", sub: "PWA" },
    ],
    stats: [
      { title: "தண்ணீரைச் சேமிக்கவும்", sub: "40% வரை" },
      { title: "விளைச்சலை அதிகரிக்கவும்", sub: "30% வரை" },
      { title: "நிலையான விவசாயம்", sub: "எதிர்கால தலைமுறைகளுக்காக" },
    ],
  },
  cards: {
    weather: "பகுதி மேகமூட்டம்",
    city: "பெங்களூரு",
    soil: "மண் ஈரப்பதம்",
    optimal: "சிறந்தது",
  },
  tagline: ["நீங்கள் நாட்டுக்கு உணவளிக்கிறீர்கள்,", "நாங்கள் உங்களுடன் இருக்கிறோம்."],
};

const te: Dict = {
  brand: "అన్నదాత",
  nav: {
    home: "హోమ్",
    features: "ఫీచర్లు",
    about: "మా గురించి",
    contact: "సంప్రదించండి",
    login: "లాగిన్",
    dashboard: "డాష్‌బోర్డ్‌కు వెళ్లండి",
  },
  brandSub: "స్థిరమైన రేపటి కోసం స్మార్ట్ నీటిపారుదల",
  hero: {
    line1: "స్మార్ట్ నీటిపారుదల.",
    line2: "ఆరోగ్యకరమైన పంటలు.",
    line3: "పచ్చని భవిష్యత్తు.",
    description:
      "రియల్-టైమ్ సెన్సార్ డేటా, వాతావరణ సూచనలు మరియు మెషిన్ లెర్నింగ్ ఉపయోగించి, సరైన సమయంలో సరైన మొత్తంలో నీటిని సూచించే AI ఆధారిత నీటిపారుదల వ్యవస్థ.",
    getStarted: "ప్రారంభించండి",
    watchDemo: "డెమో చూడండి",
    features: [
      { title: "రియల్-టైమ్", sub: "సెన్సార్ డేటా" },
      { title: "వాతావరణ", sub: "సూచనలు" },
      { title: "AI ఆధారిత", sub: "సిఫార్సులు" },
      { title: "బహుభాషా", sub: "మద్దతు" },
      { title: "మొబైల్-ఫస్ట్", sub: "PWA" },
    ],
    stats: [
      { title: "నీటిని ఆదా చేయండి", sub: "40% వరకు" },
      { title: "దిగుబడి పెంచండి", sub: "30% వరకు" },
      { title: "స్థిరమైన వ్యవసాయం", sub: "భవిష్యత్ తరాల కోసం" },
    ],
  },
  cards: {
    weather: "పాక్షికంగా మేఘావృతం",
    city: "బెంగళూరు",
    soil: "నేల తేమ",
    optimal: "అనుకూలం",
  },
  tagline: ["మీరు దేశానికి అన్నం పెడతారు,", "మేము మీతో ఉన్నాము."],
};

const ml: Dict = {
  brand: "അന്നദാതാ",
  nav: {
    home: "ഹോം",
    features: "സവിശേഷതകൾ",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    contact: "ബന്ധപ്പെടുക",
    login: "ലോഗിൻ",
    dashboard: "ഡാഷ്‌ബോർഡിലേക്ക് പോകുക",
  },
  brandSub: "സുസ്ഥിര നാളേക്കായി സ്മാർട്ട് ജലസേചനം",
  hero: {
    line1: "സ്മാർട്ട് ജലസേചനം.",
    line2: "ആരോഗ്യമുള്ള വിളകൾ.",
    line3: "പച്ചപ്പുള്ള ഭാവി.",
    description:
      "തത്സമയ സെൻസർ ഡാറ്റ, കാലാവസ്ഥാ പ്രവചനം, മെഷീൻ ലേണിംഗ് എന്നിവ ഉപയോഗിച്ച് ശരിയായ സമയത്ത് ശരിയായ അളവിൽ വെള്ളം നിർദ്ദേശിക്കുന്ന AI അധിഷ്ഠിത ജലസേചന സംവിധാനം.",
    getStarted: "ആരംഭിക്കുക",
    watchDemo: "ഡെമോ കാണുക",
    features: [
      { title: "തത്സമയ", sub: "സെൻസർ ഡാറ്റ" },
      { title: "കാലാവസ്ഥ", sub: "പ്രവചനം" },
      { title: "AI അധിഷ്ഠിത", sub: "ശുപാർശകൾ" },
      { title: "ബഹുഭാഷാ", sub: "പിന്തുണ" },
      { title: "മൊബൈൽ-ഫസ്റ്റ്", sub: "PWA" },
    ],
    stats: [
      { title: "വെള്ളം ലാഭിക്കൂ", sub: "40% വരെ" },
      { title: "വിളവ് കൂട്ടൂ", sub: "30% വരെ" },
      { title: "സുസ്ഥിര കൃഷി", sub: "വരും തലമുറകൾക്കായി" },
    ],
  },
  cards: {
    weather: "ഭാഗികമായി മേഘാവൃതം",
    city: "ബെംഗളൂരു",
    soil: "മണ്ണിലെ ഈർപ്പം",
    optimal: "ഉത്തമം",
  },
  tagline: ["നിങ്ങൾ നാടിന് അന്നം നൽകുന്നു,", "ഞങ്ങൾ നിങ്ങൾക്കൊപ്പമുണ്ട്."],
};

const mr: Dict = {
  brand: "अन्नदाता",
  nav: {
    home: "मुख्यपृष्ठ",
    features: "वैशिष्ट्ये",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
    login: "लॉगिन",
    dashboard: "डॅशबोर्डवर जा",
  },
  brandSub: "शाश्वत उद्यासाठी स्मार्ट सिंचन",
  hero: {
    line1: "स्मार्ट सिंचन.",
    line2: "निरोगी पिके.",
    line3: "हिरवेगार भविष्य.",
    description:
      "रिअल-टाइम सेन्सर डेटा, हवामान अंदाज आणि मशीन लर्निंगच्या मदतीने योग्य वेळी योग्य प्रमाणात पाणी सुचवणारी AI-आधारित सिंचन प्रणाली.",
    getStarted: "सुरू करा",
    watchDemo: "डेमो पहा",
    features: [
      { title: "रिअल-टाइम", sub: "सेन्सर डेटा" },
      { title: "हवामान", sub: "अंदाज" },
      { title: "AI-आधारित", sub: "शिफारसी" },
      { title: "बहुभाषिक", sub: "समर्थन" },
      { title: "मोबाइल-फर्स्ट", sub: "PWA" },
    ],
    stats: [
      { title: "पाणी वाचवा", sub: "40% पर्यंत" },
      { title: "उत्पादन वाढवा", sub: "30% पर्यंत" },
      { title: "शाश्वत शेती", sub: "भावी पिढ्यांसाठी" },
    ],
  },
  cards: {
    weather: "अंशतः ढगाळ",
    city: "बेंगळुरू",
    soil: "मातीतील ओलावा",
    optimal: "उत्तम",
  },
  tagline: ["तुम्ही देशाला अन्न देता,", "आम्ही तुमच्या सोबत आहोत."],
};

const bn: Dict = {
  brand: "অন্নদাতা",
  nav: {
    home: "হোম",
    features: "বৈশিষ্ট্য",
    about: "আমাদের সম্পর্কে",
    contact: "যোগাযোগ",
    login: "লগইন",
    dashboard: "ড্যাশবোর্ডে যান",
  },
  brandSub: "টেকসই আগামীর জন্য স্মার্ট সেচ",
  hero: {
    line1: "স্মার্ট সেচ।",
    line2: "সুস্থ ফসল।",
    line3: "সবুজ ভবিষ্যৎ।",
    description:
      "রিয়েল-টাইম সেন্সর ডেটা, আবহাওয়ার পূর্বাভাস ও মেশিন লার্নিং ব্যবহার করে সঠিক সময়ে সঠিক পরিমাণ জলের পরামর্শ দেয় এমন AI-ভিত্তিক সেচ ব্যবস্থা।",
    getStarted: "শুরু করুন",
    watchDemo: "ডেমো দেখুন",
    features: [
      { title: "রিয়েল-টাইম", sub: "সেন্সর ডেটা" },
      { title: "আবহাওয়া", sub: "পূর্বাভাস" },
      { title: "AI-ভিত্তিক", sub: "পরামর্শ" },
      { title: "বহুভাষিক", sub: "সহায়তা" },
      { title: "মোবাইল-ফার্স্ট", sub: "PWA" },
    ],
    stats: [
      { title: "জল বাঁচান", sub: "40% পর্যন্ত" },
      { title: "ফলন বাড়ান", sub: "30% পর্যন্ত" },
      { title: "টেকসই কৃষি", sub: "ভবিষ্যৎ প্রজন্মের জন্য" },
    ],
  },
  cards: {
    weather: "আংশিক মেঘলা",
    city: "বেঙ্গালুরু",
    soil: "মাটির আর্দ্রতা",
    optimal: "সর্বোত্তম",
  },
  tagline: ["আপনি দেশের মুখে অন্ন তুলে দেন,", "আমরা আপনার পাশে আছি।"],
};

const gu: Dict = {
  brand: "અન્નદાતા",
  nav: {
    home: "હોમ",
    features: "સુવિધાઓ",
    about: "અમારા વિશે",
    contact: "સંપર્ક",
    login: "લૉગિન",
    dashboard: "ડેશબોર્ડ પર જાઓ",
  },
  brandSub: "ટકાઉ આવતીકાલ માટે સ્માર્ટ સિંચાઈ",
  hero: {
    line1: "સ્માર્ટ સિંચાઈ.",
    line2: "સ્વસ્થ પાક.",
    line3: "હરિયાળું ભવિષ્ય.",
    description:
      "રિયલ-ટાઇમ સેન્સર ડેટા, હવામાન આગાહી અને મશીન લર્નિંગની મદદથી યોગ્ય સમયે યોગ્ય માત્રામાં પાણી સૂચવતી AI આધારિત સિંચાઈ સિસ્ટમ.",
    getStarted: "શરૂ કરો",
    watchDemo: "ડેમો જુઓ",
    features: [
      { title: "રિયલ-ટાઇમ", sub: "સેન્સર ડેટા" },
      { title: "હવામાન", sub: "આગાહી" },
      { title: "AI આધારિત", sub: "ભલામણો" },
      { title: "બહુભાષી", sub: "સપોર્ટ" },
      { title: "મોબાઇલ-ફર્સ્ટ", sub: "PWA" },
    ],
    stats: [
      { title: "પાણી બચાવો", sub: "40% સુધી" },
      { title: "ઉપજ વધારો", sub: "30% સુધી" },
      { title: "ટકાઉ ખેતી", sub: "ભાવિ પેઢીઓ માટે" },
    ],
  },
  cards: {
    weather: "અંશતઃ વાદળછાયું",
    city: "બેંગલુરુ",
    soil: "જમીનનો ભેજ",
    optimal: "ઉત્તમ",
  },
  tagline: ["તમે દેશને અન્ન આપો છો,", "અમે તમારી સાથે છીએ."],
};

const pa: Dict = {
  brand: "ਅੰਨਦਾਤਾ",
  nav: {
    home: "ਹੋਮ",
    features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    contact: "ਸੰਪਰਕ",
    login: "ਲੌਗਇਨ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਜਾਓ",
  },
  brandSub: "ਟਿਕਾਊ ਕੱਲ੍ਹ ਲਈ ਸਮਾਰਟ ਸਿੰਚਾਈ",
  hero: {
    line1: "ਸਮਾਰਟ ਸਿੰਚਾਈ।",
    line2: "ਸਿਹਤਮੰਦ ਫ਼ਸਲਾਂ।",
    line3: "ਹਰਿਆ-ਭਰਿਆ ਭਵਿੱਖ।",
    description:
      "ਰੀਅਲ-ਟਾਈਮ ਸੈਂਸਰ ਡੇਟਾ, ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ ਅਤੇ ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਦੀ ਮਦਦ ਨਾਲ ਸਹੀ ਸਮੇਂ 'ਤੇ ਸਹੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਣੀ ਦੱਸਣ ਵਾਲੀ AI-ਆਧਾਰਿਤ ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ।",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    watchDemo: "ਡੈਮੋ ਦੇਖੋ",
    features: [
      { title: "ਰੀਅਲ-ਟਾਈਮ", sub: "ਸੈਂਸਰ ਡੇਟਾ" },
      { title: "ਮੌਸਮ", sub: "ਭਵਿੱਖਬਾਣੀ" },
      { title: "AI-ਆਧਾਰਿਤ", sub: "ਸੁਝਾਅ" },
      { title: "ਬਹੁ-ਭਾਸ਼ਾਈ", sub: "ਸਹਾਇਤਾ" },
      { title: "ਮੋਬਾਈਲ-ਫਸਟ", sub: "PWA" },
    ],
    stats: [
      { title: "ਪਾਣੀ ਬਚਾਓ", sub: "40% ਤੱਕ" },
      { title: "ਝਾੜ ਵਧਾਓ", sub: "30% ਤੱਕ" },
      { title: "ਟਿਕਾਊ ਖੇਤੀ", sub: "ਆਉਣ ਵਾਲੀਆਂ ਪੀੜ੍ਹੀਆਂ ਲਈ" },
    ],
  },
  cards: {
    weather: "ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ",
    city: "ਬੈਂਗਲੁਰੂ",
    soil: "ਮਿੱਟੀ ਦੀ ਨਮੀ",
    optimal: "ਬਿਹਤਰੀਨ",
  },
  tagline: ["ਤੁਸੀਂ ਦੇਸ਼ ਦਾ ਢਿੱਡ ਭਰਦੇ ਹੋ,", "ਅਸੀਂ ਤੁਹਾਡੇ ਨਾਲ ਹਾਂ।"],
};

const or: Dict = {
  brand: "ଅନ୍ନଦାତା",
  nav: {
    home: "ହୋମ୍",
    features: "ବୈଶିଷ୍ଟ୍ୟ",
    about: "ଆମ ବିଷୟରେ",
    contact: "ଯୋଗାଯୋଗ",
    login: "ଲଗଇନ୍",
    dashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଯାଆନ୍ତୁ",
  },
  brandSub: "ସ୍ଥାୟୀ ଭବିଷ୍ୟତ ପାଇଁ ସ୍ମାର୍ଟ ଜଳସେଚନ",
  hero: {
    line1: "ସ୍ମାର୍ଟ ଜଳସେଚନ।",
    line2: "ସୁସ୍ଥ ଫସଲ।",
    line3: "ସବୁଜ ଭବିଷ୍ୟତ।",
    description:
      "ରିଅଲ-ଟାଇମ୍ ସେନ୍ସର ଡାଟା, ପାଣିପାଗ ପୂର୍ବାନୁମାନ ଏବଂ ମେସିନ୍ ଲର୍ନିଂ ବ୍ୟବହାର କରି ଠିକ୍ ସମୟରେ ଠିକ୍ ପରିମାଣର ପାଣି ସୁଝାଉଥିବା AI-ଆଧାରିତ ଜଳସେଚନ ବ୍ୟବସ୍ଥା।",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    watchDemo: "ଡେମୋ ଦେଖନ୍ତୁ",
    features: [
      { title: "ରିଅଲ-ଟାଇମ୍", sub: "ସେନ୍ସର ଡାଟା" },
      { title: "ପାଣିପାଗ", sub: "ପୂର୍ବାନୁମାନ" },
      { title: "AI-ଆଧାରିତ", sub: "ସୁପାରିଶ" },
      { title: "ବହୁଭାଷୀ", sub: "ସହାୟତା" },
      { title: "ମୋବାଇଲ୍-ଫାର୍ଷ୍ଟ", sub: "PWA" },
    ],
    stats: [
      { title: "ପାଣି ବଞ୍ଚାନ୍ତୁ", sub: "40% ପର୍ଯ୍ୟନ୍ତ" },
      { title: "ଅମଳ ବଢ଼ାନ୍ତୁ", sub: "30% ପର୍ଯ୍ୟନ୍ତ" },
      { title: "ସ୍ଥାୟୀ କୃଷି", sub: "ଭବିଷ୍ୟତ ପିଢ଼ି ପାଇଁ" },
    ],
  },
  cards: {
    weather: "ଆଂଶିକ ମେଘୁଆ",
    city: "ବେଙ୍ଗାଲୁରୁ",
    soil: "ମାଟିର ଆର୍ଦ୍ରତା",
    optimal: "ଉତ୍ତମ",
  },
  tagline: ["ଆପଣ ଦେଶକୁ ଅନ୍ନ ଦିଅନ୍ତି,", "ଆମେ ଆପଣଙ୍କ ସହିତ ଅଛୁ।"],
};

export const translations: Record<Lang, Dict> = {
  en,
  hi,
  kn,
  ta,
  te,
  ml,
  mr,
  bn,
  gu,
  pa,
  or,
};
