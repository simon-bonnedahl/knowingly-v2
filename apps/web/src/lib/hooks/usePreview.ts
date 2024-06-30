import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export const usePreview = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [preview, setPreview] = useState(searchParams.get("preview") === "true");

    useEffect(() => {
        const currentPreview = searchParams.get("preview") === "true";
        if (currentPreview !== preview) {
            setPreview(currentPreview);
        }
    }, [searchParams]);

    const togglePreview = useCallback(() => {
        const newValue = !preview;
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("preview", newValue.toString());
        router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
        setPreview(newValue);
    }, [preview, router]);

    return { preview, togglePreview };
};
