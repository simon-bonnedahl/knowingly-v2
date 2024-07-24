"use client"

import { createContext, useContext } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpLeftSquareIcon,
  Loader,
  Mail,
  MessageCircle,
  MousePointerClickIcon,
  User,
  Waves,
} from "lucide-react"


import { Badge } from "@knowingly/ui/badge"
import { Button } from "@knowingly/ui/button"
import { DynamicContainer, DynamicDescription, DynamicDiv, DynamicIsland, DynamicIslandProvider, DynamicTitle, SizePresets, useDynamicIslandSize, useScheduledAnimations } from "."
import { Icons } from "../icons"
import React from "react"

const DynamicAction = () => {
  const { state: blobState, setSize } = useDynamicIslandSize()
  const blobStates: SizePresets[] = [
    "small",
    "long",
    "tall",
  ]

  const cycleBlobStates = () => {
    console.log(blobState.size)
    const currentIndex = blobStates.indexOf(blobState.size)
    const nextIndex = (currentIndex + 1) % blobStates.length
    console.log(blobStates)
    console.log(currentIndex)
    console.log(nextIndex)
    console.log(blobStates[nextIndex])
    setSize(blobStates[nextIndex])
  }

//   useScheduledAnimations([
//     { size: "compact", delay: 1000 },
//     { size: "large", delay: 1200 },
//     { size: "tall", delay: 1600 },
//     { size: "long", delay: 1800 },
//     { size: "medium", delay: 2200 },
//   ])

  // Provide dynamic detail in such a beautiful small place :)
  const renderSmallState = () => (
    <DynamicContainer className="flex items-center justify-center rounded-full bg-primary w-full h-full">
         <Button size={"icon"} variant={"default"} onClick={cycleBlobStates}>
            Next
        </Button>
      {blobState.size}
    </DynamicContainer>
  )

  const renderCompactState = () => (
    <DynamicContainer className="flex items-center justify-center rounded-full bg-primary w-full h-full">
         <Button size={"icon"} variant={"default"} onClick={cycleBlobStates}>
            Next
        </Button>
      {blobState.size}
    </DynamicContainer>
  )

  // Great for call to action, popping up in users face :)
  const renderLargeState = () => (
    <DynamicContainer className="flex items-center justify-center rounded-full bg-primary w-full h-full">
         <Button size={"icon"} variant={"default"} onClick={cycleBlobStates}>
            Next
        </Button>
      {blobState.size}
    </DynamicContainer>
  )

  // Great for user onboarding, forms, etc
  const renderTallState = () => (
    <DynamicContainer className="flex items-center justify-center rounded-full bg-primary w-full h-full"  >
        <Button size={"icon"} variant={"default"} onClick={cycleBlobStates}>
            Next
        </Button>
      {blobState.size}
    </DynamicContainer>
  )

  const renderLongState = () => (
    <DynamicContainer className="flex items-center justify-center rounded-full bg-primary w-full h-full">
         <Button size={"icon"} variant={"default"} onClick={cycleBlobStates}>
            Next
        </Button>
    {blobState.size}
    </DynamicContainer>
  )

  const renderMediumState = () => (
    <DynamicContainer className="flex items-center justify-center rounded-full bg-primary w-full h-full">
         <Button size={"icon"} variant={"default"} onClick={cycleBlobStates}>
            Next
        </Button>
      {blobState.size}
    </DynamicContainer>
  )


  // Main render logic based on size
  function renderState() {
    console.log("SIZE", blobState.size)

    switch (blobState.size) {
     case "small":
        return renderSmallState()  
      case "compact":
        return renderCompactState()
      case "large":
        return renderLargeState()
      case "tall":
        return renderTallState()
      case "medium":
        return renderMediumState()
      case "long":
        return renderLongState()
      // Optionally add cases for other states as necessary
      default:
        return renderSmallState()
    }
  }

  return (
    <div className=" h-full fixed top-4 right-8 z-50">
      <div className="flex flex-col gap-4  h-full">
       
   

        <DynamicIsland id="dynamic-blob">{renderState()}</DynamicIsland>
      </div>
    </div>
  )
}

export function DynamicIslandDemo() {
  return (
    <DynamicIslandProvider initialSize={"default"}>
      <div>
        <DynamicAction />
      </div>
    </DynamicIslandProvider>
  )
}

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: "0px 0px -200px" }

export function FadeIn(props: any) {
  let shouldReduceMotion = useReducedMotion()
  let isInStaggerGroup = useContext(FadeInStaggerContext)

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
  )
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
  )
}
