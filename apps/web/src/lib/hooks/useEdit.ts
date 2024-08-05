import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export const useEdit = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [edit, setEdit] = useState(searchParams.get("edit") === "true");

    useEffect(() => {
        const currentEdit = searchParams.get("edit") === "true";
        if (currentEdit !== edit) {
            setEdit(currentEdit);
        }
    }, [searchParams]);

    const toggleEdit = useCallback(() => {
        const newValue = !edit;
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("edit", newValue.toString());
        router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
        setEdit(newValue);
    }, [edit, router]);

    return { edit, toggleEdit };
};
