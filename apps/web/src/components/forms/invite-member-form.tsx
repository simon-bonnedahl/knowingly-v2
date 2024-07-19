"use client";

import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { useQuery } from "convex/react";

import type { InviteMemberSchema } from "@knowingly/validators";
import { api } from "@knowingly/backend/convex/_generated/api";
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

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { capitalizeFirstLetter } from "~/lib/utils";
import { Icon, IconKey, Icons } from "../icons";

interface CreateTaskFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<InviteMemberSchema>;
  onSubmit: (data: InviteMemberSchema) => void;
}

export function InviteMemberForm({
  form,
  onSubmit,
  children,
}: CreateTaskFormProps) {
  const subdomain = useSubdomain();
  const roles = useQuery(api.hubs.getRoles, { subdomain });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@knowingly.ai"
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
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {roles?.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        <div className="flex w-[6.25rem] items-center">
                          <Icon
                            name={role.icon as IconKey  }
                            className="mr-2 size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span className="capitalize">
                            {capitalizeFirstLetter(role.name)}
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hey, I'd like to invite you to join our hub."
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
