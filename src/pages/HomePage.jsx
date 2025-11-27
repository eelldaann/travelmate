import { useLang } from "../contexts/LanguageContext.jsx";

export default function HomePage() {
    return (
        <div className="space-y-12">
            <HeroSection />
            <div className="mx-auto max-w-6xl px-4 pb-10">
                <DestinationsSection />
            </div>
        </div>
    );
}

function HeroSection() {
    const { t } = useLang();

    return (
        <section
            className="relative px-4 py-20 min-h-[520px] flex items-center"
            style={{
                backgroundImage: `
                    linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0.15)),
                    url('/images/kolsai.jpg')
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative w-full max-w-6xl mx-auto flex">
                <div className="max-w-2xl">
                    <div className="rounded-[28px] bg-white/90 backdrop-blur-md border border-white/60 shadow-xl px-6 py-8 md:px-8 md:py-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                            {t("home.badge")}
                        </p>

                        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
                            {t("home.title")}
                        </h1>

                        <p className="mt-3 text-sm md:text-base text-slate-600">
                            {t("home.description")}
                        </p>

                        {/* ТВОЯ исходная карточка построения маршрута — не трогаю */}
                        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        {t("home.moodLabel")}
                                    </label>
                                    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-xs">
                                        {["relax", "adventure", "culture"].map((mood) => (
                                            <button
                                                key={mood}
                                                type="button"
                                                className="flex-1 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em]
                                                text-slate-700 data-[active=true]:bg-sky-500 data-[active=true]:text-white"
                                                data-active={mood === "relax"}
                                            >
                                                {t(`home.moods.${mood}`)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        {t("home.budgetLabel")}
                                    </label>
                                    <select className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-sky-500">
                                        <option>{t("home.budgetOptions.economy")}</option>
                                        <option>{t("home.budgetOptions.comfort")}</option>
                                        <option>{t("home.budgetOptions.premium")}</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        {t("home.datesLabel")}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={t("home.datesPlaceholder")}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        {t("home.travelersLabel")}
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        defaultValue={2}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white hover:bg-sky-400 transition">
                                    {t("home.buildButton")}
                                </button>
                                <p className="text-[11px] text-slate-500">
                                    {t("home.helperText")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1" />
            </div>
        </section>
    );
}



function DestinationsSection() {
    const { t } = useLang();

    const cards = [
        t("home.cards.0"),
        t("home.cards.1"),
        t("home.cards.2"),
    ];

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                        {t("home.signatureTitle")}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        {t("home.signatureSubtitle")}
                    </p>
                </div>
                <a
                    href="/tours"
                    className="inline-flex items-center rounded-full border border-slate-300 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-700 hover:border-sky-500 hover:text-sky-600 transition"
                >
                    {t("home.signatureCta")}
                </a>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {cards.map((card, idx) => (
                    <article
                        key={idx}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={
                                    idx === 0
                                        ? "/images/charyn.jpg"
                                        : idx === 1
                                            ? "/images/kolsai.jpg"
                                            : "/images/astana.jpg"
                                }
                                alt={card.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                        </div>
                        <div className="flex flex-1 flex-col gap-2 p-4">
                            <h3 className="text-base font-semibold text-slate-900">
                                {card.title}
                            </h3>
                            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky-600">
                                {card.tag}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
