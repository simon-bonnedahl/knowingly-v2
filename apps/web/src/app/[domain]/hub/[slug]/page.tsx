"use client";

import { api } from "@knowingly/backend/convex/_generated/api";

import "@blocknote/core/fonts/inter.css";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";

import { Label } from "@knowingly/ui/label";
import { Switch } from "@knowingly/ui/switch";

import { Banner } from "~/components/banner";
import { usePreview } from "~/lib/hooks/usePreview";
import { CustomFields } from "./custom-fields";
import { PageToolbar } from "./toolbar";
import { Separator } from "@knowingly/ui/separator";
import { RequestMeeting } from "./request-meeting";
import { SendMessage } from "./send-message";
import { Button } from "@knowingly/ui/button";
import { Icons } from "@knowingly/icons";

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

export default function PagePage({ params }: { params: { slug: string } }) {

  const page = useQuery(api.pages.getPage, { slug: params.slug });
  const creator = useQuery(api.pages.getCreator, { slug: params.slug });
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
    void updatePage({
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
      <Button
        variant={"ringHover"}

        className="hover:none absolute left-2 top-2  z-30 rounded-full w-10 h-10 p-1"
        onClick={goBack}
      >
        <Icons.arrowLeft className="size-5" />
      </Button>
      <div className="absolute right-2 top-[21rem] z-20 flex items-center gap-2">
        <Label className="font-medium">Preview</Label>
        <Switch checked={preview} onCheckedChange={togglePreview} />
      </div>
      <Banner url={page.image} preview={preview} page/>
      <div className="w-full  px-24">

      <PageToolbar page={page} preview={preview}>
        {(creator && page.type === "PROFILE") && (
          <>
           <RequestMeeting creator={creator}/>
           <SendMessage creator={creator} />
           </>
          )}

      </PageToolbar>
      <CustomFields customFields={page.customFields} preview={preview} />
      </div>

      <Separator className="w-full" />
      

      <div className="w-full p-4 pb-96">
       
        <Editor
          onChange={onChange}
          initialContent={page.customContent}
          editable={!preview}
        />
      </div>
    </div>
  );
}
