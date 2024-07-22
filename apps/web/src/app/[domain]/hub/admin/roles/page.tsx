"use client";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Button } from "@knowingly/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@knowingly/ui/tooltip";

import { Icon, IconKey, Icons } from "~/components/icons";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { UpdateRoleSheet } from "./update-role-sheet";

export default function AdminRolesPage() {
  const [open, setOpen] = React.useState(false);
  const subdomain = useSubdomain();
  const roles = useQuery(api.hubs.getRoles, { subdomain });
  const addRole = useMutation(api.roles.create);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">Roles</h1>
        </div>
        <div className="flex w-full flex-col gap-1">
          {roles?.map((role) => (
            <div
              key={role._id}
              className="grid grid-cols-3 items-center justify-between rounded-lg bg-background p-4 shadow-sm min-h-20"
            >
              <div className="flex items-center">
                <Icon
                  name={role.icon as IconKey}
                  className="mr-2 size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{role.name}</span>
              </div>
              <TooltipProvider delayDuration={50}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1  w-fit">
                      {Object.keys(role.permissions).map((permission) => {
                        if (role.permissions[permission] === true)
                          return (
                            <div
                              key={permission}
                              className="flex size-2 items-center rounded-full bg-primary"
                            ></div>
                          );
                      })}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-card">
                    <div className="flex flex-col gap-2">
                      <span className="text-foreground text-sm">Permissions</span>
                      {Object.keys(role.permissions).map((permission) => {
                        if (role.permissions[permission] === true)
                          return (
                            <div key={permission} className="flex items-center gap-1">
                              <div className="flex size-2 items-center rounded-full bg-primary"></div>
                              <span className="capitalize text-muted-foreground text-xs">
                                {permission}
                              </span>
                            </div>
                          );
                      })}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex w-full items-center  justify-end gap-1">
                {!role.isLocked && (
                  <>
                    <UpdateRoleSheet
                      role={role}
                      open={open}
                      onOpenChange={setOpen}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => setOpen(true)}
                    >
                      <Icons.pencil
                        className="size-5 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Button>

                    <Icons.trash
                      className="size-5 text-red-400"
                      aria-hidden="true"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
          <button className="flex items-center justify-between rounded-lg bg-background p-4 text-muted-foreground shadow-sm h-20" onClick={() => addRole({subdomain})}>
            <div className="flex items-center">
              <div className="flex items-center">
                <Icons.plus className="mr-2 size-4 " aria-hidden="true" />
                <span className="capitalize">Add role</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
