      {/* כותרת עליונה */}
      <header className="mx-auto max-w-3xl px-4 pt-6 pb-4">
        <div
          className={`rounded-3xl p-4 border ${
            darkMode ? "bg-slate-900/70 border-white/10" : "bg-white border-slate-200"
          }`}
        >
          {/* שורה 1: שמאל = שעון, ימין = בחירת שפה */}
          <div className="flex items-center justify-between gap-3">
            {/* שעון בצד שמאל */}
            <div className="text-sm opacity-70">{clock}</div>

            {/* בחירת שפה בצד ימין */}
            <label className="flex items-center gap-2 text-sm">
              <span className="opacity-70">{t("ui.language", { defaultValue: "שפה" })}:</span>
              <select
                value={i18n.language}
                onChange={onChangeLang}
                className={`rounded-md px-2 py-1 border text-sm ${
                  darkMode ? "bg-slate-800 border-white/10" : "bg-white border-slate-300"
                }`}
                aria-label={t("ui.languageSelect", { defaultValue: "בחירת שפה" })}
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="am">አማርኛ</option>
              </select>
            </label>
          </div>

          {/* שורה 2: בצד ימין למטה – A-/A+, מצב כהה, מצב נגיש */}
          <div className="mt-3 flex items-center justify-end gap-3 flex-wrap">
            {/* A-/A+ */}
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 border ${
                darkMode ? "border-white/15 bg-white/5" : "border-slate-300 bg-slate-50"
              }`}
              aria-label={t("ui.fontControl", { defaultValue: "בקרת גודל טקסט" })}
            >
              <button
                onClick={() => changeScale(-1)}
                className="px-2 py-0.5 rounded-md"
                disabled={fontScale === 0}
                title="A–"
              >
                A–
              </button>
              <div className="w-px h-4 bg-current/20" />
              <button
                onClick={() => changeScale(1)}
                className="px-2 py-0.5 rounded-md"
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
              {t("ui.darkMode", { defaultValue: "מצב כהה" })}
            </label>

            {/* מצב נגיש (מגדיל מאוד טקסט/אייקונים) */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
              <input
                type="checkbox"
                checked={fontScale === 2}
                onChange={(e) => setFontScale(e.target.checked ? 2 : 0)}
              />
              {t("ui.accessibilityMode", { defaultValue: "מצב נגיש" })}
            </label>
          </div>

          {/* כותרת וסאב־טקסט */}
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-indigo-700 dark:text-indigo-300">
            {t("home.welcome", { defaultValue: "ברוכים הבאים ל“נכד” 👋" })}
          </h1>
          <p className="mt-1 opacity-70 text-sm">
            {t("home.subtitle", { defaultValue: "שירותים יומיומיים בלחיצה – בעברית ובגדלים שמתאימים לך." })}
          </p>
        </div>
      </header>
