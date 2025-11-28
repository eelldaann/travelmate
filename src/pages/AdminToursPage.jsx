import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext.jsx";

const BUCKET_NAME = "tour-images";

const emptyTour = {
    id: null,
    image_path: "",
    price_usd: "",
    days: "",
    title_en: "",
    title_ru: "",
    title_kz: "",
    tagline_en: "",
    tagline_ru: "",
    tagline_kz: "",
    short_desc_en: "",
    short_desc_ru: "",
    short_desc_kz: "",
    mood_tags: "",
    budget_level: "economy",
};

export default function AdminToursPage() {
    const { t, lang } = useLang();

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const [form, setForm] = useState(emptyTour);
    const [imageFile, setImageFile] = useState(null);

    const isEdit = Boolean(form.id);

    useEffect(() => {
        let cancelled = false;

        async function checkAdmin() {
            setCheckingAuth(true);

            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (cancelled) return;

            if (error || !user) {
                setIsAdmin(false);
                setCheckingAuth(false);
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("is_admin")
                .eq("id", user.id)
                .single();

            if (cancelled) return;

            if (profileError || !profile?.is_admin) {
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
            setCheckingAuth(false);
        }

        checkAdmin();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!isAdmin) return;
        loadTours();
    }, [isAdmin]);

    async function loadTours() {
        setLoading(true);
        const { data, error } = await supabase
            .from("tours")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) {
            console.error(error);
            setError(t("admin.tours.loadError"));
            setTours([]);
        } else {
            setError(null);
            setTours(data || []);
        }
        setLoading(false);
    }

    function resetForm() {
        setForm(emptyTour);
        setImageFile(null);
    }

    function handleSelectTour(tour) {
        setForm({
            ...tour,
            price_usd: tour.price_usd ?? "",
            days: tour.days ?? "",
            mood_tags: Array.isArray(tour.mood_tags)
                ? tour.mood_tags.join(", ")
                : "",
        });
        setImageFile(null);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let image_path = form.image_path;

            if (imageFile) {
                const fileName = `${Date.now()}_${imageFile.name}`;
                const { error: uploadError } = await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(fileName, imageFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (uploadError) {
                    console.error(uploadError);
                    throw new Error(t("admin.tours.error.uploadImage"));
                }

                image_path = fileName;
            }

            const moodArray =
                form.mood_tags
                    ?.split(",")
                    .map((s) => s.trim())
                    .filter(Boolean) ?? [];

            const payload = {
                image_path,
                price_usd: Number(form.price_usd) || 0,
                days: Number(form.days) || 0,
                title_en: form.title_en,
                title_ru: form.title_ru,
                title_kz: form.title_kz,
                tagline_en: form.tagline_en,
                tagline_ru: form.tagline_ru,
                tagline_kz: form.tagline_kz,
                short_desc_en: form.short_desc_en,
                short_desc_ru: form.short_desc_ru,
                short_desc_kz: form.short_desc_kz,
                mood_tags: moodArray,
                budget_level: form.budget_level,
            };

            let errorDb = null;

            if (isEdit) {
                const { error } = await supabase
                    .from("tours")
                    .update(payload)
                    .eq("id", form.id);
                errorDb = error;
            } else {
                const { error } = await supabase.from("tours").insert(payload);
                errorDb = error;
            }

            if (errorDb) {
                console.error(errorDb);
                throw new Error(t("admin.tours.error.saveTour"));
            }

            await loadTours();
            resetForm();
        } catch (err) {
            setError(err.message || t("admin.tours.error.generic"));
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm(t("admin.tours.deleteConfirm"))) return;
        setSaving(true);
        setError(null);

        const { error } = await supabase.from("tours").delete().eq("id", id);

        if (error) {
            console.error(error);
            setError(t("admin.tours.error.deleteTour"));
        } else {
            await loadTours();
            if (form.id === id) resetForm();
        }
        setSaving(false);
    }

    if (checkingAuth) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-8">
                <p className="text-sm text-slate-500">
                    {t("admin.common.checkingAccess")}
                </p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-12 space-y-4">
                <h1 className="text-xl font-semibold text-slate-900">
                    {t("admin.common.accessDeniedTitle")}
                </h1>
                <p className="text-sm text-slate-600">
                    {t("admin.common.accessDeniedText")}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
            <div className="flex items-center gap-3 text-sm mb-2">
                <Link
                    to="/admin/tours"
                    className="inline-flex items-center rounded-full border border-sky-300 bg-sky-50 px-3 py-1.5 text-sky-700 font-medium"
                >
                    {t("nav.admin.tours")}
                </Link>
                <Link
                    to="/admin/orders"
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                >
                    {t("nav.admin.orders")}
                </Link>
            </div>

            <h1 className="text-2xl font-semibold text-slate-900">
                {t("admin.tours.pageTitle")}
            </h1>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-[1.1fr,1.3fr]">
                {/* Листинг туров */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-slate-900">
                            {t("admin.tours.listTitle")}
                        </h2>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="text-xs rounded-full border border-slate-300 px-3 py-1 font-medium text-slate-700 hover:border-sky-500 hover:text-sky-600"
                        >
                            {t("admin.tours.newTourButton")}
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-sm text-slate-500">
                            {t("admin.tours.loading")}
                        </p>
                    ) : tours.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            {t("admin.tours.empty")}
                        </p>
                    ) : (
                        <ul className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                            {tours.map((tour) => {
                                const titleKey = `title_${lang}`; // title_ru / title_en / title_kz
                                const tourTitle =
                                    tour[titleKey] ||
                                    tour.title_ru ||
                                    tour.title_en ||
                                    tour.title_kz ||
                                    `#${tour.id}`;

                                return (
                                    <li
                                        key={tour.id}
                                        className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm cursor-pointer ${
                                            form.id === tour.id
                                                ? "border-sky-400 bg-sky-50"
                                                : "border-slate-200 hover:border-sky-300"
                                        }`}
                                        onClick={() => handleSelectTour(tour)}
                                    >
                                        <div className="flex flex-col">
                <span className="font-medium text-slate-900">
                    {tourTitle}
                </span>
                                            <span className="text-xs text-slate-500">
                    {tour.days} {t("admin.tours.daysShort")} · ${" "}
                                                {tour.price_usd}
                </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(tour.id);
                                            }}
                                            className="text-xs rounded-full border border-red-200 px-2 py-1 text-red-600 hover:bg-red-50"
                                        >
                                            {t("admin.tours.deleteButton")}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Форма */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-slate-900">
                            {isEdit
                                ? t("admin.tours.form.editTitle")
                                : t("admin.tours.form.newTitle")}
                        </h2>
                        {isEdit && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-xs text-slate-500 hover:text-slate-700"
                            >
                                {t("admin.tours.form.clearForm")}
                            </button>
                        )}
                    </div>

                    <form
                        onSubmit={handleSave}
                        className="space-y-4 max-h-[620px] overflow-y-auto pr-1"
                    >
                        {/* Картинка */}
                        <div className="space-y-1">
                            <label className="block text-xs font-medium text-slate-600">
                                {t("admin.tours.form.imageLabel")}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImageFile(e.target.files?.[0] ?? null)
                                }
                                className="block w-full text-xs text-slate-700"
                            />
                            {form.image_path && (
                                <p className="text-[11px] text-slate-500">
                                    {t("admin.tours.form.currentImage")}{" "}
                                    <span className="font-mono">
                                        {form.image_path}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Базовые параметры */}
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-slate-600">
                                    {t("admin.tours.form.priceLabel")}
                                </label>
                                <input
                                    type="number"
                                    name="price_usd"
                                    value={form.price_usd}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-slate-600">
                                    {t("admin.tours.form.daysLabel")}
                                </label>
                                <input
                                    type="number"
                                    name="days"
                                    value={form.days}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                                />
                            </div>
                        </div>

                        {/* Заголовки */}
                        <LangGroup
                            label={t("admin.tours.form.nameLabel")}
                            fields={[
                                {
                                    name: "title_ru",
                                    value: form.title_ru,
                                    placeholder:
                                        t(
                                            "admin.tours.form.examples.titleRu",
                                        ),
                                },
                                {
                                    name: "title_en",
                                    value: form.title_en,
                                    placeholder:
                                        t(
                                            "admin.tours.form.examples.titleEn",
                                        ),
                                },
                                {
                                    name: "title_kz",
                                    value: form.title_kz,
                                    placeholder:
                                        t(
                                            "admin.tours.form.examples.titleKz",
                                        ),
                                },
                            ]}
                            onChange={handleChange}
                        />

                        {/* Теглайн */}
                        <LangGroup
                            label={t("admin.tours.form.taglineLabel")}
                            fields={[
                                {
                                    name: "tagline_ru",
                                    value: form.tagline_ru,
                                    placeholder:
                                        t(
                                            "admin.tours.form.examples.taglineRu",
                                        ),
                                },
                                {
                                    name: "tagline_en",
                                    value: form.tagline_en,
                                    placeholder:
                                        t(
                                            "admin.tours.form.examples.taglineEn",
                                        ),
                                },
                                {
                                    name: "tagline_kz",
                                    value: form.tagline_kz,
                                    placeholder:
                                        t(
                                            "admin.tours.form.examples.taglineKz",
                                        ),
                                },
                            ]}
                            onChange={handleChange}
                        />

                        {/* Описание */}
                        <LangGroup
                            label={t("admin.tours.form.shortDescLabel")}
                            textarea
                            fields={[
                                {
                                    name: "short_desc_ru",
                                    value: form.short_desc_ru,
                                },
                                {
                                    name: "short_desc_en",
                                    value: form.short_desc_en,
                                },
                                {
                                    name: "short_desc_kz",
                                    value: form.short_desc_kz,
                                },
                            ]}
                            onChange={handleChange}
                        />

                        {/* Теги настроения и бюджета */}
                        <div className="grid grid-cols-[2fr,1fr] gap-3">
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-slate-600">
                                    {t("admin.tours.form.moodLabel")}
                                </label>
                                <input
                                    type="text"
                                    name="mood_tags"
                                    value={form.mood_tags}
                                    onChange={handleChange}
                                    placeholder="relax, adventure"
                                    className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                                />
                                <p className="text-[11px] text-slate-500">
                                    {t("admin.tours.form.moodHint")}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-slate-600">
                                    {t("admin.tours.form.budgetLabel")}
                                </label>
                                <select
                                    name="budget_level"
                                    value={form.budget_level}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                                >
                                    <option value="economy">economy</option>
                                    <option value="comfort">comfort</option>
                                    <option value="premium">premium</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white hover:bg-sky-400 disabled:opacity-70"
                            >
                                {saving
                                    ? t("admin.tours.form.submit.saving")
                                    : isEdit
                                        ? t("admin.tours.form.submit.edit")
                                        : t("admin.tours.form.submit.create")}
                            </button>
                            {isEdit && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="text-xs text-slate-500 hover:text-slate-700"
                                >
                                    {t("admin.tours.form.cancelEdit")}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function LangGroup({ label, fields, textarea = false, onChange }) {
    return (
        <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-600">{label}</p>
            <div className="grid gap-3 sm:grid-cols-3">
                {fields.map((f) => (
                    <div key={f.name} className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-500">
                            {f.name.endsWith("_ru")
                                ? "RU"
                                : f.name.endsWith("_en")
                                    ? "EN"
                                    : "KZ"}
                        </label>
                        {textarea ? (
                            <textarea
                                name={f.name}
                                value={f.value}
                                onChange={onChange}
                                rows={3}
                                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                            />
                        ) : (
                            <input
                                type="text"
                                name={f.name}
                                value={f.value}
                                onChange={onChange}
                                placeholder={f.placeholder}
                                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
