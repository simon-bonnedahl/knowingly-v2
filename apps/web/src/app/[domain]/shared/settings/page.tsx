"use client";

import { use, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Input } from "@knowingly/ui/input";
import { Button } from "@knowingly/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function SettingsGeneralPage() {
  const user = useQuery(api.users.getMe);
  const [name, setName] = useState(user?.name);
  const updateUser = useMutation(api.users.update);
  const deleteUser = useMutation(api.users.deleteUser);
  const { signOut } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const onChangeName = () => {
    if (!user || !name || name === user.name) return;
    toast.promise(
      updateUser({
        id: user._id,
        field: "name",
        value: name,
      }),
      {
        loading: "Updating name...",
        success: "Success: Name updated",
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  };

  const onDelete = () => {
    if (!user) return;
    toast.promise(
      deleteUser({
        id: user._id,
      }),
      {
        loading: "Deleting account...",
        success: ( ) => {
          void signOut()
          return "Success: Account deleted";
        },
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            General
          </h1>
        </div>
        <div className="rounded-lg border bg-background">
          <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
            <h2 className="font-cal text-xl text-foreground">Name </h2>
              <Input
                placeholder=""
                maxLength={20}
                className="resize-none"
                onBlur={onChangeName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </div>
        </div>
        <form className="rounded-lg border border-red-500 bg-background">
          <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
            <h2 className="font-cal text-xl text-foreground">Delete account</h2>
           
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <p className="text-center text-sm text-muted-foreground">
              This action is irreversible. Please proceed with caution.
            </p>
              <Button
                variant={"destructive"}
                size={"sm"}
                type="submit"
                onClick={onDelete}
              >
                Delete
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
