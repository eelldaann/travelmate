import { useLang } from "../contexts/LanguageContext.jsx";


export default function ConfirmPage() {
    const { t } = useLang();

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
            <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                <header className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                        {t("confirm.badge")}
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {t("confirm.title")}
                    </h1>
                    {t("confirm.description") && (
                        <p className="text-sm text-slate-500">
                            {t("confirm.description")}
                        </p>
                    )}
                </header>

            </div>
        </div>
    );
}
