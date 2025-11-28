import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext.jsx";
import { useCurrency } from "../contexts/CurrencyContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient";

const BUCKET_NAME = "tour-images";

export default function ToursPage() {
    const { lang, t } = useLang();
    const { formatPrice } = useCurrency();
    const { user, loading: authLoading } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creatingOrder, setCreatingOrder] = useState(false);

    const mood = searchParams.get("mood");
    const budget = searchParams.get("budget");

    useEffect(() => {
        let cancelled = false;

        async function loadTours() {
            setLoading(true);

            let query = supabase
                .from("tours")
                .select("*")
                .order("created_at", { ascending: true });

            if (mood) {
                query = query.contains("mood_tags", [mood]);
            }
            if (budget) {
                query = query.eq("budget_level", budget);
            }

            const { data, error } = await query;

            if (cancelled) return;

            if (error) {
                console.error(error);
                setError("Не удалось загрузить туры");
                setTours([]);
            } else {
                setError(null);
                setTours(data || []);
            }
            setLoading(false);
        }

        loadTours();

        return () => {
            cancelled = true;
        };
    }, [mood, budget]);

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

    async function handleOrder(tourId) {
        if (authLoading) return;

        // Если не авторизован – отправляем на логин, оформить заявку нельзя
        if (!user) {
            navigate("/login", {
                state: {
                    from: `/tours?${searchParams.toString()}`,
                    tourId,
                },
            });
            return;
        }

        try {
            setCreatingOrder(true);

            const { error } = await supabase
                .from("tour_orders") // имя таблицы из пункта 1
                .insert({
                    user_id: user.id,
                    tour_id: tourId,
                    // при желании сюда можно добавить travelers, comment и т.п.
                });

            if (error) {
                console.error(error);
                alert("Не удалось отправить заявку. Попробуйте ещё раз.");
                return;
            }

            alert("Заявка отправлена. Мы скоро свяжемся с вами.");
        } finally {
            setCreatingOrder(false);
        }
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <p className="text-sm text-slate-500">Загрузка туров...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <p className="text-sm text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    {t("tours.badge")}
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                    {t("tours.title")}
                </h1>
                <p className="max-w-2xl text-sm text-slate-600">
                    {t("tours.description")}
                </p>

                {(mood || budget) && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                        {mood && (
                            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1">
                                {t(`home.moods.${mood}`)}
                            </span>
                        )}
                        {budget && (
                            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
                                {t(`home.budgetOptions.${budget}`)}
                            </span>
                        )}
                    </div>
                )}
            </header>

            <section className="grid gap-6 md:grid-cols-3">
                {tours.map((tour) => {
                    const imageUrl = getImageUrl(tour.image_path);

                    return (
                        <article
                            key={tour.id}
                            className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                        >
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={tour[titleKey] || "Tour"}
                                    className="h-40 w-full object-cover"
                                />
                            )}

                            <div className="flex-1 p-5 flex flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900">
                                            {tour[titleKey]}
                                        </h3>
                                        {tour[taglineKey] && (
                                            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
                                                {tour[taglineKey]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-medium text-slate-500">
                                            {t("tours.from")}
                                        </p>
                                        <p className="text-lg font-semibold text-slate-900">
                                            {formatPrice(tour.price_usd)}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-slate-600">
                                    {tour[descKey]}
                                </p>

                                <div className="mt-auto pt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleOrder(tour.id)}
                                        disabled={creatingOrder}
                                        className="w-full inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                                    >
                                        {t("tours.previewButton")}
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    );
}
