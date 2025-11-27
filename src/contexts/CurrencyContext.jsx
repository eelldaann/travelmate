import { createContext, useContext, useState } from "react";


const RATES = {
    USD: 1,
    KZT: 516,
    RUB: 80,
};

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState("USD");

    const formatPrice = (usdAmount) => {
        const rate = RATES[currency] ?? 1;
        const converted = usdAmount * rate;

        if (currency === "USD") {
            const formatted = usdAmount.toLocaleString("en-US", {
                maximumFractionDigits: 0,
            });
            return `$${formatted}`;
        }

        if (currency === "KZT") {
            const formatted = Math.round(converted).toLocaleString("ru-RU");
            return `₸${formatted}`;
        }

        if (currency === "RUB") {
            const formatted = Math.round(converted).toLocaleString("ru-RU");
            return `₽${formatted}`;
        }

        return `$${usdAmount}`;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                formatPrice,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export const useCurrency = () => useContext(CurrencyContext);
