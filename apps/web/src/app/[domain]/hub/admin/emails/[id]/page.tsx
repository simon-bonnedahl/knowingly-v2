"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { JSONContent } from "@tiptap/core";
import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";

import { useDebounce } from "~/lib/hooks/useDebounce";
import { EditorPreview } from "../editor-preview";
import { useEditorContext } from "../editor-provider";

export default function EmailTemplatePage() {
  const { id } = useParams();
  const update = useMutation(api.emails.updateTemplate);

  const { setSubject, setPreviewText, setReplyTo, setFrom, json, subject, previewText, replyTo, from } =
    useEditorContext((s) => s);
  const debouncedJson = useDebounce(json, 1000);
  const debouncedSubject = useDebounce(subject, 1000);
  const debouncedPreviewText = useDebounce(previewText, 1000);
  const debouncedReplyTo = useDebounce(replyTo, 1000);
  const debouncedFrom = useDebounce(from, 1000);


  const template = useQuery(api.emails.getTemplate, {
    id: id as Id<"emailTemplates">,
  });

  React.useEffect(() => {
    if (!template) {
      return;
    }
    setSubject(template.title);
    setFrom(template.from ?? "");
    setReplyTo(template.replyTo ?? "");
    setPreviewText(template.previewText ?? "");
  }, [template]);

  React.useEffect(() => {
    if (!template) return;

    if (!debouncedJson || debouncedJson === JSON.parse(template.content))
      return;
    update({
      id: id as Id<"emailTemplates">,
      value: JSON.stringify(debouncedJson),
      field: "content",
    });
  }, [debouncedJson]);

  React.useEffect(() => {
    if (!template) return;

    if (!debouncedSubject || debouncedSubject === template.title)
      return;
    update({
      id: id as Id<"emailTemplates">,
      value: debouncedSubject,
      field: "title",
    });
  }, [debouncedSubject]);

    React.useEffect(() => {
        if (!template) return;
    
        if (!debouncedPreviewText || debouncedPreviewText === template.previewText)
        return;
        update({
        id: id as Id<"emailTemplates">,
        value: debouncedPreviewText,
        field: "previewText",
        });
    }, [debouncedPreviewText]);

    React.useEffect(() => {
        if (!template) return;
    
        if (!debouncedReplyTo || debouncedReplyTo === template.replyTo)
        return;
        update({
        id: id as Id<"emailTemplates">,
        value: debouncedReplyTo,
        field: "replyTo",
        });
    }, [debouncedReplyTo]);

    React.useEffect(() => {
        if (!template) return;
    
        if (!debouncedFrom || debouncedFrom === template.from)
        return;
        update({
        id: id as Id<"emailTemplates">,
        value: debouncedFrom,
        field: "from",
        });
    }, [debouncedFrom]);

  if (!template) {
    return (
      <div className=" flex h-screen w-full items-center justify-center ">
        <div className="h-36 w-36">
          <div className="h-36 w-36 animate-spin rounded-full border-b-4 border-t-2 border-foreground"></div>
        </div>
      </div>
    );
  }

  return (
    <EditorPreview
      className="w-full"
      config={{
        autofocus: "end",
      }}
      content={JSON.parse(template.content) as JSONContent}
    />
  );
}
