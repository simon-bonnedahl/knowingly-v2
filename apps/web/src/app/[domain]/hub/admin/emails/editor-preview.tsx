"use client";

import type { JSONContent, Editor as TiptapEditor } from "@tiptap/core";
import { useState } from "react";
import { useAction } from "convex/react";

import type { EditorProps } from "@knowingly/email-editor";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Editor } from "@knowingly/email-editor";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@knowingly/ui/tooltip";

import { useEditorContext } from "./editor-provider";
import { Button } from "@knowingly/ui/button";
import { toast } from "sonner";

interface EditorPreviewProps {
  className?: string;
  content?: JSONContent;
  config?: Partial<EditorProps["config"]>;
}


export function EditorPreview(props: EditorPreviewProps) {
  const { className, content: defaultContent, config: defaultConfig } = props;
  const {
    editor,
    previewText,
    setPreviewText,
    setEditor,
    json,
    setJson,
    subject,
    setSubject,
    from,
    setFrom,
    replyTo,
    setReplyTo,
    to,
    setTo,
    
  } = useEditorContext((s) => s);
  const send = useAction(api.emails.send);

  const [showReplyTo, setShowReplyTo] = useState(replyTo !== "");
  const onSend = () => {
    toast.promise( send({ json: JSON.stringify(json), subject, from, replyTo, to, previewText }), {
      loading: "Sending...",
      success: "Success: Email sent",
      error: (error) => `Error: ${error.data}`,
    });

  }

  const defaultHtml = `<img src="https://simbo.casa/logo-small-black.svg" data-maily-component="logo" data-size="md" data-alignment="left" style="position:relative;margin-top:0;height:48px;margin-right:auto;margin-left:0"><div data-maily-component="spacer" data-height="xl" style="width: 100%; height: 64px;" class="spacer" contenteditable="false"></div><h2><strong>Discover Maily</strong></h2><p>Are you ready to transform your email communication? Introducing Maily, the powerful email editor that enables you to craft captivating emails effortlessly.</p><p>Elevate your email communication with Maily! Click below to try it out:</p><a data-maily-component="button" mailycomponent="button" text="Try Maily Now →" url="" alignment="left" variant="filled" borderradius="round" buttoncolor="#141313" textcolor="#ffffff"></a><div data-maily-component="spacer" data-height="xl" style="width: 100%; height: 64px;" class="spacer" contenteditable="false"></div><p>Join our vibrant community of users and developers on GitHub, where Maily is an <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/arikchakma/maily.to"><em>open-source</em></a> project. Together, we'll shape the future of email editing.</p><p>Regards,<br>Arikko</p>`;

  return (
    <div className={cn(className)}>
      <Label className="flex items-center font-normal">
        <span className="w-20 shrink-0 font-normal text-foreground after:ml-0.5 after:text-red-400 after:content-['*']">
          Subject
        </span>
        <Input
          className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          placeholder="Email Subject"
          type="text"
          value={subject}
        />
      </Label>
      <div className="flex items-center gap-1.5">
        <Label className="flex grow items-center font-normal">
          <span className="w-20 shrink-0 font-normal text-foreground">
            From
          </span>
          <Input
            className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              setFrom(e.target.value);
            }}
            placeholder="Simon Bonnedahl <invite@knowingly.ai>"
            type="text"
            value={from}
          />
        </Label>

        {showReplyTo ? null : (
          <button
            className="inline-block h-full shrink-0 bg-transparent px-1 text-sm text-foreground  disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            onClick={() => {
              setShowReplyTo(true);
            }}
            type="button"
          >
            Reply-To
          </button>
        )}
      </div>
      {showReplyTo ? (
        <Label className="flex items-center font-normal">
          <span className="w-20 shrink-0 font-normal text-foreground">
            Reply-To
          </span>
          <div className="align-content-stretch flex grow items-center">
            <Input
              className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setReplyTo(e.target.value);
              }}
              placeholder="no-reply@knowingly.ai"
              type="text"
              value={replyTo}
            />
            <button
              className="flex h-10 shrink-0 items-center bg-transparent px-1 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => {
                setReplyTo("");
                setShowReplyTo(false);
              }}
              type="button"
            >
              <Icons.x className="inline-block size-4" />
            </button>
          </div>
        </Label>
      ) : null}
      <Label className="flex items-center font-normal">
        <span className="w-20 shrink-0 font-normal text-foreground">To</span>
        <Input
          className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setTo(e.target.value);
          }}
          placeholder="Email Recipient(s)"
          type="text"
          value={to}
        />
      </Label>
      <div className="flex gap-2 my-2 items-center w-full">
        <div className="relative w-full">
          <Input
            className="h-auto rounded-none border-x-0 border-gray-300 px-0 py-2.5 pr-5 text-base focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              setPreviewText(e.target.value);
            }}
            placeholder="Preview Text"
            type="text"
            value={previewText}
          />
          <span className="absolute right-4 top-0 flex h-full items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-transparent">
                  <Icons.infoCircle className="h-3.5 w-3.5 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm text-gray-600">
                    The preview text is the snippet of text that is pulled into
                    the <u>inbox preview</u> of an email client, usually right
                    after the subject line.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
        <Button variant="ringHover" onClick={onSend}>
          <Icons.send className="mr-2 size-4" />
          Send</Button>
      </div>

      <div>
        {!editor ? (
          <div className="flex items-center justify-center">
            <Icons.loader className="animate-spin text-gray-400" />
          </div>
        ) : null}
        <div className="max-h-[650px] overflow-y-scroll">
          <Editor
            config={{
              hasMenuBar: false,
              wrapClassName: "editor-wrap",
              bodyClassName: "!mt-0 !border-0 !p-0 !bg-card",
              contentClassName: "editor-content",
              toolbarClassName: "flex-wrap !items-start",
              spellCheck: false,
              autofocus: false,
              ...defaultConfig,
            }}
            contentHtml={defaultHtml}
            contentJson={defaultContent}
            onCreate={(e) => {
              setEditor(e as unknown as TiptapEditor);
              setJson(e?.getJSON() || {});
            }}
            onUpdate={(e) => {
              setEditor(e as unknown as TiptapEditor);
              setJson(e?.getJSON() || {});
            }}
          />
        </div>
      </div>
    </div>
  );
}
