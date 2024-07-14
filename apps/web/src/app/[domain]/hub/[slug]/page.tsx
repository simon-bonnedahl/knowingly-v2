"use client";

import { api } from "@knowingly/backend/convex/_generated/api";
import "@blocknote/core/fonts/inter.css";
// import { BlockNoteView } from "@blocknote/mantine";
import { useMutation, useQuery } from "convex/react";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Banner } from "~/components/banner";
import { PageToolbar } from "./toolbar";
import { Button } from "@knowingly/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
 

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

export default  function PageLayout({
  params,
}: {
  params: { slug: string };
}) {
  const page =  useQuery(api.pages.getPage, { slug: params.slug });
  const updatePage = useMutation(api.pages.update);
  const {theme} = useTheme();
  const Editor = useMemo(
    () => dynamic(() => import("~/components/editor/editor"), { ssr: false }),
    []
  )

  if (!page) {
    return null;
  }

  const onChange = async (content: any) => {
    updatePage({
      slug: params.slug,
      field: "customContent",
      value: JSON.stringify(content),
    });
  }
  const goBack = () => {
    window.history.back();
  }

  return (
    <div className="flex flex-col w-full items-center relative">
        <button  className="absolute top-2 left-2 bg-black  z-30 rounded-full p-2 hover:none" onClick={goBack} >
            <IconArrowLeft size={20} className="text-white" />
        </button>
    <Banner url={page.image} preview={false} />
    <PageToolbar initialData={page} preview={false} />
    <div className="p-4 w-full">
    <Editor onChange={onChange} initialContent={page.customContent}  />

    </div>



    </div>

  );
}
