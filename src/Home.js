import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  const [showEmergency, setShowEmergency] = useState(false);
  const [showKupot, setShowKupot] = useState(false);
  const [showTaxi, setShowTaxi] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState(0);
  const [clock, setClock] = useState("");

  const localeForClock = (lng) => {
    if (lng === "he") return "he-IL";
    if (lng === "ru") return "ru-RU";
    if (lng === "am") return "am-ET";
    return "en-US";
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("prefs") || "{}");
    if (typeof saved.darkMode === "boolean") setDarkMode(saved.darkMode);

    const savedScale = Number(localStorage.getItem("fontScale"));
    if (!Number.isNaN(savedScale)) setFontScale(Math.min(2, Math.max(0, savedScale)));

    const savedLang = localStorage.getItem("lang") || "he";
    if (i18n.language !== savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const loc = localeForClock(i18n.language);
      const time = now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
      const date = now.toLocaleDateString(loc, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setClock(`${date} · ${time}`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [i18n.language]);

  const persistPrefs = (next = {}) => {
    const current = JSON.parse(localStorage.getItem("prefs") || "{}");
    localStorage.setItem("prefs", JSON.stringify({ ...current, ...next }));
  };

  const changeScale = (delta) => {
    setFontScale((prev) => {
      const next = Math.min(2, Math.max(0, prev + delta));
      localStorage.setItem("fontScale", String(next));
      return next;
    });
  };

  const onChangeLang = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const theme = darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const scaleClass = ["text-base", "text-lg", "text-xl"][fontScale];

  const kupot = [
    { name: t("kupot.clalit", { defaultValue: "כללית" }), url: "https://e-services.clalit.co.il/onlinewebquick/%D7%96%D7%9E%D7%9F_%D7%AA%D7%95%D7%A8" },
    { name: t("kupot.maccabi", { defaultValue: "מכבי" }), url: "https://www.maccabi4u.co.il/14-he/Maccabi.aspx" },
    { name: t("kupot.leumit", { defaultValue: "לאומית" }), url: "https://home.leumit.co.il/" },
  ];

  const taxiApps = [
    { name: "Gett", url: "https://gett.com/il/" },
    { name: "Yango", url: "https://yango.com/he_il/" },
  ];

  const Card = ({ children }) => (
    <div
      className={`card relative rounded-2xl border ${
        darkMode ? "bg-slate-900/70 border-white/10" : "bg-white border-slate-200"
      } p-4 flex items-center justify-between`}
    >
      {children}
    </div>
  );

  const iosIcon = (gradFrom, gradTo, emoji) => (
    <div
      className={`w-14 h-14 grid place-items-center rounded-2xl text-white bg-gradient-to-br ${gradFrom} ${gradTo}`}
      aria-hidden="true"
    >
      <span className="text-2xl">{emoji}</span>
    </div>
  );

  const menuBox = `absolute top-full right-0 mt-2 w-full rounded-xl border shadow-lg z-50 ${
    darkMode ? "bg-slate-800/95 border-white/10 text-slate-100" : "bg-white border-slate-200 text-slate-800"
  }`;

  return (
    <div className={`min-h-screen ${theme} ${scaleClass} antialiased`}>
      {/* Header */}
      <header className="mx-auto max-w-3xl px-4 pt-6 pb-4">
        <div
          className={`header-grid rounded-3xl p-4 border ${
            darkMode ? "bg-slate-900/70 border-white/10" : "bg-white border-slate-200"
          }`}
        >
          {/* בחירת שפה */}
          <div className="header-lang">
            <label className="flex items-center gap-2 text-sm">
              <span className="opacity-70">{t("ui.language", { defaultValue: "שפה" })}:</span>
              <select
                value={i18n.language}
                onChange={onChangeLang}
                className={`rounded-md px-2 py-1 border text-sm ${
                  darkMode ? "bg-slate-800 border-white/10" : "bg-white border-slate-300"
                }`}
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="am">አማርኛ</option>
              </select>
            </label>
          </div>

          {/* שעון */}
          <div className="header-clock text-sm opacity-70">{clock}</div>

          {/* בקרות */}
          <div className="header-controls">
            <div className="header-chip">
              <button onClick={() => changeScale(-1)} disabled={fontScale === 0}>A–</button>
              <div className="w-px h-4 bg-current/20" />
              <button onClick={() => changeScale(1)} disabled={fontScale === 2}>A+</button>
            </div>

            <label className="header-chip flex items-center gap-1 cursor-pointer select-none text-sm">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => {
                  setDarkMode((v) => {
                    persistPrefs({ darkMode: !v });
                    return !v;
                  });
                }}
              />
              {t("ui.darkMode", { defaultValue: "מצב כהה" })}
            </label>

            <label className="header-chip flex items-center gap-1 cursor-pointer select-none text-sm">
              <input
                type="checkbox"
                checked={fontScale === 2}
                onChange={(e) => setFontScale(e.target.checked ? 2 : 0)}
              />
              {t("ui.accessibilityMode", { defaultValue: "מצב נגיש" })}
            </label>
          </div>
        </div>
      </header>

      {/* Tiles */}
      <main className="mx-auto max-w-3xl px-4 pb-12">
        <section className="grid grid-cols-2 gap-4 sm:gap-4 max-[380px]:grid-cols-1">

          {/* חירום */}
          <div className="relative">
            <Card>
              <div>
                <div className="font-bold">{t("home.emergency", { defaultValue: "חירום" })}</div>
                <div className="text-sm opacity-70">{t("home.emergencySub", { defaultValue: "משטרה · מד״א · כיבוי" })}</div>
              </div>
              <button
                onClick={() => {
                  setShowEmergency((v) => !v);
                  setShowKupot(false);
                  setShowTaxi(false);
                }}
              >
                {iosIcon("from-rose-400", "to-rose-600", "🆘")}
              </button>
            </Card>
            {showEmergency && (
              <div className={menuBox} role="menu">
                <a className="block px-4 py-2 hover:bg-black/5" href="tel:100">🚔 {t("home.police")} — 100</a>
                <a className="block px-4 py-2 hover:bg-black/5" href="tel:101">🚑 {t("home.mda")} — 101</a>
                <a className="block px-4 py-2 hover:bg-black/5" href="tel:102">🔥 {t("home.fire")} — 102</a>
              </div>
            )}
          </div>

          {/* קופות */}
          <div className="relative">
            <Card>
              <div>
                <div className="font-bold">{t("home.bookDoctor", { defaultValue: "קבע תור לרופא" })}</div>
                <div className="text-sm opacity-70">{t("home.kupotSub", { defaultValue: "כללית · מכבי · לאומית" })}</div>
              </div>
              <button
                onClick={() => {
                  setShowKupot((v) => !v);
                  setShowEmergency(false);
                  setShowTaxi(false);
                }}
              >
                {iosIcon("from-emerald-400", "to-emerald-600", "🩺")}
              </button>
            </Card>
            {showKupot && (
              <div className={menuBox} role="menu">
                {kupot.map((k, i) => (
                  <a key={i} className="block px-4 py-2 hover:bg-black/5" href={k.url} target="_blank" rel="noreferrer noopener">
                    🏥 {k.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* מונית */}
          <div className="relative">
            <Card>
              <div>
                <div className="font-bold">{t("home.orderTaxi", { defaultValue: "הזמן מונית" })}</div>
                <div className="text-sm opacity-70">{t("home.taxiSub", { defaultValue: "Gett · Yango" })}</div>
              </div>
              <button
                onClick={() => {
                  setShowTaxi((v) => !v);
                  setShowEmergency(false);
                  setShowKupot(false);
                }}
              >
                {iosIcon("from-amber-400", "to-orange-600", "🚕")}
              </button>
            </Card>
            {showTaxi && (
              <div className={menuBox} role="menu">
                {taxiApps.map((tapp, i) => (
                  <a key={i} className="block px-4 py-2 hover:bg-black/5" href={tapp.url} target="_blank" rel="noreferrer noopener">
                    🚖 {tapp.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* מרחב מוגן */}
          <a
            className="block"
            href="https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%A8%D7%97%D7%91+%D7%9E%D7%95%D7%92%D7%9F+%D7%A7%D7%A8%D7%95%D7%91"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Card>
              <div>
                <div className="font-bold">{t("home.shelter", { defaultValue: "מרחב מוגן קרוב" })}</div>
                <div className="text-sm opacity-70">
                  {t("home.shelterSub", { defaultValue: "מצא מרחב מוגן קרוב (Google Maps)" })}
                </div>
              </div>
              {iosIcon("from-sky-400", "to-blue-600", "🛡️")}
            </Card>
          </a>
        </section>
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-10 opacity-60 text-xs">
        {t("home.footer", { defaultValue: "שירות פשוט. בעברית. בשבילך." })}
      </footer>
    </div>
  );
}
