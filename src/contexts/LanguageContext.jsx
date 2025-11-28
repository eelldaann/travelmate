import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("app_lang") || "en";
        }
        return "en";
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("app_lang", lang);
        }
    }, [lang]);

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
