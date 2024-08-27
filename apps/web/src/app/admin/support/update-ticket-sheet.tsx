"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePreview } from "@blocknote/react";

import type { Ent } from "@knowingly/backend/convex/types";
import { Badge } from "@knowingly/ui/badge";
import { Label } from "@knowingly/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@knowingly/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@knowingly/ui/sheet";
import { Textarea } from "@knowingly/ui/textarea";
import { capitalizeFirstLetter } from "@knowingly/utils";

import { ImagePreviewModal } from "~/components/modals/image-preview-modal";

interface UpdateTicketSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  ticket: Ent<"supportTickets">;
}

export function UpdateTicketSheet({
  ticket,
  ...props
}: UpdateTicketSheetProps) {
  const categories: SupportCategories[] = ["SUPPORT", "BUG", "FEATURE_REQUEST"];
  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Support Ticket</SheetTitle>
          <SheetDescription className="flex w-full justify-between">
            {ticket.title}{" "}
            <Badge
              variant={
                ticket.status === "PENDING"
                  ? "pending"
                  : ticket.status === "OPEN"
                    ? "successful"
                    : "destructive"
              }
            >
              {ticket.status}
            </Badge>
          </SheetDescription>
        </SheetHeader>
        <Label>Category</Label>
        <Select defaultValue={ticket.category}>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category}>
                  <div className="flex flex-row items-center gap-2">
                    <span>{capitalizeFirstLetter(category)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label>Message</Label>
        <Textarea>{ticket.body}</Textarea>
        <Label>Files</Label>
        <div className="grid grid-cols-6">
          {ticket.files.map((file) => (
            <ImagePreviewModal key={file} image={file} className="rounded-md" />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
