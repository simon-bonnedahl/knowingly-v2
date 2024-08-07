"use client";

import { api } from "@knowingly/backend/convex/_generated/api";

import "@blocknote/core/fonts/inter.css";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import { Label } from "@knowingly/ui/label";
import { Separator } from "@knowingly/ui/separator";
import { Switch } from "@knowingly/ui/switch";

import { Banner } from "~/components/banner";
import { FieldList } from "~/components/field/field-list";
import { useEdit } from "~/lib/hooks/useEdit";
import { RequestMeeting } from "./request-meeting";
import { SendMessage } from "./send-message";
import { PageToolbar } from "./toolbar";
import { stringify } from "querystring";

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

export default function PagePage({ params }: { params: { id: string } }) {
  const id = params.id as Id<"pages">;
  const page = useQuery(api.pages.getPage, { id });
  const creator = useQuery(api.pages.getCreator, { id });
  const updatePage = useMutation(api.pages.update);

  const { edit, toggleEdit } = useEdit();

  const Editor = useMemo(
    () => dynamic(() => import("~/components/editor/editor"), { ssr: false }),
    [],
  );

  if (!page) {
    return null;
  }

  const onChange =  (content: any) => {
    if(!content || JSON.stringify(content) === page.content) return;
    toast.promise(
      updatePage({
        id,
        field: "content",
        value: JSON.stringify(content),
      }),
      {
        loading: "Updating",
        success: "Success: Updated content",
        error: (error) => `Error: ${error.data}`,
      }
    );
  };

  const goBack = () => {
    //TODO: Change to static href?
    window.history.back();
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <Button
        variant={"ringHover"}
        className="hover:none absolute left-2 top-2  z-30 h-10 w-10 rounded-full p-1"
        onClick={goBack}
      >
        <Icons.arrowLeft className="size-5" />
      </Button>
      <div className="absolute right-2 top-[21rem] z-20 flex items-center gap-2">
        <Label className="font-medium">Edit</Label>
        <Switch checked={edit} onCheckedChange={toggleEdit} />
      </div>
      <Banner banner={page.banner} isPage />
      <div className="w-full  px-24">
        <PageToolbar page={page}>
          {creator && page.type === "PROFILE" && (
            <>
              <RequestMeeting creator={creator} />
              <SendMessage creator={creator} />
            </>
          )}
        </PageToolbar>
        <FieldList fields={page.fields} isPage />
      </div>

      <Separator className="w-full" />

      <div className="w-full p-4 pb-96">
        <Editor
          onChange={onChange}
          initialContent={page.content}
          editable={edit}
        />
      </div>
    </div>
  );
}
