import { useLang } from "../contexts/LanguageContext.jsx";

export default function AccountPage() {
    const { t } = useLang();

    const trips = [
        t("account.trips.0"),
        t("account.trips.1"),
    ];

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    {t("account.badge")}
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                    {t("account.title")}
                </h1>
                <p className="max-w-2xl text-sm md:text-base text-slate-600">
                    {t("account.description")}
                </p>
            </header>

            <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 border border-sky-200">
                        <span className="text-sm font-semibold text-sky-700">A</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            Demo User
                        </p>
                        <p className="text-xs text-slate-500">you@example.com</p>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 text-xs text-slate-600 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {t("account.preferredStyleLabel")}
                        </p>
                        <p className="mt-1 text-sm text-slate-800">
                            {t("account.preferredStyleValue")}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {t("account.homeCityLabel")}
                        </p>
                        <p className="mt-1 text-sm text-slate-800">
                            {t("account.homeCityValue")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-slate-900">
                        {t("account.tripsTitle")}
                    </h2>
                    <button
                        type="button"
                        className="rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-700 hover:border-sky-500 hover:text-sky-600 transition"
                    >
                        {t("account.tripsAdd")}
                    </button>
                </div>

                {trips.length === 0 ? (
                    <p className="text-xs text-slate-500">
                        {t("account.tripsEmpty")}
                    </p>
                ) : (
                    <ul className="space-y-2 text-xs">
                        {trips.map((trip, idx) => (
                            <li
                                key={idx}
                                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {trip.title}
                                    </p>
                                    <p className="text-[11px] text-slate-500">{trip.dates}</p>
                                </div>
                                <span className="rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-sky-700 border border-sky-200">
                  {trip.status}
                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
