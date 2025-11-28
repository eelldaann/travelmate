import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLang } from "../contexts/LanguageContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RegisterPage() {
    const { t } = useLang();
    const { signUp } = useAuth();


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);
        try {
            await signUp({ email, password, firstName, lastName });
            setInfo("Check your email to confirm registration.");
            setError(err.message || "Failed to sign up");
        } catch (err) {
            setError(err.message || "Failed to sign up");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
            <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                <header className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                        {t("register.badge")}
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {t("register.title")}
                    </h1>
                    {t("register.description") && (
                        <p className="text-sm text-slate-500">
                            {t("register.description")}
                        </p>
                    )}
                </header>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">
                            {t("register.firstName")}
                        </label>
                        <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">
                            {t("register.lastName")}
                        </label>
                        <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">
                            {t("register.emailLabel")}
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">
                            {t("register.passwordLabel")}
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-rose-600">
                            {error}
                        </p>
                    )}
                    {info && (
                        <p className="text-xs text-emerald-600">
                            {info}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "..." : t("register.submit")}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-500">
                    {t("register.hasAccount")}{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-sky-600 hover:text-sky-500"
                    >
                        {t("register.toLogin")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
