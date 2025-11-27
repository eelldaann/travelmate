import { createContext, useContext, useState } from "react";
import { translations } from "../i18n.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("en");

    const t = (path) => {
        const keys = path.split(".");
        let value = translations[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value ?? "";
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLang = () => useContext(LanguageContext);
