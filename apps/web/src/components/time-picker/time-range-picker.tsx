"use client";

import * as React from "react";
import { TimePickerInput } from "./time-picker-input";

interface TimeRangePicker {
  startDate: Date | undefined;
  endDate: Date | undefined;
  // setDate: (date: Date | undefined) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  className?: string;
  onLeftFocus?: () => void;
  onRightFocus?: () => void;
}

export function TimeRangePicker({
  startDate,
  endDate,
  className,
  setStartDate,
  setEndDate,
}: TimeRangePicker) {
  const startMinuteRef = React.useRef<HTMLInputElement>(null);
  const startHourRef = React.useRef<HTMLInputElement>(null);

  const endMinuteRef = React.useRef<HTMLInputElement>(null);
  const endHourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto flex w-60 items-center gap-4 py-4">
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput
            className={className}
            picker="hours"
            date={startDate}
            setDate={setStartDate}
            ref={startHourRef}
            onRightFocus={() => startMinuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            className={className}
            picker="minutes"
            date={startDate}
            setDate={(e) => {
              console.log(e);
              if (e && e.getMinutes() < 3) {
                e.setMinutes(0);
              } else if (e) {
                e?.setMinutes(30);
              }
              setStartDate(e);
            }}
            ref={startMinuteRef}
            onLeftFocus={() => startHourRef.current?.focus()}
            onRightFocus={() => endHourRef.current?.focus()}
          />
        </div>
      </div>
      -
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput
            className={className}
            picker="hours"
            date={endDate}
            setDate={setEndDate}
            ref={endHourRef}
            onLeftFocus={() => startMinuteRef.current?.focus()}
            onRightFocus={() => endMinuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            className={className}
            picker="minutes"
            date={endDate}
            setDate={(e) => {
              // check if minute is >3 and set to 30 else set to 00
              if (e && e.getMinutes() < 3) {
                e.setMinutes(0);
              } else if (e) {
                e?.setMinutes(30);
              }

              setEndDate(e);
            }}
            ref={endMinuteRef}
            onLeftFocus={() => endHourRef.current?.focus()}
          />
        </div>
      </div>
    </div>
  );
}
