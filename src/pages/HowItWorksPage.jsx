import { useLang } from "../contexts/LanguageContext.jsx";

export default function HowItWorksPage() {
    const { t } = useLang();

    const steps = [
        t("howItWorks.steps.0"),
        t("howItWorks.steps.1"),
        t("howItWorks.steps.2"),
        t("howItWorks.steps.3"),
    ];

    const extras = t("howItWorks.extrasList") || [];

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    {t("howItWorks.badge")}
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                    {t("howItWorks.title")}
                </h1>
                <p className="text-sm md:text-base text-slate-600">
                    {t("howItWorks.description")}
                </p>
            </header>

            <section className="space-y-4">
                {steps.map((step, idx) => (
                    <article
                        key={idx}
                        className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-50 border border-sky-200">
              <span className="text-xs font-semibold tracking-[0.18em] text-sky-600">
                {step.num}
              </span>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-sm md:text-base font-semibold text-slate-900">
                                {step.title}
                            </h2>
                            <p className="text-xs md:text-sm text-slate-600">{step.text}</p>
                        </div>
                    </article>
                ))}
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
                <h2 className="mb-2 text-sm font-semibold text-slate-900">
                    {t("howItWorks.extrasTitle")}
                </h2>
                <ul className="list-disc space-y-1 pl-5 text-xs md:text-sm">
                    {Array.isArray(extras) &&
                        extras.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
        </div>
    );
}
