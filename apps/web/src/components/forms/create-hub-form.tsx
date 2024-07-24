"use client";

import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { useAction, useMutation, useQuery } from "convex/react";
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

import { env } from "~/env";
import { useDebounce } from "~/lib/hooks/useDebounce";
import { capitalizeFirstLetter } from "~/lib/utils";
import { Icons } from "../icons";

interface CreateHubFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<CreateHubSchema>;
  onSubmit: (data: CreateHubSchema) => void;
}

export function CreateHubForm({
  form,
  onSubmit,
  children,
}: CreateHubFormProps) {
  const name = form.watch("name");
  const subdomain = form.watch("subdomain");
  const debouncedSubdomain = useDebounce(subdomain, 500);

  const subdomainAvailable = useQuery(api.hubs.isAvailable, {
    subdomain: debouncedSubdomain,
  });

  React.useEffect(() => {
    const subdomain = slugify(name, { lower: true });
    form.setValue("subdomain", subdomain);
  }, [name, form]);

  const tiers = [
    {
      value: "FREE",
      label: "Free",
      description: "0$ / month",
    },
    {
      value: "PRO",
      label: "Pro",
      description: "9$ / month",
    },
  ];

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
                <div className="relative">
                  <Input
                    placeholder=""
                    maxLength={20}
                    className="resize-none"
                    {...field}
                  />

                  <div className="absolute right-2.5 top-2.5">
                    {subdomainAvailable === undefined ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ">
                        <Icons.loader className="size-4 animate-spin " />
                        Checking
                      </div>
                    ) : subdomainAvailable ? (
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <Icons.check className="size-4 " /> Available
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-red-500">
                        <Icons.x className="size-4 " /> Unavailable
                      </div>
                    )}
                  </div>
                </div>
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
