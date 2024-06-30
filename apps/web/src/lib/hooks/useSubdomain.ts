import { useParams } from "next/navigation";

export const useSubdomain = () => {
    const params = useParams();
    return decodeURIComponent(params.domain as string).split(".")[0] as string;
}