"use client";
import React from "react";
import confetti from "canvas-confetti";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@knowingly/ui/card";
import { Button } from "@knowingly/ui/button";
import { Icons } from "@knowingly/icons";
import { CardComponentProps } from "./types";
import { useOnborda } from "./onborda-context";

// OnbordaCard Component
const OnbordaCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  // Onborda hooks
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    void confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <Card className="rounded-3xl max-w-vw border" style={
      {
        transform: `translate(${step.offset?.x || 0}px, ${step.offset?.y || 0}px)`,
      }
    }>
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div>
            <CardTitle className="mb-2 text-lg">
              {step.icon} {step.title}
            </CardTitle>
            <CardDescription>
              {currentStep + 1} of {totalSteps}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => closeOnborda()}>
            <Icons.x className="size-6" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{step.content}</CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          {currentStep !== 0 && (
            <Button onClick={() => prevStep()}>Previous</Button>
          )}
          {currentStep + 1 !== totalSteps && (
            <Button onClick={() => nextStep()} className="ml-auto">
              Next
            </Button>
          )}
          {currentStep + 1 === totalSteps && (
            <Button onClick={() => handleConfetti()} className="ml-auto">
              🎉 Finish!
            </Button>
          )}
        </div>
      </CardFooter>
      <span
        className="text-card"
         
      >
        {arrow}
      </span>
    </Card>
  );
};

export default OnbordaCard;
