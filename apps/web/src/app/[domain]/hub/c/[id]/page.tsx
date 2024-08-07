"use client";

import { api } from "@knowingly/backend/convex/_generated/api";

import "@blocknote/core/fonts/inter.css";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";

import { Label } from "@knowingly/ui/label";
import { Switch } from "@knowingly/ui/switch";

import { Banner } from "~/components/banner";
import { CollectionToolbar } from "./toolbar";
import { Separator } from "@knowingly/ui/separator";
import { Button } from "@knowingly/ui/button";
import { Icons } from "@knowingly/icons";
import { FieldList } from "~/components/field/field-list";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { toast } from "sonner";
import { useEdit } from "~/lib/hooks/useEdit";

// export async function generateStaticParams() {
//   const allHubs = await db.hub.findMany({
//     select: {
//       subdomain: true,
//       customDomain: true,
//     },
//   });

//   const allPaths = allHubs
//     .flatMap(({ subdomain, customDomain }) => [
//       subdomain && {
//         domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
//       },
//       customDomain && {
//         domain: customDomain,
//       },
//     ])
//     .filter(Boolean);

//   return allPaths;
// }

export default function CollectionPage({ params }: { params: { id: string } }) {
  const id = params.id as Id<"collections">;
  const collection = useQuery(api.collections.get, { id });

  const { edit, toggleEdit } = useEdit();

  

  if (!collection) {
    return null;
  }



  const goBack = () => {  //TODO: Change to static href?
    window.history.back();
  };


  return (
    <div className="relative flex w-full flex-col items-center">
      <Button
        variant={"ringHover"}

        className="hover:none absolute left-2 top-2  z-30 rounded-full w-10 h-10 p-1"
        onClick={goBack}
      >
        <Icons.arrowLeft className="size-5" />
      </Button>
      <div className="absolute right-2 top-[21rem] z-20 flex items-center gap-2">
        <Label className="font-medium">Edit</Label>
        <Switch checked={edit} onCheckedChange={toggleEdit} />
      </div>
      <Banner banner={collection.banner}/>
      <div className="w-full  px-24">
        <CollectionToolbar collection={collection} />

      

      </div>

      <Separator className="w-full" />
      

      <div className="w-full p-4 pb-96">
       
    
      </div>
    </div>
  );
}
