import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "https://flagcdn.com/w2560/gb.png" },
    { code: "ar", label: "العربية", flag: "https://flagcdn.com/w2560/eg.png" },
    { code: "fr", label: "French", flag: "https://flagcdn.com/w2560/fr.png" },
    { code: "po", label: "Portuguese", flag: "https://flagcdn.com/w2560/pt.png" },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === i18n.language);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition"
        title="Select Language"
      >
        {currentLang && (
          <img
            src={currentLang.flag}
            alt={currentLang.label}
            className="w-5 h-5 rounded-full"
          />
        )}
        <span className="text-sm font-medium capitalize">{i18n.language}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {languages.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition hover:bg-gray-100 ${i18n.language === code ? "font-semibold text-blue-600" : "text-gray-700"
                }`}
            >
              <img src={flag} alt={label} className="w-5 h-5 rounded-full" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
