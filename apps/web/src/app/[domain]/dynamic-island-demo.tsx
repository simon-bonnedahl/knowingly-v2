"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";

import { api } from "@knowingly/backend/convex/_generated/api";
import { cn } from "@knowingly/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import { Button, buttonVariants } from "@knowingly/ui/button";
import { Separator } from "@knowingly/ui/separator";
import { TextAnimate } from "@knowingly/ui/text-animation";

import type {
  SizePresets} from "~/components/dynamic-island";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
} from "~/components/dynamic-island";

const DynamicAction = () => {
  const { state: blobState, setSize } = useDynamicIslandSize();
  const blobStates: SizePresets[] = ["empty", "large", "tall"];

  const [compactIndex, setCompactIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const { userId } = searchParams.get("userId")
    ? { userId: searchParams.get("userId") }
    : { userId: null }; //if we happen to be in a conversation with a user, we want to show the message notification

  const latestNotification = useQuery(api.notifications.latest);
  const latestMessage = useQuery(api.messages.latest);
  const unreadMessages = useQuery(api.messages.getUnreadCount);
  const unreadNotifications = useQuery(api.notifications.getUnreadCount);
  const upcomingMeetings = useQuery(api.meetings.upcomingCount);

  useEffect(() => {
    if (!latestNotification) return;
    if (savedIds.includes(latestNotification._id)) return;
    if (savedIds.length < 2) {
      setSavedIds([...savedIds, latestNotification._id]);
      return;
    }
    setSavedIds([...savedIds, latestNotification._id]);
    setBlobState("large");
  }, [latestNotification]);

  useEffect(() => {
    if (!latestMessage) return;
    if (savedIds.includes(latestMessage._id)) return;
    if (savedIds.length < 2) {
      setSavedIds([...savedIds, latestMessage._id]);
      return;
    }
    if (latestMessage.senderId === userId) return;

    setSavedIds([...savedIds, latestMessage._id]);
    setBlobState("tall");
  }, [latestMessage]);

  const setBlobState = (size: SizePresets) => {
    setSize(size);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBlobState("empty")
    }, 10000);

    return () => clearInterval(interval);
  }
  , [blobState]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCompactIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const renderCompactState = () => {
    return (
      <DynamicContainer>
        <DynamicDiv className="flex items-center gap-1 px-1 text-xs">
          {compactIndex === 0 && (
            <>
              <span className="font-bold">{unreadMessages}</span>
              <TextAnimate
                text="unread messages"
                type="rollIn"
                className="!text-xs font-medium "
              />
            </>
          )}
          {compactIndex === 1 && (
            <>
              <span className="font-bold">{unreadNotifications}</span>
              <TextAnimate
                text="unread notifications"
                type="rollIn"
                className="!text-xs font-medium "
              />
            </>
          )}
          {compactIndex === 2 && (
            <>
              <span className="font-bold">{upcomingMeetings}</span>
              <TextAnimate
                text="upcoming meetings"
                type="rollIn"
                className="!text-xs font-medium "
              />
            </>
          )}
        </DynamicDiv>
      </DynamicContainer>
    );
  };

  const renderTallState = () => (
    <DynamicContainer className="flex h-full flex-col justify-between gap-2 px-2 pt-4  text-left ">
      <DynamicDiv>
        <DynamicTitle className="text-xl  font-medium tracking-tighter">
          New message
        </DynamicTitle>
        <DynamicDescription className="text-muted-foreground">
          <span className="font-bold">{latestMessage?.sender.name}</span> sent
          you a message
        </DynamicDescription>
      </DynamicDiv>

      <DynamicDiv className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={latestMessage?.sender.imageUrl} />
          <AvatarFallback>{latestMessage?.sender.name}</AvatarFallback>
        </Avatar>
        <span className={cn("max-w-64 truncate rounded-md bg-accent p-3")}>
          {latestMessage?.body}
        </span>
      </DynamicDiv>
      <Separator  />
      <div className="flex w-full items-center gap-1">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setBlobState("empty")}
        >
          Dismiss
        </Button>
        <Link
          href={`conversations?userId=${latestMessage?.senderId}`}
          className={cn(buttonVariants({ variant: "ringHover" }), "w-full")}
        >
          View
        </Link>
      </div>
    </DynamicContainer>
  );
  const renderLargeState = () => (
    <div className="flex items-center gap-2 p-5">
      <Avatar>
        <AvatarImage src={latestNotification?.icon} />
        <AvatarFallback>{latestNotification?.icon}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{latestNotification?.title}</span>
    </div>
  );

  // Main render logic based on size
  function renderState() {
    switch (blobState.size) {
      case "compact":
        return renderCompactState();

      case "large":
        return renderLargeState();
      case "tall":
        return renderTallState();
      case "empty":
        return null

      default:
        return null
    }
  }

  return (
    <div className="fixed right-1 top-1  z-50">
      <DynamicIsland id="dynamic-blob">
        <button
          onClick={() => {
            setSize("empty");
            setCompactIndex((prevIndex) => (prevIndex + 1) % 3);
          }}
        >
          {renderState()}
        </button>
      </DynamicIsland>
    </div>
  );
};

export function DynamicIslandDemo() {
  return (
    <DynamicIslandProvider initialSize={"empty"}>
      <DynamicAction />
    </DynamicIslandProvider>
  );
}

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

export function FadeIn(props: any) {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      {...props}
    />
  );
}

export function FadeInStagger({ faster = false, ...props }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
