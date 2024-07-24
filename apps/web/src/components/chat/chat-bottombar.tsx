import Link from "next/link";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover";
import { cn } from "@knowingly/ui";
import { buttonVariants } from "@knowingly/ui/button";
import { Textarea } from "@knowingly/ui/textarea";
import { EmojiPicker } from "./emoji-picker";
import { Icons } from "../icons";
interface ChatBottombarProps {
  sendMessage: (message: string) => void;
  isMobile: boolean;
}


export default function ChatBottombar({
  sendMessage, isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {

    sendMessage("👍");
    setMessage("");
  };

  const handleSend = () => {
      sendMessage(message);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 pb-4 flex justify-between w-full items-center gap-2">
      <div className="flex gap-1">
          <Popover>
            <PopoverTrigger asChild>
            <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <Icons.circlePlus className="text-muted-foreground size-5" />
        </Link>
            </PopoverTrigger>
            <PopoverContent 
            side="top"
            className="w-full p-2">
             {message.trim() || isMobile ? (
               <div className="flex gap-2">
                <Link 
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              >
                <Icons.microphone className="text-muted-foreground size-5" />
              </Link>
             </div>
             ) : (
              <Link 
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              >
                <Icons.microphone  className="text-muted-foreground size-5" />
              </Link>
             )}
            </PopoverContent>
          </Popover>
        {!message.trim() && !isMobile && (
          <div className="flex gap-1">
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <Icons.filePlus  className="text-muted-foreground size-5" />
              </Link>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <Icons.paperclip  className="text-muted-foreground size-5" />
              </Link>
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
          />
          <div className="absolute right-2 bottom-0.5  ">
            <EmojiPicker onChange={(value) => {
              setMessage(message + value)
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }} />
          </div>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <Icons.send  className="text-muted-foreground size-5" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <Icons.thumbUp  className="text-muted-foreground size-5" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
