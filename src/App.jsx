import React from "react";
import { Routes, Route, Link, Navigate } from "react-router";
import { useAdmin } from "./hooks/useAdmin";

import HomePage from "./pages/HomePage";
import ToursPage from "./pages/ToursPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useLang } from "./contexts/LanguageContext.jsx";
import { useCurrency } from "./contexts/CurrencyContext";
import { useAuth } from "./contexts/AuthContext.jsx";
import ConfirmPage from "./pages/ConfirmPage.jsx";
import AdminToursPage from "./pages/AdminToursPage.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <Header />
            <main className="flex-1">
                <AppRoutes />
            </main>
            <Footer />
        </div>
    );
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/admin/tours" element={<AdminToursPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirm" element={<ConfirmPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

    );
}


function Header() {
    const { t, lang, setLang } = useLang();
    const { currency, setCurrency } = useCurrency();
    const { user, loading, signOut } = useAuth();
    const { isAdmin } = useAdmin();

    async function handleLogout() {
        try {
            await signOut();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-2 space-y-2">
                {/* верхняя строка: логотип + переключатели */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* логотип */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl"
                    >
                        <span className="inline-flex size-8 items-center justify-center rounded-2xl border border-sky-500/40 bg-sky-500/10">
                            <span className="text-base font-bold text-sky-600">

                            </span>
                        </span>
                    </Link>

                    {/* валюта, язык, логин */}
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="h-8 cursor-pointer rounded-full border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700"
                        >
                            <option value="USD">$ USD</option>
                            <option value="KZT">₸ KZT</option>
                            <option value="RUB">₽ RUB</option>
                        </select>

                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="h-8 cursor-pointer rounded-full border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700"
                        >
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                            <option value="kz">KZ</option>
                        </select>

                        {!loading && (
                            <div className="flex flex-wrap items-center gap-2">
                                {user ? (
                                    <>
                                        <span className="hidden text-xs font-medium text-sky-700 sm:inline">
                                            {user.user_metadata?.firstName
                                                ? user.user_metadata.firstName
                                                : user.email}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex h-8 items-center rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                        >
                                            {t("nav.logout")}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="flex h-8 items-center rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                        >
                                            {t("nav.login")}
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="flex h-8 items-center rounded-full bg-sky-600 px-3 text-xs font-semibold text-white hover:bg-sky-500"
                                        >
                                            {t("nav.register")}
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* нижняя строка: навигация, скроллится на мобиле */}
                <nav className="flex gap-4 overflow-x-auto pb-1 text-sm text-slate-700 -mx-2 px-2">
                    <NavItem to="/" label={t("nav.home")} />
                    <NavItem to="/tours" label={t("nav.tours")} />
                    <NavItem to="/how-it-works" label={t("nav.howItWorks")} />
                    {isAdmin && (
                        <NavItem
                            to="/admin/tours"
                            label={t("nav.admin.main")}
                        />
                    )}
                </nav>
            </div>
        </header>
    );
}


function NavItem({ to, label }) {
    return (
        <Link
            to={to}
            className="text-sm text-slate-600 hover:text-sky-600 transition"
        >
            {label}
        </Link>
    );
}

function Footer() {
    const { t } = useLang();

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
                <span>
                    © {new Date().getFullYear()} {t("footer.company")}
                </span>
                <span className="flex gap-4">
                    <a href="#" className="transition hover:text-sky-600">
                        {t("footer.terms")}
                    </a>
                    <a href="#" className="transition hover:text-sky-600">
                        {t("footer.privacy")}
                    </a>
                </span>
            </div>
        </footer>
    );
}
