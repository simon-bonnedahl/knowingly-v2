"use client";

import { api } from "@knowingly/backend/convex/_generated/api";

import "@blocknote/core/fonts/inter.css";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { IconArrowLeft } from "@tabler/icons-react";
// import { BlockNoteView } from "@blocknote/mantine";
import { useMutation, useQuery } from "convex/react";
import { useTheme } from "next-themes";

import { Label } from "@knowingly/ui/label";
import { Switch } from "@knowingly/ui/switch";
import { Tag, TagInput } from "@knowingly/ui/tag-input";

import { Banner } from "~/components/banner";
import { usePreview } from "~/lib/hooks/usePreview";
import { CustomFields } from "./custom-fields";
import { PageToolbar } from "./toolbar";

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

export default function PageLayout({ params }: { params: { slug: string } }) {

  const tags = [
    {
      "id": "1534545726",
      "text": "Sports"
  },
    {
      "id": "4063925426",
      "text": "Programming"
  },
    {
      "id": "699968871",
      "text": "Travel"
  }
];

  const page = useQuery(api.pages.getPage, { slug: params.slug });
  const updatePage = useMutation(api.pages.update);
  const { preview, togglePreview } = usePreview();



  const Editor = useMemo(
    () => dynamic(() => import("~/components/editor/editor"), { ssr: false }),
    [],
  );

  if (!page) {
    return null;
  }

  const onChange = async (content: any) => {
    updatePage({
      slug: params.slug,
      field: "customContent",
      value: JSON.stringify(content),
    });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <button
        className="hover:none absolute left-2 top-2  z-30 rounded-full bg-black p-2"
        onClick={goBack}
      >
        <IconArrowLeft size={20} className="text-white" />
      </button>
      <div className="absolute right-2 top-[21rem] z-20 flex items-center gap-2">
        <Label className="font-medium">Toggle preview</Label>
        <Switch checked={preview} onCheckedChange={togglePreview} />
      </div>
      <Banner url={page.image} preview={preview} />
      <PageToolbar initialData={page} preview={preview} />
      <CustomFields customFields={page.customFields} preview={preview} />
      <div className="w-full p-4">
       
        <Editor
          onChange={onChange}
          initialContent={page.customContent}
          editable={!preview}
        />
      </div>
    </div>
  );
}
