"use client";

import { useRef, useState } from "react";
import { Mic, Send, Volume2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { languages, type Lang } from "@/components/translations";
import { Card, MockNote, PageHeader, btnPrimary, inputCls } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";

type Tab = "text" | "voice" | "language";

// Browser speech codes for each language
const speechCode: Record<Lang, string> = {
  en: "en-IN", hi: "hi-IN", kn: "kn-IN", ta: "ta-IN", te: "te-IN", ml: "ml-IN",
  mr: "mr-IN", bn: "bn-IN", gu: "gu-IN", pa: "pa-IN", or: "or-IN",
};

// Sample answers for all 11 supported languages.
const sample: Record<Lang, { q: string; water: string; rain: string }> = {
  en: { q: "Should I water Field 2 today?", water: "Yes. Water Field 2 for 46 minutes at 05:30 PM (about 36,400 litres). Rain is expected in 2 days, so do not water more than this.", rain: "Rain is expected in 2 days, about 12 mm." },
  hi: { q: "क्या आज खेत 2 में पानी देना है?", water: "हाँ। खेत 2 में शाम 05:30 बजे 46 मिनट पानी दें (लगभग 36,400 लीटर)। 2 दिन में बारिश की संभावना है, इसलिए इससे ज़्यादा पानी न दें।", rain: "2 दिन में लगभग 12 मिमी बारिश की संभावना है।" },
  kn: { q: "ಇಂದು ಹೊಲ 2ಕ್ಕೆ ನೀರು ಹಾಯಿಸಬೇಕೇ?", water: "ಹೌದು. ಹೊಲ 2ಕ್ಕೆ ಸಂಜೆ 05:30ಕ್ಕೆ 46 ನಿಮಿಷ ನೀರು ಹಾಯಿಸಿ (ಸುಮಾರು 36,400 ಲೀಟರ್). 2 ದಿನದಲ್ಲಿ ಮಳೆ ಬರುವ ಸಂಭವವಿದೆ, ಇದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬೇಡ.", rain: "2 ದಿನದಲ್ಲಿ ಸುಮಾರು 12 ಮಿಮೀ ಮಳೆ ಬರುವ ಸಂಭವವಿದೆ." },
  ta: { q: "இன்று வயல் 2க்கு தண்ணீர் பாய்ச்ச வேண்டுமா?", water: "ஆம். வயல் 2க்கு மாலை 05:30 மணிக்கு 46 நிமிடங்கள் தண்ணீர் பாய்ச்சவும் (சுமார் 36,400 லிட்டர்). 2 நாட்களில் மழை எதிர்பார்க்கப்படுகிறது, எனவே இதற்கு மேல் பாய்ச்ச வேண்டாம்.", rain: "2 நாட்களில் சுமார் 12 மிமீ மழை எதிர்பார்க்கப்படுகிறது." },
  te: { q: "ఈరోజు పొలం 2కి నీరు పెట్టాలా?", water: "అవును. పొలం 2కి సాయంత్రం 05:30 గంటలకు 46 నిమిషాలు నీరు పెట్టండి (సుమారు 36,400 లీటర్లు). 2 రోజుల్లో వర్షం వచ్చే అవకాశం ఉంది, కాబట్టి ఇంతకంటే ఎక్కువ పెట్టవద్దు.", rain: "2 రోజుల్లో సుమారు 12 మిమీ వర్షం పడే అవకాశం ఉంది." },
  ml: { q: "ഇന്ന് വയൽ 2 നനയ്ക്കണമോ?", water: "അതെ. വൈകുന്നേരം 05:30 ന് 46 മിനിറ്റ് വയൽ 2 നനയ്ക്കുക (ഏകദേശം 36,400 ലിറ്റർ). 2 ദിവസത്തിനുള്ളിൽ മഴ പ്രതീക്ഷിക്കുന്നു, അതിനാൽ ഇതിൽ കൂടുതൽ നനയ്ക്കരുത്.", rain: "2 ദിവസത്തിനുള്ളിൽ ഏകദേശം 12 മില്ലീമീറ്റർ മഴ പ്രതീക്ഷിക്കുന്നു." },
  mr: { q: "आज शेत २ ला पाणी द्यायचे का?", water: "होय. शेत २ ला संध्याकाळी ०५:३० वाजता ४६ मिनिटे पाणी द्या (सुमारे ३६,४०० लिटर). २ दिवसांत पावसाची शक्यता आहे, त्यामुळे यापेक्षा जास्त पाणी देऊ नका.", rain: "२ दिवसांत सुमारे १२ मिमी पावसाची शक्यता आहे." },
  bn: { q: "আজ কি ক্ষেত ২-এ জল দিতে হবে?", water: "হ্যাঁ। ক্ষেত ২-এ বিকেল ০৫:৩০ টায় ৪৬ মিনিট জল দিন (প্রায় ৩৬,৪০০ লিটার)। ২ দিনে বৃষ্টির সম্ভাবনা আছে, তাই এর বেশি জল দেবেন না।", rain: "২ দিনে প্রায় ১২ মিমি বৃষ্টির সম্ভাবনা রয়েছে।" },
  gu: { q: "શું આજે ખેતર 2 માં પાણી આપવું જોઈએ?", water: "હા. ખેતર 2 માં સાંજે 05:30 વાગ્યે 46 મિનિટ પાણી આપો (આશરે 36,400 લિટર). 2 દિવસમાં વરસાદની શક્યતા છે, તેથી આનાથી વધુ પાણી ન આપો.", rain: "2 દિવસમાં આશરે 12 મીમી વરસાદની શક્યતા છે." },
  pa: { q: "ਕੀ ਅੱਜ ਖੇਤ 2 ਨੂੰ ਪਾਣੀ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ?", water: "ਹਾਂ। ਖੇਤ 2 ਨੂੰ ਸ਼ਾਮ 05:30 ਵਜੇ 46 ਮਿੰਟ ਪਾਣੀ ਦਿਓ (ਲਗਭਗ 36,400 ਲੀਟਰ)। 2 ਦਿਨਾਂ ਵਿੱਚ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ, ਇਸ ਲਈ ਇਸ ਤੋਂ ਵੱਧ ਪਾਣੀ ਨਾ ਦਿਓ।", rain: "2 ਦਿਨਾਂ ਵਿੱਚ ਲਗਭਗ 12 ਮਿਮੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ।" },
  or: { q: "ଆଜି କ୍ଷେତ୍ର ୨ରେ ପାଣି ଦେବା ଉଚିତ କି?", water: "ହଁ। କ୍ଷେତ୍ର ୨ରେ ସନ୍ଧ୍ୟା ୦୫:୩୦ରେ ୪୬ ମିନିଟ୍ ପାଣି ଦିଅନ୍ତୁ (ପ୍ରାୟ ୩୬,୪୦୦ ଲିଟର)। ୨ ଦିନରେ ବର୍ଷା ସମ୍ଭାବନା ଅଛି, ତେଣୁ ଏହାଠାରୁ ଅଧିକ ପାଣି ଦିଅନ୍ତୁ ନାହିଁ।", rain: "୨ ଦିନରେ ପ୍ରାୟ ୧୨ ମିମି ବର୍ଷାର ସମ୍ଭାବନା ଅଛି।" },
};

// Minimal typing for the browser speech API
interface Rec {
  lang: string; interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start(): void; stop(): void;
}

export default function VoicePage() {
  const t = useT();
  const { lang, setLang } = useLanguage();
  const [tab, setTab] = useState<Tab>("voice");
  const [listening, setListening] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [text, setText] = useState("");
  const rec = useRef<Rec | null>(null);

  const s = sample[lang] ?? sample.en;

  function respond(q: string) {
    setQuestion(q);
    const askedRain = /rain|बारिश|ಮಳೆ|மழை|వర్షం|മഴ|पाऊस|বৃষ্টি|વરસાદ|ਮੀਂਹ|ବର୍ଷା/i.test(q);
    const a = askedRain ? s.rain : s.water;
    setAnswer(a);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(a);
      u.lang = speechCode[lang];
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  }

  function toggleMic() {
    if (listening) { rec.current?.stop(); return; }
    const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) { respond(s.q); return; } // browser has no speech input: show a demo question
    const r = new SR();
    r.lang = speechCode[lang];
    r.interimResults = false;
    r.onresult = (e) => respond(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    rec.current = r;
    setListening(true);
    r.start();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "text", label: t("Text") },
    { id: "voice", label: t("Voice") },
    { id: "language", label: t("Language") },
  ];

  // Default to sample query and response in the selected language if none asked yet
  const displayQ = question || s.q;
  const displayA = answer || s.water;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Window title bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Mic className="h-4 w-4" />
            </div>
            <h1 className="font-bold text-slate-900 text-base">{t("Multi-Language & Voice Assistant")}</h1>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-xs cursor-pointer hover:text-slate-600">─</span>
            <span className="text-xs cursor-pointer hover:text-slate-600">◻</span>
            <span className="text-xs cursor-pointer hover:text-slate-600">✕</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Segmented control */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              {tabs.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setTab(x.id)}
                  className={`rounded-full px-5 py-1.5 text-xs font-semibold transition ${
                    tab === x.id ? "bg-emerald-700 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Language row */}
          <div className="flex justify-center gap-3">
            {[
              { code: "en", label: "English" },
              { code: "hi", label: "हिंदी" },
              { code: "kn", label: "ಕನ್ನಡ" },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  lang === l.code
                    ? "border-2 border-emerald-600 bg-emerald-50/50 text-emerald-700"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Center visualizer */}
          {tab === "voice" && (
            <div className="flex flex-col items-center justify-center gap-3 py-2">
              <div className="flex items-center gap-4">
                {/* Audio wave left */}
                <div className="flex items-center gap-1">
                  <span className="h-3 w-1 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="h-6 w-1 rounded-full bg-emerald-400 animate-pulse delay-75" />
                  <span className="h-9 w-1 rounded-full bg-emerald-500 animate-pulse delay-150" />
                  <span className="h-5 w-1 rounded-full bg-emerald-400 animate-pulse delay-100" />
                </div>

                <button
                  onClick={toggleMic}
                  aria-label={t("Microphone")}
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 ${
                    listening ? "bg-red-500 ring-4 ring-red-200" : "bg-emerald-700 ring-4 ring-emerald-100"
                  }`}
                >
                  <Mic className="h-7 w-7" />
                </button>

                {/* Audio wave right */}
                <div className="flex items-center gap-1">
                  <span className="h-5 w-1 rounded-full bg-emerald-400 animate-pulse delay-100" />
                  <span className="h-9 w-1 rounded-full bg-emerald-500 animate-pulse delay-150" />
                  <span className="h-6 w-1 rounded-full bg-emerald-400 animate-pulse delay-75" />
                  <span className="h-3 w-1 rounded-full bg-emerald-300 animate-pulse" />
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-500">{t("Listening...")}</p>
            </div>
          )}

          {tab === "text" && (
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (text.trim()) { respond(text.trim()); setText(""); } }}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t("Type your query in any language...")} className={inputCls} />
              <button className={btnPrimary} type="submit" aria-label={t("Send")}><Send className="h-4 w-4" /></button>
            </form>
          )}

          {tab === "language" && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                    lang === l.code ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-700"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}

          {/* Conversation chat bubbles */}
          <div className="space-y-3 pt-2">
            {/* User message */}
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-800 shadow-sm max-w-[80%]">
                {displayQ}
              </div>
            </div>

            {/* Assistant message */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
                <span className="text-sm">👨‍🌾</span>
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-sky-50 px-4 py-2.5 text-xs font-medium text-slate-800 shadow-sm max-w-[85%] leading-relaxed border border-sky-100">
                {displayA}
              </div>
            </div>
          </div>

          {/* Sarvam AI Footer */}
          <div className="pt-2 text-center">
            <p className="text-[11px] font-medium text-slate-400">
              {t("Powered by")} <span className="font-semibold text-slate-600">Sarvam AI</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
