"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAction, useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button, buttonVariants } from "@knowingly/ui/button";
import { Separator } from "@knowingly/ui/separator";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { useEditorContext } from "./editor-provider";
import { EmailPreviewModal } from "./email-preview-modal";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";

export const EditorSidebar = () => {
  const subdomain = useSubdomain();
  const { json } = useEditorContext((s) => s);

  const createTemplate = useMutation(api.emails.createTemplate);
  const deleteTemplate = useMutation(api.emails.deleteTemplate);
  const templates = useQuery(api.emails.listTemplates, { subdomain });

  const { id } = useParams();

  return (
    <div className="flex h-full w-80 flex-col gap-2">
      <div className="flex w-full items-center gap-2">
        <EmailPreviewModal />
        <Button variant={"destructive"} className="w-full" onClick={() => deleteTemplate({id: id as Id<"emailTemplates">})}>
          <Icons.trash className="mr-2 size-4" />
          Delete
        </Button>
      </div>
      <Button variant={"ringHover"} onClick={() => createTemplate({subdomain})}>
        <Icons.plus className="mr-2 size-4" aria-hidden="true" />
        New
      </Button>
      <Separator />
      <div className="flex flex-col gap-1 p-2 overflow-y-scroll">
      {templates?.map((template) => (
        <Link
          key={template._id}
          href={`/admin/emails/${template._id}`}
          className={cn(
            buttonVariants({ variant: "ringHover", size:"sm" }),
            id === template._id ? "border border-primary" : "",
          )}
        >
          {template.title}
        </Link>
      ))}
      </div>
    </div>
  );
};
