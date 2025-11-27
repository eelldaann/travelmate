import { useLang } from "../contexts/LanguageContext.jsx";
import { useCurrency } from "../contexts/CurrencyContext.jsx";
export default function ToursPage() {
    const { t } = useLang();
    const { formatPrice } = useCurrency();

    const cards = [
        t("tours.cards.0"),
        t("tours.cards.1"),
        t("tours.cards.2"),
    ];

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    {t("tours.badge")}
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                    {t("tours.title")}
                </h1>
                <p className="max-w-2xl text-sm md:text-base text-slate-600">
                    {t("tours.description")}
                </p>
            </header>

            <section className="grid gap-5 md:grid-cols-2">
                {cards.map((tour, idx) => (
                    <article
                        key={idx}
                        className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-md"
                    >
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {tour.title}
                            </h2>
                            <p className="text-sm text-slate-600">{tour.desc}</p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="rounded-full bg-slate-50 px-3 py-1 border border-slate-200">
                {tour.days}
              </span>
                            <span className="rounded-full bg-slate-50 px-3 py-1 border border-slate-200">
                {t("tours.levelLabel")}: {tour.level}
              </span>
                            <span className="ml-auto text-sm font-semibold text-sky-600">
                {formatPrice(Number(tour.price))}
              </span>
                        </div>

                        <button
                            type="button"
                            className="mt-5 inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-sky-400 transition"
                        >
                            {t("tours.previewButton")}
                        </button>
                    </article>
                ))}
            </section>
        </div>
    );
}
