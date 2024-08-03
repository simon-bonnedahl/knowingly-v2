"use client";

import * as React from "react";
import { TimePickerInput } from "./time-picker-input";
import { Label } from "@knowingly/ui/label";
import { Icons } from "@knowingly/icons";

interface TimePicker {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  onLeftFocus?: () => void;
  onRightFocus?: () => void;
}

export function TimePicker({
  date,
  setDate,
  className,
  onLeftFocus,
  onRightFocus,
}: TimePicker) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  //   const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          className={className}
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          onLeftFocus={onLeftFocus}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          className={className}
          picker="minutes"
          date={date}
          setDate={(e) => {
            // only allow 00 and 30. 00 is default
            if (e && e.getMinutes() < 30) {
              e.setMinutes(0);
            } else if (e) {
              e?.setMinutes(30);
            }

            setDate(e);
          }}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={onRightFocus}
        />
      </div>
      <div className="flex h-10 items-center">
        <Icons.clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
