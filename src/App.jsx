import { Routes, Route, Link, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import ToursPage from "./pages/ToursPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useLang } from "./contexts/LanguageContext.jsx";
import { useCurrency } from "./contexts/CurrencyContext";


export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <Header />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tours" element={<ToursPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
function Header() {
    const { lang, setLang, t } = useLang();
    const { currency, setCurrency } = useCurrency();

    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-tight text-slate-900"
                >
          <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/40">
            <span className="text-sm font-bold text-sky-600"></span>
          </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
                    <NavItem to="/" label={t("nav.home")} />
                    <NavItem to="/tours" label={t("nav.tours")} />
                    <NavItem to="/how-it-works" label={t("nav.howItWorks")} />
                </nav>

                <div className="flex items-center gap-3">
                    {/* Currency */}
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                    >
                        <option value="USD">$ USD</option>
                        <option value="KZT">₸ KZT</option>
                        <option value="RUB">₽ RUB</option>
                    </select>

                    {/* Language */}
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                    >
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                        <option value="kz">KZ</option>
                    </select>

                    <Link
                        to="/login"
                        className="hidden sm:inline-flex items-center rounded-full border border-slate-300 px-4 py-1.5 text-slate-700 hover:border-sky-500 hover:text-sky-700 transition"
                    >
                        {t("nav.login")}
                    </Link>
                    <Link
                        to="/register"
                        className="inline-flex items-center rounded-full bg-sky-500 px-4 py-1.5 text-white font-medium hover:bg-sky-400 transition"
                    >
                        {t("nav.register")}
                    </Link>
                </div>
            </div>
        </header>
    );
}

function NavItem({ to, label }) {
    return (
        <Link
            to={to}
            className="inline-flex items-center text-[11px] uppercase tracking-[0.16em] text-slate-600 hover:text-sky-600 transition"
        >
            {label}
        </Link>
    );
}

function Footer() {
    const { t } = useLang();

    return (
        <footer className="border-t border-slate-200 mt-10 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          © {new Date().getFullYear()} {t("footer.company")}
        </span>
                <span className="flex gap-4">
          <a href="#" className="hover:text-sky-600 transition">
            {t("footer.terms")}
          </a>
          <a href="#" className="hover:text-sky-600 transition">
            {t("footer.privacy")}
          </a>
        </span>
            </div>
        </footer>
    );
}
