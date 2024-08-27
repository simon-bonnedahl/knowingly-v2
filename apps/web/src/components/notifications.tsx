import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import type { Ent } from "@knowingly/backend/convex/types";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";
import { Separator } from "@knowingly/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@knowingly/ui/sheet";
import { formatDate } from "@knowingly/utils";

export const Notifications = () => {
  const [open, setOpen] = useState(false);

  const notifications = useQuery(api.notifications.list);

  const unRead = notifications?.filter((notification) => !notification.read);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        className="flex items-center gap-3 rounded-md bg-transparent px-4  py-2 text-sm font-normal text-foreground transition-all duration-150 ease-in-out hover:bg-card"
        onClick={() => setOpen(true)}
      >
        <Icons.bell className="h-5 w-5" />
        Notifications
        {unRead && unRead.length > 0 && (
          <span className="rounded-full border border-gray-500 bg-primary px-2 text-xs font-normal text-primary-foreground">
            {unRead?.length}
          </span>
        )}
      </button>
      <SheetContent side={"left"} className="bg-card p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col  py-4">
          {notifications?.map((notification) => (
            <div key={notification._id}>
              <Notification notification={notification} setOpen={setOpen} />
              <Separator />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Notification = ({
  notification,
  setOpen,
}: {
  notification: Ent<"notifications">;
  setOpen: (open: boolean) => void;
}) => {
  const markAsRead = useMutation(api.notifications.markAsRead);

  const router = useRouter();
  const onClick = () => {
    setOpen(false);
    void markAsRead({ id: notification._id });
    router.push(notification.actionPath);
  };
  return (
    <button
      className="flex w-full flex-col gap-2 p-4 hover:bg-background"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            notification.read ? "opacity-0" : "opacity-100",
            "h-2 w-2 rounded-full bg-primary",
          )}
        />

        <Avatar className="size-6">
          <AvatarImage src={notification.icon} alt={notification.title} />
        </Avatar>

        <h3 className="text-start text-sm font-medium">{notification.title}</h3>
      </div>

      <div className="pl-12 text-start">
        <p className="text-xs">{notification.body}</p>
      </div>

      <div className="flex w-full justify-end">
        <p className="text-xs text-muted-foreground">
          {formatDate(notification._creationTime)}
        </p>
      </div>
    </button>
  );
};
