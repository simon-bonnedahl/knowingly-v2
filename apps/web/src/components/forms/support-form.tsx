"use client";

import type { UseFormReturn } from "react-hook-form";
import * as React from "react";

import type { SupportTicketSchema } from "@knowingly/validators";
import { cn } from "@knowingly/ui";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@knowingly/ui/form";
import { Input } from "@knowingly/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@knowingly/ui/select";
import { Textarea } from "@knowingly/ui/textarea";

import type { SupportCategories } from "@knowingly/backend/convex/types";
import { capitalizeFirstLetter } from "@knowingly/utils";


interface SupportFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<SupportTicketSchema>;
  onSubmit: (data: SupportTicketSchema) => void;
}

export function SupportForm({
  form,
  onSubmit,
  children,
}: SupportFormProps) {
   

    const categories : SupportCategories[] = [
        "SUPPORT",
        "BUG",
        "FEATURE_REQUEST",
    ]



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        <div className="flex flex-row items-center gap-2">
                          <span>{capitalizeFirstLetter(category)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>More info (optional)</FormLabel>
              <FormMessage
                className={cn("flex items-center gap-1")}
              ></FormMessage>

              <FormControl>
                  <Textarea
                    placeholder=""
                    maxLength={20}
                    className="resize-none"
                    {...field}
                  />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        
        {children}
      </form>
    </Form>
  );
}
