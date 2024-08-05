"use client";

import { api } from "@knowingly/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { useRouter } from "next/navigation";

export default function ProfilePage () {
    const subdomain = useSubdomain();
    const router = useRouter();
    const myProfile = useQuery(api.users.getMyProfile, { subdomain });

    if(!myProfile) {
        return(
            <div>You dont have a profile on this hub</div>
        )
    }
    return router.push(`/${myProfile._id}`)
    }
