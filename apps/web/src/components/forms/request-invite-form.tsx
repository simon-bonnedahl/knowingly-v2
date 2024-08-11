"use client";

import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { useQuery } from "convex/react";

import type { InviteMemberSchema, RequestInviteSchema } from "@knowingly/validators";
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
import { capitalizeFirstLetter } from "@knowingly/utils";
import { RenderIcon } from "../icon-picker/render-icon";
import { Ent } from "@knowingly/backend/convex/types";

interface RequestInviteFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<RequestInviteSchema>;
  user: Ent<"users"> | undefined | null;
  onSubmit: (data: RequestInviteSchema) => void;
}

export function RequestInviteForm({
  form,
  onSubmit,
  user,
  children,
}: RequestInviteFormProps) {
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
          disabled={!!user}
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
                        <RenderIcon icon={role.icon} size={1} className="mr-2 text-muted-foreground" />
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hey, I'd like to join your hub."
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
