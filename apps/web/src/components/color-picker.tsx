"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@knowingly/ui/popover";
import { useEffect } from "react";
import Chrome from "@uiw/react-color-chrome";
import { hexToHSL } from "~/lib/utils";
interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
  showPreview?: boolean;
}

export const ColorPicker = ({
  color,
  setColor,
  showPreview,
}: ColorPickerProps) => {
  // useEffect(() => {
  //   if (!showPreview) return;
  //   document.documentElement.style.setProperty("--primary", hexToHSL(color));
  // }, [color]);

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className="h-10 w-10 cursor-pointer rounded-full border border-white"
          style={{ backgroundColor: color }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Chrome color={color} onChange={(color) => setColor(color.hex)} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
