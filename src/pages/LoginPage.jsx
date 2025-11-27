import { Link } from "react-router";
import { useLang } from "../contexts/LanguageContext.jsx";

export default function LoginPage() {
    const { t } = useLang();

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
            <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                <header className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                        {t("login.badge")}
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {t("login.title")}
                    </h1>
                    <p className="text-xs text-slate-500">
                        {t("login.description")}
                    </p>
                </header>

                <form className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-700">
                            {t("login.emailLabel")}
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-700">
                            {t("login.passwordLabel")}
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-full bg-sky-500 py-2.5 text-sm font-medium text-white hover:bg-sky-400 transition"
                    >
                        {t("login.submit")}
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
