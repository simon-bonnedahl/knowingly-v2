"use client";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import type { Ent } from "@knowingly/backend/convex/types";
import { api } from "@knowingly/backend/convex/_generated/api";
import {  Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@knowingly/ui/tooltip";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { UpdateRoleSheet } from "./update-role-sheet";
import { RenderIcon } from "~/components/icon-picker/render-icon";

export default function AdminRolesPage() {
  const [open, setOpen] = React.useState(false);
  const [roleToEdit, setRoleToEdit] = React.useState<Ent<"roles">>();
  const subdomain = useSubdomain();
  const roles = useQuery(api.hubs.getRoles, { subdomain });
  const addRole = useMutation(api.roles.create);
  const removeRole = useMutation(api.roles.remove);

  const onAddRole = () => {
    toast.promise(addRole({ subdomain }), {
      loading: "Creating role...",
      success: "Success: Role created",
      error: (error) => {
        return `Error: ${error.data}`;
      },
    });
  };

  return (
    <>
      {roleToEdit && (
        <UpdateRoleSheet role={roleToEdit} open={open} onOpenChange={setOpen} />
      )}
      <div className="flex max-w-screen-xl flex-col space-y-12  py-2">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-cal text-3xl font-bold text-foreground">
              Roles
            </h1>
          </div>
          <div className="flex w-full flex-col gap-1">
            {roles?.map((role) => (
              <div
                key={role._id}
                className="grid min-h-20 p-4 grid-cols-3 items-center justify-between rounded-lg bg-background  shadow-sm"
              >
                <div className="flex items-center">
                <RenderIcon icon={role.icon} size={1}  className="mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">{role.name}</span>
                </div>
                <TooltipProvider delayDuration={50}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex w-fit items-center  gap-1">
                        {Object.keys(role.permissions).map((permission) => {
                          if (
                            role.permissions[
                              permission as keyof typeof role.permissions
                            ] === true
                          )
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
                        <span className="text-sm text-foreground">
                          Permissions
                        </span>
                        {Object.keys(role.permissions).map((permission) => {
                          if (
                            role.permissions[
                              permission as keyof typeof role.permissions
                            ] === true
                          )
                            return (
                              <div
                                key={permission}
                                className="flex items-center gap-1"
                              >
                                <div className="flex size-2 items-center rounded-full bg-primary"></div>
                                <span className="text-xs capitalize text-muted-foreground">
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
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => {
                          setRoleToEdit(role);
                          setOpen(true);
                        }}
                      >
                        <Icons.pencil
                          className="size-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </Button>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => {
                          toast.promise(removeRole({ roleId: role._id }), {
                            loading: "Removing role...",
                            success: "Success: Role removed",
                            error: (error) => {
                              return `Error: ${error.data}`;
                            },
                          });
                        }}
                      >
                        <Icons.trash
                        className="size-5 text-red-400"
                        aria-hidden="true"
                      />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <button
              className="flex h-20 items-center justify-between rounded-lg bg-background p-4 text-muted-foreground shadow-sm"
              onClick={onAddRole}
            >
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
    </>
  );
}
