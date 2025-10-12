import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGS = ["he", "en", "ru", "am"];
const FALLBACK_LANG = "he";
const STORAGE_KEY = "lang";

// ---------- מילונים (כמו שהיה אצלך) ----------
const resources = {
  he: { translation: {
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
  }},
  en: { translation: {
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
  }},
  ru: { translation: {
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
  }},
  am: { translation: {
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
    help2: "ለጨለማ ሁኔታ ወይም ትልቅ ጽሑፍ ቅንብሮችን ይጠቀሙ።",
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
  }},
};
// ------------------------------------------------

// קובע שפה ראשונית: שמורה → דפדפן → גיבוי
const initialLang = (() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(nav) ? nav : FALLBACK_LANG;
})();

// מחיל כיוון ושפה על אלמנט ה-HTML
function applyHtmlLangDir(lang) {
  const isRTL = lang === "he"; // עברית RTL; אנגלית/רוסית/אמהרית LTR
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: FALLBACK_LANG,
    interpolation: { escapeValue: false },
  });

// הגדר ברירת מחדל על המסמך
applyHtmlLangDir(initialLang);

// בכל החלפת שפה – שמירה והחלפת כיוון
i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  applyHtmlLangDir(lng);
});

export default i18n;
