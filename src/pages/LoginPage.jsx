import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useLang } from "../contexts/LanguageContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
    const { t } = useLang();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const from = location.state?.from?.pathname || "/account";

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signIn(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "Failed to log in");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto flex min-height-[70vh] min-h-[70vh] max-w-md items-center px-4 py-10">
            <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                <header className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                        {t("login.badge")}
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {t("login.title")}
                    </h1>
                    {t("login.description") && (
                        <p className="text-sm text-slate-500">
                            {t("login.description")}
                        </p>
                    )}
                </header>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">
                            {t("login.emailLabel")}
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
                            {t("login.passwordLabel")}
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "..." : t("login.submit")}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-500">
                    {t("login.noAccount")}{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-sky-600 hover:text-sky-500"
                    >
                        {t("login.toRegister")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
