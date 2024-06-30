"use client";
import { IconArrowUpRight, IconSparkles, IconX } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { Message, useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover";
import { Input } from "@knowingly/ui/input";
import { cn } from "~/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Badge } from "@knowingly/ui/badge";

const MarkdownComponents: object = {
  p: (paragraph: any) => {
    const { node } = paragraph;

    if (node.children[0]?.tagName === "a") {
      return (
        <Link
          href={node.children[0].properties.href}
          className="bg-muted text-muted-foreground rounded-md px-2 py-1 flex items-center gap-2 w-fit"
        >
          {node.children[0].children[0].value}
          <IconArrowUpRight size={16} />
        </Link>
      );
    }

    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
      const metaWidth = metastring.match(/{([^}]+)x/);
      const metaHeight = metastring.match(/x([^}]+)}/);
      const width = metaWidth ? metaWidth[1] : "768";
      const height = metaHeight ? metaHeight[1] : "432";
      const isPriority = metastring?.toLowerCase().match("{priority}");

      return (
        <Image
          src={image.properties.src}
          width={150}
          height={150}
          className="postImg rounded-xl shadow-sm"
          alt={alt}
          priority={isPriority}
        />
      );
    }
    return <p>{paragraph.children}</p>;
  },
};

export const AIChat = () => {
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: `${process.env.NEXT_PUBLIC_CONVEX_API_ENDPOINT}/api/chat`,
  });
  const user = useQuery(api.users.getMe);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-3 right-3 z-10">
      <Popover open={open}>
        <PopoverTrigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-primary p-3 text-white shadow-lg"
          >
            <IconSparkles size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          collisionPadding={10}
          sideOffset={-40}
          className="w-96 max-h-96 border-none grow flex flex-col gap-4 shadow-lg"
        >
          <button
            className="absolute top-4 right-4 bg-background rounded-full"
            onClick={() => setOpen(false)}
          >
            <IconX size={16} />
          </button>
          <div className="flex gap-2 absolute top-4 left-2">
            <Badge variant="default" className="text-[0.6rem]">
              AI Chat | Beta
            </Badge>
          </div>
          <div className="flex flex-col w-full mt-8 max-h-80 overflow-y-auto">
            {messages.length === 0 && (
              <div className="flex flex-col gap-4">
                <span className="text-muted-foreground text-sm font-medium">
                  Hi {user?.name}!
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  Q&A combines all of GPT-4s general knowledge with the content
                  of this Hub. Ask me about anything!
                </span>
              </div>
            )}
            {messages?.map((m: Message) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col h-auto mb-2",
                  m.role === "assistant" ? "items-start" : "items-end"
                )}
              >
                {m.role === "assistant" ? (
                  <ReactMarkdown
                    components={MarkdownComponents}
                    className="text-muted-foreground text-sm font-medium"
                  >
                    {m.content}
                  </ReactMarkdown>
                ) : (
                  <span className="bg-muted text-muted-foreground rounded-2xl px-2.5 py-1.5 text-sm font-medium">
                    {m.content}
                  </span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              className="w-full bg-muted text-muted-foreground"
              value={input}
              placeholder="Ask me anything..."
              onChange={handleInputChange}
            />
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};
