import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const IconSiren = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M7 10a5 5 0 1 1 10 0v4" />
    <rect x="4" y="14" width="16" height="6" rx="2" className="fill-current" />
    <path d="M12 2v3M4 7l2 2M20 7l-2 2M2 12h3M22 12h-3" />
  </svg>
);
const IconStetho = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 3v6a4 4 0 1 0 8 0V3" />
    <path d="M14 17a4 4 0 0 0 8 0v-1a2 2 0 0 0-2-2h-1" />
    <circle cx="6" cy="3" r="1" className="fill-current" />
  </svg>
);
const IconTaxi = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 12h18l-1.5-4.5A2 2 0 0 0 17.6 6H6.4a2 2 0 0 0-1.9 1.5L3 12Z" />
    <path d="M5 12v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    <circle cx="7.5" cy="17" r="1.5" className="fill-current" />
    <circle cx="16.5" cy="17" r="1.5" className="fill-current" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l7 3v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z" />
    <path d="M12 8v8" />
  </svg>
);

export default function Home() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "he");

  const [openMenu, setOpenMenu] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem("prefs") || "{}");
    if (typeof savedPrefs.darkMode === "boolean") setDarkMode(savedPrefs.darkMode);
    if (typeof savedPrefs.largeText === "boolean") setLargeText(savedPrefs.largeText);

    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
      i18n.changeLanguage(savedLang);
    }

    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString(lang === "he" ? "he-IL" : "en-GB", { hour: "2-digit", minute: "2-digit" });
      const date = now.toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      setClock(`${date} • ${time}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, [i18n, lang]);

  useEffect(() => {
    const rtl = lang === "he";
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const saveSettings = () => {
    localStorage.setItem("prefs", JSON.stringify({ darkMode, largeText }));
    setShowSettings(false);
  };

  const kupot = [
    { name: "כללית", url: "https://e-services.clalit.co.il/onlinewebquick/%D7%96%D7%9E%D7%9F_%D7%AA%D7%95%D7%A8" },
    { name: "מכבי", url: "https://www.maccabi4u.co.il/14-he/Maccabi.aspx" },
    { name: "לאומית", url: "https://home.leumit.co.il/" }
  ];

  const taxiApps = [
    { name: "Gett", url: "https://gett.com/il/" },
    { name: "Yango", url: "https://yango.com/he_il/" }
  ];

  const main = `min-h-screen flex flex-col items-center px-4 py-8 gap-6 text-right ${
    darkMode ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white" : "bg-gradient-to-br from-indigo-50 via-white to-sky-50 text-slate-800"
  } ${largeText ? "text-xl" : "text-base"}`;

  const card = `${darkMode ? "bg-white/10" : "bg-white/80"} backdrop-blur-md w-full max-w-xl rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] p-6 border ${
    darkMode ? "border-white/10" : "border-white/60"
  }`;

  const iosTileBase = `${darkMode ? "bg-white/10" : "bg-white"} flex items-center gap-4 rounded-[24px] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)] border ${
    darkMode ? "border-white/10" : "border-slate-200"
  }`;

  const iosIconWrap = (from, to) => `w-16 h-16 rounded-2xl text-white grid place-items-center bg-gradient-to-br ${from} ${to}`;
  const menuDown = `absolute top-full right-0 mt-2 rounded-xl shadow-lg border w-full z-50 ${darkMode ? "bg-slate-800/95 border-white/10" : "bg-white border-slate-200"}`;
  const menuUp   = `absolute bottom-full right-0 mb-2 rounded-xl shadow-lg border w-full z-50 ${darkMode ? "bg-slate-800/95 border-white/10" : "bg-white border-slate-200"}`;

  const openEasyShelters = () => {
    let url = "https://easy.co.il/list/Public-Safety-Shelters";
    if (lang === "en") url = "https://easy.co.il/en/list/Public-Safety-Shelters";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const findShelterViaMaps = () => {
    if (!navigator.geolocation) { alert(t("locationError")); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const query = encodeURIComponent("מרחב מוגן");
        const url = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},16z`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      (err) => {
        if (err.code === 1) alert(t("locationDenied"));
        else alert(t("locationError"));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className={main}>
      <div className={`${card} flex items-center justify-between gap-3`}>
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-indigo-300" : "text-indigo-700"}`}>{t("appTitle")}</h1>
          <p className={`${darkMode ? "text-slate-400" : "text-slate-500"} text-sm`}>{t("appSubtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`${darkMode ? "text-slate-400" : "text-slate-500"} text-sm`}>{clock}</span>
          <div className="h-6 w-px bg-slate-300/50 mx-1" />
          <label className="flex items-center gap-2 text-sm">
            <span>{t("langLabel")}:</span>
            <select
              value={lang}
              onChange={(e) => {
                const v = e.target.value;
                setLang(v);
                i18n.changeLanguage(v);
                localStorage.setItem("lang", v);
              }}
              className={`border rounded px-2 py-1 ${darkMode ? "bg-white/10 border-white/20" : "bg-white border-slate-300"}`}
            >
              <option value="he">עברית</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="am">Amharic</option>
            </select>
          </label>
        </div>
      </div>

      <div className={`${card} grid sm:grid-cols-1 gap-4 pb-3 md:pb-4`}>
        <div data-menu-root className={`relative ${openMenu === "emergency" ? "z-20" : ""}`}>
          <button onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "emergency" ? null : "emergency"); }} className={iosTileBase}>
            <div className={iosIconWrap("from-rose-400", "to-rose-600")}><IconSiren /></div>
            <div className="flex-1">
              <div className="font-semibold">{t("emergency")}</div>
              <div className={`${darkMode ? "text-slate-400" : "text-slate-500"} text-xs`}>{t("emergency_hint")}</div>
            </div>
          </button>
          {openMenu === "emergency" && (
            <div className={menuDown}>
              <a href="tel:100" className={`block px-4 py-3 ${darkMode ? "hover:bg-white/5" : "hover:bg-slate-50"}`}>🚔 {t("police")}</a>
              <a href="tel:101" className={`block px-4 py-3 ${darkMode ? "hover:bg-white/5" : "hover:bg-slate-50"}`}>🚑 {t("mada")}</a>
              <a href="tel:102" className={`block px-4 py-3 ${darkMode ? "hover:bg-white/5" : "hover:bg-slate-50"}`}>🔥 {t("fire")}</a>
            </div>
          )}
        </div>

        <div data-menu-root className={`relative ${openMenu === "kupot" ? "z-20" : ""}`}>
          <button onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "kupot" ? null : "kupot"); }} className={iosTileBase}>
            <div className={iosIconWrap("from-emerald-400", "to-emerald-600")}><IconStetho /></div>
            <div className="flex-1">
              <div className="font-semibold">{t("doctor")}</div>
              <div className={`${darkMode ? "text-slate-400" : "text-slate-500"} text-xs`}>{t("doctor_hint")}</div>
            </div>
          </button>
          {openMenu === "kupot" && (
            <div className={menuDown}>
              {kupot.map((k, i) => (
                <a key={i} href={k.url} target="_blank" rel="noreferrer" className={`block px-4 py-3 ${darkMode ? "hover:bg-white/5" : "hover:bg-slate-50"}`}>
                  🏥 {k.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <div data-menu-root className={`relative ${openMenu === "taxi" ? "z-20" : ""}`}>
          <button onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "taxi" ? null : "taxi"); }} className={iosTileBase}>
            <div className={iosIconWrap("from-amber-400", "to-amber-600")}><IconTaxi /></div>
            <div className="flex-1">
              <div className="font-semibold">{t("taxi")}</div>
              <div className={`${darkMode ? "text-slate-400" : "text-slate-500"} text-xs`}>{t("taxi_hint")}</div>
            </div>
          </button>
          {openMenu === "taxi" && (
            <div className={menuUp}>
              {taxiApps.map((a, i) => (
                <a key={i} href={a.url} target="_blank" rel="noreferrer" className={`block px-4 py-3 ${darkMode ? "hover:bg-white/5" : "hover:bg-slate-50"}`}>
                  🚕 {a.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={openEasyShelters} className={iosTileBase}>
            <div className={iosIconWrap("from-sky-400", "to-indigo-600")}><IconShield /></div>
            <div className="flex-1">
              <div className="font-semibold">{t("shelterTile")}</div>
              <div className={`${darkMode ? "text-slate-400" : "text-slate-500"} text-xs`}>{t("shelterBtn")}</div>
            </div>
          </button>
          <div className="flex justify-end mt-2">
            <button onClick={findShelterViaMaps} className={`text-xs underline ${darkMode ? "text-sky-300" : "text-sky-700"}`}>
              {t("shelterBtn")} (Google Maps)
            </button>
          </div>
        </div>
      </div>

      <div className={card}>
        <div className={`flex items-center gap-2 ${darkMode ? "text-pink-300" : "text-pink-700"} font-semibold text-lg mb-2`}>🆘 {t("help")}</div>
        <ul className={`list-disc pr-5 space-y-1 text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
          <li>{t("help1")}</li>
          <li>{t("help2")}</li>
          <li>{t("help3")}</li>
        </ul>
      </div>

      <button onClick={() => setShowSettings(true)} className={`underline ${darkMode ? "text-indigo-300" : "text-indigo-700"} text-sm`}>⚙️ {t("settings")}</button>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-50">
          <div className={`${darkMode ? "bg-slate-900 text-white border border-white/10" : "bg-white"} rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] w-full max-w-md p-6 space-y-4 text-right`}>
            <h2 className="text-xl font-bold">⚙️ {t("settings")}</h2>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span>{t("dark")}</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={largeText} onChange={() => setLargeText(!largeText)} />
              <span>{t("large")}</span>
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowSettings(false)} className={`${darkMode ? "bg-white/10" : "bg-slate-200"} px-4 py-2 rounded-md`}>{t("cancel")}</button>
              <button onClick={() => { localStorage.setItem("prefs", JSON.stringify({darkMode, largeText})); setShowSettings(false); }} className="px-4 py-2 rounded-md bg-indigo-600 text-white">{t("save")}</button>
            </div>
          </div>
        </div>
      )}

      <p className={`${darkMode ? "text-slate-500" : "text-slate-400"} text-xs`}>{t("footer")}</p>
    </div>
  );
}
