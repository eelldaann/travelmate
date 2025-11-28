import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLang } from "../contexts/LanguageContext.jsx";

export default function AdminOrdersPage() {
    const { lang, t } = useLang();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const locale =
        lang === "en" ? "en-US" : lang === "kz" ? "kk-KZ" : "ru-RU";

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
        loadOrders();
    }, [isAdmin]);

    async function loadOrders() {
        setLoading(true);

        const { data, error } = await supabase
            .from("tour_orders")
            .select(
                `
                id,
                created_at,
                tour_id,
                user_id,
                tour:tours (
                    id,
                    title_en,
                    title_ru,
                    title_kz
                )
            `
            )
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            setError(t("admin.orders.loadError"));
            setOrders([]);
        } else {
            setError(null);
            setOrders(data || []);
        }

        setLoading(false);
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
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                >
                    {t("nav.admin.tours")}
                </Link>
                <Link
                    to="/admin/orders"
                    className="inline-flex items-center rounded-full border border-sky-300 bg-sky-50 px-3 py-1.5 text-sky-700 font-medium"
                >
                    {t("nav.admin.orders")}
                </Link>
            </div>

            <header className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {t("admin.orders.pageTitle")}
                </h1>
                <p className="text-sm text-slate-600">
                    {t("admin.orders.pageSubtitle")}
                </p>
            </header>

            {loading && (
                <p className="text-sm text-slate-500">
                    {t("admin.orders.loading")}
                </p>
            )}

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

            {!loading && !error && orders.length === 0 && (
                <p className="text-sm text-slate-500">
                    {t("admin.orders.empty")}
                </p>
            )}

            {!loading && !error && orders.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full border-collapse text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                {t("admin.orders.table.id")}
                            </th>
                            <th className="px-4 py-3 text-left">
                                {t("admin.orders.table.date")}
                            </th>
                            <th className="px-4 py-3 text-left">
                                {t("admin.orders.table.tour")}
                            </th>
                            <th className="px-4 py-3 text-left">
                                {t("admin.orders.table.user")}
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {orders.map((order) => {
                            const createdAt = order.created_at
                                ? new Date(order.created_at).toLocaleString(locale)
                                : "—";

                            const titleKey = `title_${lang}`; // title_ru / title_en / title_kz
                            const tourTitle =
                                (order.tour && order.tour[titleKey]) ||
                                order.tour?.title_ru ||
                                order.tour?.title_en ||
                                order.tour?.title_kz ||
                                `#${order.tour_id}`;

                            const userId = order.user_id || "—";

                            return (
                                <tr key={order.id}>
                                    <td className="px-4 py-2 align-top text-slate-500">
                                        #{order.id}
                                    </td>
                                    <td className="px-4 py-2 align-top text-slate-700">
                                        {createdAt}
                                    </td>
                                    <td className="px-4 py-2 align-top text-slate-900">
                                        {tourTitle}
                                    </td>
                                    <td className="px-4 py-2 align-top text-slate-700">
                                        {userId}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
