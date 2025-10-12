import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGS = ["he", "en", "ru", "am"];
const FALLBACK_LANG = "he";
const STORAGE_KEY = "lang";

const resources = {
  he: {
    translation: {
      ui: {
        language: "שפה",
        languageSelect: "בחירת שפה",
        fontControl: "בקרת גודל טקסט",
        decrease: "הקטנת טקסט",
        increase: "הגדלת טקסט",
        darkMode: "מצב כהה",
      },
      home: {
        welcome: "ברוכים הבאים ל“נכד” 👋",
        subtitle: "שירותים יומיומיים בלחיצה – בעברית ובגדלים שמתאימים לך.",
        emergency: "חירום",
        emergencySub: "משטרה · מד״א · כיבוי",
        police: "משטרה",
        mda: "מד״א",
        fire: "כיבוי אש",
        bookDoctor: "קבע תור לרופא",
        kupotSub: "כללית · מכבי · לאומית",
        orderTaxi: "הזמן מונית",
        taxiSub: "Gett · Yango",
        shelter: "מרחב מוגן קרוב",
        shelterSub: "מצא מרחב מוגן קרוב (Google Maps)",
        footer: "שירות פשוט. בעברית. בשבילך.",
      },
      kupot: {
        clalit: "כללית",
        maccabi: "מכבי",
        leumit: "לאומית",
      },
    },
  },
  en: {
    translation: {
      ui: {
        language: "Language",
        languageSelect: "Choose language",
        fontControl: "Text size control",
        decrease: "Decrease text",
        increase: "Increase text",
        darkMode: "Dark mode",
      },
      home: {
        welcome: 'Welcome to "Neched" 👋',
        subtitle: "Everyday services at a tap — in your language and size.",
        emergency: "Emergency",
        emergencySub: "Police · Ambulance · Fire",
        police: "Police",
        mda: "Ambulance",
        fire: "Fire",
        bookDoctor: "Book a Doctor",
        kupotSub: "Clalit · Maccabi · Leumit",
        orderTaxi: "Order a Taxi",
        taxiSub: "Gett · Yango",
        shelter: "Nearest shelter",
        shelterSub: "Find nearest shelter (Google Maps)",
        footer: "Simple service. For you.",
      },
      kupot: {
        clalit: "Clalit",
        maccabi: "Maccabi",
        leumit: "Leumit",
      },
    },
  },
  ru: {
    translation: {
      ui: {
        language: "Язык",
        languageSelect: "Выбор языка",
        fontControl: "Размер текста",
        decrease: "Уменьшить текст",
        increase: "Увеличить текст",
        darkMode: "Тёмная тема",
      },
      home: {
        welcome: "Добро пожаловать в «Нехед» 👋",
        subtitle: "Повседневные услуги — в один клик, на удобном языке и размере.",
        emergency: "Экстренные службы",
        emergencySub: "Полиция · Скорая · Пожарные",
        police: "Полиция",
        mda: "Скорая",
        fire: "Пожарные",
        bookDoctor: "Запись к врачу",
        kupotSub: "Клалит · Маккаби · Леумит",
        orderTaxi: "Заказать такси",
        taxiSub: "Gett · Yango",
        shelter: "Ближайшее убежище",
        shelterSub: "Найти ближайшее убежище (Google Maps)",
        footer: "Простой сервис. Для вас.",
      },
      kupot: {
        clalit: "Клалит",
        maccabi: "Маккаби",
        leumit: "Леумит",
      },
    },
  },
  am: {
    translation: {
      ui: {
        language: "ቋንቋ",
        languageSelect: "ቋንቋ ይምረጡ",
        fontControl: "የጽሑፍ መጠን",
        decrease: "ጽሑፍ አሳንስ",
        increase: "ጽሑፍ አብስ",
        darkMode: "ጨለማ ሁኔታ",
      },
      home: {
        welcome: "እንኳን ወደ “ነኸድ” በደህና መጡ 👋",
        subtitle: "ዕለታዊ አገልግሎቶች በአንድ ጠቅ — በቋንቋዎ እና በመጠኑ.",
        emergency: "አስቸኳይ",
        emergencySub: "ፖሊስ · አምቡላንስ · እሳት",
        police: "ፖሊስ",
        mda: "አምቡላንስ",
        fire: "እሳት",
        bookDoctor: "ሐኪም ይዘጋጁ",
        kupotSub: "ክላሊት · ማካቢ · ለኡሚት",
        orderTaxi: "ታክሲ ይዘዙ",
        taxiSub: "Gett · Yango",
        shelter: "ቅርብ መጠለያ",
        shelterSub: "ቅርብ መጠለያ ፈልግ (Google Maps)",
        footer: "ቀላል አገልግሎት። ለእርስዎ።",
      },
      kupot: {
        clalit: "ክላሊት",
        maccabi: "ማካቢ",
        leumit: "ለኡሚት",
      },
    },
  },
};

// קובע שפה ראשונית
const initialLang = (() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(nav) ? nav : FALLBACK_LANG;
})();

function applyHtmlLangDir(lang) {
  const isRTL = lang === "he";
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: FALLBACK_LANG,
  interpolation: { escapeValue: false },
});

applyHtmlLangDir(initialLang);

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  applyHtmlLangDir(lng);
});

export default i18n;
