import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <CurrencyProvider>
                    <App />
                </CurrencyProvider>
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>
);
