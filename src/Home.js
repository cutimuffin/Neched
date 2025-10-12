import React, { useEffect, useState } from "react";

export default function Home() {
  // תפריטים
  const [showEmergency, setShowEmergency] = useState(false);
  const [showKupot, setShowKupot] = useState(false);
  const [showTaxi, setShowTaxi] = useState(false);

  // מצב כהה + סקייל טקסט
  const [darkMode, setDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState(0); // 0=רגיל, 1=גדול, 2=ענק

  // שעה/תאריך
  const [clock, setClock] = useState("");

  // טעינת העדפות
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("prefs") || "{}");
    if (typeof saved.darkMode === "boolean") setDarkMode(saved.darkMode);

    const savedScale = Number(localStorage.getItem("fontScale"));
    if (!Number.isNaN(savedScale)) setFontScale(Math.min(2, Math.max(0, savedScale)));

    const tick = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
      const date = now.toLocaleDateString("he-IL", {
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
  }, []);

  // שמירת העדפות
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

  // מחלקות נושא/טקסט
  const theme = darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const scaleClass = ["text-base", "text-lg", "text-xl"][fontScale];

  // קופות + מוניות
  const kupot = [
    { name: "כללית", url: "https://e-services.clalit.co.il/onlinewebquick/%D7%96%D7%9E%D7%9F_%D7%AA%D7%95%D7%A8" },
    { name: "מכבי", url: "https://www.maccabi4u.co.il/14-he/Maccabi.aspx" },
    { name: "לאומית", url: "https://home.leumit.co.il/" },
  ];
  const taxiApps = [
    { name: "Gett", url: "https://gett.com/il/" },
    { name: "Yango", url: "https://yango.com/he_il/" },
  ];

  // קומפוננטת אריח
  const Card = ({ children }) => (
    <div
      className={`relative select-none rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border ${
        darkMode ? "bg-slate-900/70 border-white/10" : "bg-white border-slate-200"
      } p-4 flex items-center justify-between`}
    >
      {children}
    </div>
  );

  const iosIcon = (gradFrom, gradTo, emoji) => (
    <div
      className={`grid place-items-center w-14 h-14 rounded-2xl text-white bg-gradient-to-br ${gradFrom} ${gradTo}`}
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
      {/* כותרת עליונה */}
      <header
        className={`mx-auto max-w-3xl px-4 pt-6 pb-4`}
      >
        <div
          className={`rounded-3xl p-4 border ${
            darkMode ? "bg-slate-900/70 border-white/10" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm opacity-70">{clock}</div>

            <div className="flex items-center gap-2">
              {/* A-/A+ */}
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 border ${
                  darkMode ? "border-white/15 bg-white/5" : "border-slate-300 bg-slate-50"
                }`}
                aria-label="בקרת גודל טקסט"
              >
                <button
                  onClick={() => changeScale(-1)}
                  className="px-2 py-0.5 rounded-md"
                  aria-label="הקטנת טקסט"
                  disabled={fontScale === 0}
                  title="A–"
                >
                  A–
                </button>
                <div className="w-px h-4 bg-current/20" />
                <button
                  onClick={() => changeScale(1)}
                  className="px-2 py-0.5 rounded-md"
                  aria-label="הגדלת טקסט"
                  disabled={fontScale === 2}
                  title="A+"
                >
                  A+
                </button>
              </div>

              {/* מצב כהה */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
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
                מצב כהה
              </label>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-indigo-700 dark:text-indigo-300">
            ברוכים הבאים ל“נכד” 👋
          </h1>
          <p className="mt-1 opacity-70 text-sm">שירותים יומיומיים בלחיצה – בעברית ובגדלים שמתאימים לך.</p>
        </div>
      </header>

      {/* אריחים – 2×2 במסכים רחבים, 1×4 במובייל */}
      <main className="mx-auto max-w-3xl px-4 pb-12">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* חירום */}
          <div className="relative">
            <Card>
              <div>
                <div className="font-bold">חירום</div>
                <div className="text-sm opacity-70">משטרה · מד״א · כיבוי</div>
              </div>
              <button
                onClick={() => {
                  setShowEmergency((v) => !v);
                  setShowKupot(false);
                  setShowTaxi(false);
                }}
                className="focus:outline-none"
                aria-expanded={showEmergency}
                aria-haspopup="menu"
              >
                {iosIcon("from-rose-400", "to-rose-600", "🆘")}
              </button>
            </Card>

            {showEmergency && (
              <div className={menuBox} role="menu">
                <a className="block px-4 py-2 hover:bg-black/5" href="tel:100">🚔 משטרה — 100</a>
                <a className="block px-4 py-2 hover:bg-black/5" href="tel:101">🚑 מד״א — 101</a>
                <a className="block px-4 py-2 hover:bg-black/5" href="tel:102">🔥 כיבוי אש — 102</a>
              </div>
            )}
          </div>

          {/* קבע תור לרופא */}
          <div className="relative">
            <Card>
              <div>
                <div className="font-bold">קבע תור לרופא</div>
                <div className="text-sm opacity-70">כללית · מכבי · לאומית</div>
              </div>
              <button
                onClick={() => {
                  setShowKupot((v) => !v);
                  setShowEmergency(false);
                  setShowTaxi(false);
                }}
                className="focus:outline-none"
                aria-expanded={showKupot}
                aria-haspopup="menu"
              >
                {iosIcon("from-emerald-400", "to-emerald-600", "🩺")}
              </button>
            </Card>

            {showKupot && (
              <div className={menuBox} role="menu">
                {kupot.map((k, i) => (
                  <a
                    key={i}
                    className="block px-4 py-2 hover:bg-black/5"
                    href={k.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    🏥 {k.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* הזמן מונית */}
          <div className="relative">
            <Card>
              <div>
                <div className="font-bold">הזמן מונית</div>
                <div className="text-sm opacity-70">Gett · Yango</div>
              </div>
              <button
                onClick={() => {
                  setShowTaxi((v) => !v);
                  setShowEmergency(false);
                  setShowKupot(false);
                }}
                className="focus:outline-none"
                aria-expanded={showTaxi}
                aria-haspopup="menu"
              >
                {iosIcon("from-amber-400", "to-orange-600", "🚕")}
              </button>
            </Card>

            {showTaxi && (
              <div className={menuBox} role="menu">
                {taxiApps.map((t, i) => (
                  <a
                    key={i}
                    className="block px-4 py-2 hover:bg-black/5"
                    href={t.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    🚖 {t.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* מרחב מוגן קרוב */}
          <a
            className="block"
            href="https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%A8%D7%97%D7%91+%D7%9E%D7%95%D7%92%D7%9F+%D7%A7%D7%A8%D7%95%D7%91"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Card>
              <div>
                <div className="font-bold">מרחב מוגן קרוב</div>
                <div className="text-sm opacity-70">מצא מרחב מוגן קרוב (Google Maps)</div>
              </div>
              {iosIcon("from-sky-400", "to-blue-600", "🛡️")}
            </Card>
          </a>
        </section>
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-10 opacity-60 text-xs">
        שירות פשוט. בעברית. בשבילך.
      </footer>
    </div>
  );
}
