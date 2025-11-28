import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAdmin() {
    const [checking, setChecking] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function check() {
            setChecking(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                if (!cancelled) {
                    setIsAdmin(false);
                    setChecking(false);
                }
                return;
            }

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("is_admin")
                .eq("id", user.id)
                .single();

            if (!cancelled) {
                setIsAdmin(Boolean(profile?.is_admin));
                setChecking(false);
            }
        }

        check();
        return () => {
            cancelled = true;
        };
    }, []);

    return { isAdmin, checking };
}
