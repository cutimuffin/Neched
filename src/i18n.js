import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGS = ["he", "en", "ru", "am"];
const FALLBACK_LANG = "he";
const STORAGE_KEY = "lang";

// מילונים – כוללים גם את הקבוצות home ו-ui שה-Home.js משתמש בהן
const resources = {
  he: {
    translation: {
      // מה שהיה לך
      appTitle: 'ברוכים הבאים ל״נכד״',
      appSubtitle: "שירותים יומיומיים – בלחיצה אחת",
      emergency: "חירום",
      emergency_hint: "משטרה · מד״א · כיבוי",
      police: "משטרה — 100",
      mada: "מד״א — 101",
      fire: "כיבוי אש — 102",
      doctor: "קבע תור לרופא",
      doctor_hint: "כללית · מכבי · לאומית",
      taxi: "הזמן מונית",
      taxi_hint: "Gett · Yango",
      help: "עזרה",
      help1: "לחצו על כפתורי השירותים – כל כפתור מוביל לאתר או פעולה.",
      help2: "השתמשו בהגדרות כדי להגדיל טקסט או להדליק מצב כהה.",
      help3: "אם עדיין קשה, בקשו עזרה מקרוב משפחה.",
      settings: "הגדרות נגישות",
      dark: "מצב כהה",
      large: "הגדלת טקסט",
      cancel: "ביטול",
      save: "שמור",
      footer: "שירות פשוט. בעברית. בשבילך.",
      shelterBtn: "מצא מרחב מוגן קרוב",
      shelterTile: "מרחב מוגן קרוב",
      locationDenied: "הגישה למיקום נחסמה. ניתן לאפשר דרך הגדרות הדפדפן.",
      locationError: "לא הצלחנו לקבל מיקום. נסה שוב.",
      langLabel: "שפה",

      // מה ש-Home.js צריך
      home: {
        welcome: 'ברוכים הבאים ל“נכד” 👋',
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
      ui: {
        language: "שפה",
        languageSelect: "בחירת שפה",
        fontControl: "בקרת גודל טקסט",
        decrease: "הקטנת טקסט",
        increase: "הגדלת טקסט",
        darkMode: "מצב כהה",
      },
    },
  },

  en: {
    translation: {
      appTitle: 'Welcome to "Neched"',
      appSubtitle: "Everyday services — one tap away",
      emergency: "Emergency",
      emergency_hint: "Police · Ambulance · Fire",
      police: "Police — 100",
      mada: "Ambulance — 101",
      fire: "Fire — 102",
      doctor: "Book a Doctor",
      doctor_hint: "Clalit · Maccabi · Leumit",
      taxi: "Order a Taxi",
      taxi_hint: "Gett · Yango",
      help: "Help",
      help1: "Click service buttons — each leads to an action or site.",
      help2: "Use Settings for dark mode or larger text.",
      help3: "If still hard, ask a family member for help.",
      settings: "Accessibility Settings",
      dark: "Dark Mode",
      large: "Large Text",
      cancel: "Cancel",
      save: "Save",
      footer: "Simple service. For you.",
      shelterBtn: "Find nearest shelter",
      shelterTile: "Nearest Shelter",
      locationDenied: "Location access was denied. Enable it in browser settings.",
      locationError: "Could not get your location. Try again.",
      langLabel: "Language",

      home: {
        welcome: 'Welcome to “Neched” 👋',
        subtitle: "Everyday services in one tap — with language and larger text options.",
        emergency: "Emergency",
        emergencySub: "Police · Ambulance · Fire",
        police: "Police",
        mda: "Ambulance",
        fire: "Fire",
        bookDoctor: "Book a Doctor",
        kupotSub: "Clalit · Maccabi · Leumit",
        orderTaxi: "Order a Taxi",
        taxiSub: "Gett · Yango",
        shelter: "Nearest Shelter",
        shelterSub: "Find nearest shelter (Google Maps)",
        footer: "Simple service. For you.",
      },
      ui: {
        language: "Language",
        languageSelect: "Language selection",
        fontControl: "Font size control",
        decrease: "Decrease text",
        increase: "Increase text",
        darkMode: "Dark mode",
      },
    },
  },

  ru: {
    translation: {
      appTitle: 'Добро пожаловать в «Нехед»',
      appSubtitle: "Повседневные услуги — в один клик",
      emergency: "Экстренные службы",
      emergency_hint: "Полиция · Скорая · Пожарные",
      police: "Полиция — 100",
      mada: "Скорая — 101",
      fire: "Пожарные — 102",
      doctor: "Запись к врачу",
      doctor_hint: "Клалит · Маккаби · Леумит",
      taxi: "Заказать такси",
      taxi_hint: "Gett · Yango",
      help: "Помощь",
      help1: "Нажимайте на кнопки — каждая открывает сайт или действие.",
      help2: "В настройках можно включить тёмную тему и крупный шрифт.",
      help3: "Если трудно, попросите помощи родственника.",
      settings: "Настройки доступности",
      dark: "Тёмная тема",
      large: "Крупный шрифт",
      cancel: "Отмена",
      save: "Сохранить",
      footer: "Простой сервис. Для вас.",
      shelterBtn: "Найти ближайшее убежище",
      shelterTile: "Ближайшее убежище",
      locationDenied: "Доступ к геолокации запрещён. Разрешите в настройках браузера.",
      locationError: "Не удалось получить геопозицию. Попробуйте снова.",
      langLabel: "Язык",

      home: {
        welcome: 'Добро пожаловать в «Нехед» 👋',
        subtitle: "Повседневные услуги в один клик — с выбором языка и крупным шрифтом.",
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
      ui: {
        language: "Язык",
        languageSelect: "Выбор языка",
        fontControl: "Размер шрифта",
        decrease: "Уменьшить текст",
        increase: "Увеличить текст",
        darkMode: "Тёмная тема",
      },
    },
  },

  am: {
    translation: {
      appTitle: 'እንኳን ወደ “ነኸድ” በደህና መጡ',
      appSubtitle: "ዕለታዊ አገልግሎቶች – በአንድ ጠቅ",
      emergency: "አስቸኳይ",
      emergency_hint: "ፖሊስ · አምቡላንስ · እሳት",
      police: "ፖሊስ — 100",
      mada: "አምቡላንስ — 101",
      fire: "እሳት — 102",
      doctor: "ሐኪም ይዘጋጁ",
      doctor_hint: "ክላሊት · ማካቢ · ለኡሚት",
      taxi: "ታክሲ ይዘዙ",
      taxi_hint: "Gett · Yango",
      help: "እርዳታ",
      help1: "ቁልፎቹን ይጫኑ — እያንዳንዱ ወደ ተግባር/ገጽ ይመራል።",
      help2: "ጨለማ ሁኔታ ወይም ትልቅ ጽሑፍ ቅንብሮችን ይጠቀሙ።",
      help3: "ካስፈለገ ከቤተሰብ እርዳታ ይጠይቁ።",
      settings: "ማስተካከያ ቅንብሮች",
      dark: "ጨለማ ሁኔታ",
      large: "ትልቅ ጽሑፍ",
      cancel: "ሰርዝ",
      save: "አስቀምጥ",
      footer: "ቀላል አገልግሎት። ለእርስዎ።",
      shelterBtn: "ቅርብ መጠለያ ፈልግ",
      shelterTile: "ቅርብ መጠለያ",
      locationDenied: "የአካባቢ ፍቃድ ተከልክሏል። በአሳሽ ቅንብር ይክፈቱት።",
      locationError: "አካባቢ ማግኘት አልተሳካም። እንደገና ይሞክሩ።",
      langLabel: "ቋንቋ",

      home: {
        welcome: 'እንኳን ወደ “ነኸድ” በደህና መጡ 👋',
        subtitle: "ዕለታዊ አገልግሎቶች በአንድ ጠቅ — ቋንቋና ትልቅ ጽሑፍ ምርጫ ጋር።",
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
      ui: {
        language: "ቋንቋ",
        languageSelect: "የቋንቋ ምርጫ",
        fontControl: "የፊደል መጠን",
        decrease: "ጽሑፍ አነስ",
        increase: "ጽሑፍ አብርት",
        darkMode: "ጨለማ ሁኔታ",
      },
    },
  },
};

// שפה ראשונית: שמורה → דפדפן → גיבוי
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
