import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext.jsx";
import { supabase } from "../lib/supabaseClient";

const BUCKET_NAME = "tour-images";

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
    const navigate = useNavigate();

    const [mood, setMood] = useState("relax");
    const [budget, setBudget] = useState("economy");

    const moods = ["relax", "adventure", "culture"];

    const handleBuild = () => {
        const params = new URLSearchParams();

        if (mood) params.set("mood", mood);
        if (budget) params.set("budget", budget);

        navigate(`/tours?${params.toString()}`);
    };

    return (
        <section
            className="relative px-4 py-20 min-h-[520px] flex items-center"
            style={{
                backgroundImage: `
                    linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0.15)),
                    url('/images/hero_bg.jpg')
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

                        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Mood */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        {t("home.moodLabel")}
                                    </label>
                                    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-xs">
                                        {moods.map((m) => (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => setMood(m)}
                                                className="cursor-pointer flex-1 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em]
                                                text-slate-700 data-[active=true]:bg-sky-500 data-[active=true]:text-white transition"
                                                data-active={mood === m}
                                            >
                                                {t(`home.moods.${m}`)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        {t("home.budgetLabel")}
                                    </label>
                                    <select
                                        className="cursor-pointer w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    >
                                        <option value="economy">
                                            {t("home.budgetOptions.economy")}
                                        </option>
                                        <option value="comfort">
                                            {t("home.budgetOptions.comfort")}
                                        </option>
                                        <option value="premium">
                                            {t("home.budgetOptions.premium")}
                                        </option>
                                    </select>
                                </div>


                            </div>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="button"
                                    onClick={handleBuild}
                                    className="cursor-pointer inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white hover:bg-sky-400 transition"
                                >
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
    const { t, lang } = useLang();

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const titleKey = `title_${lang}`;
    const taglineKey = `tagline_${lang}`;
    const descKey = `short_desc_${lang}`;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(imagePath);
        return data.publicUrl;
    };

    useEffect(() => {
        let cancelled = false;

        async function loadSignatureTours() {
            setLoading(true);
            const { data, error } = await supabase
                .from("tours")
                .select("*")
                .order("created_at", { ascending: true })
                .limit(3);

            if (cancelled) return;

            if (error) {
                console.error(error);
                setError("Не удалось загрузить подборку туров");
                setTours([]);
            } else {
                setError(null);
                setTours(data || []);
            }
            setLoading(false);
        }

        loadSignatureTours();

        return () => {
            cancelled = true;
        };
    }, []);

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

            {loading && (
                <p className="text-sm text-slate-500">Загрузка подборки...</p>
            )}

            {error && !loading && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {!loading && !error && (
                <div className="grid gap-5 md:grid-cols-3">
                    {tours.map((tour) => {
                        const imageUrl = getImageUrl(tour.image_path);

                        return (
                            <article
                                key={tour.id}
                                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt={tour[titleKey]}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                        />
                                    )}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                                </div>
                                <div className="flex flex-1 flex-col gap-2 p-4">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {tour[titleKey]}
                                    </h3>
                                    {tour[taglineKey] && (
                                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky-600">
                                            {tour[taglineKey]}
                                        </p>
                                    )}
                                    <p className="mt-1 text-sm text-slate-600">
                                        {tour[descKey]}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
