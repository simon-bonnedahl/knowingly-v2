"use client";

import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { useQuery } from "convex/react";
import slugify from "slugify";

import type { CreateHubSchema } from "@knowingly/validators";
import { api } from "@knowingly/backend/convex/_generated/api";
import { cn } from "@knowingly/ui";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from "@knowingly/ui/switch";
import { Textarea } from "@knowingly/ui/textarea";

import { Icons } from "@knowingly/icons";

interface AddPageFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<CreateHubSchema>;
  onSubmit: (data: CreateHubSchema) => void;
}

export function AddPageForm({
  form,
  onSubmit,
  children,
}: AddPageFormProps) {


 

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="tier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {tiers?.map((tier, index) => (
                      <SelectItem key={index} value={tier.value}>
                        <div className="flex flex-row items-center gap-2">
                          <span >{tier.label}</span>
                          <span className=" text-muted-foreground">
                            {tier.description}
                          </span>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain</FormLabel>
              <FormMessage
                className={cn("flex items-center gap-1")}
              ></FormMessage>

              <FormControl>
                  <Input
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This hub is for..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between ">
              <div className="space-y-0.5">
                <FormLabel>Public hub</FormLabel>
                <FormDescription>
                  Make this hub public so anyone can view it.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
