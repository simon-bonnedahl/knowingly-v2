import { useState } from "react";
import { IconBell } from "@tabler/icons-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@knowingly/ui/sheet";

import { cn } from "~/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Ent } from "@knowingly/backend/convex/types";
import Link from "next/link";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";
import { formatDate } from "~/lib/dateUtils";


export const Notifications = () => {
  const [open, setOpen] = useState(false);

  const notifications = useQuery(api.notifications.list);

  const unRead = notifications?.filter((notification) => !notification.read);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="flex items-center gap-3 rounded-md bg-transparent px-4  py-2 text-sm font-normal text-foreground transition-all duration-150 ease-in-out hover:bg-card"
          onClick={() => setOpen(!open)}
        >
          <IconBell className="h-5 w-5" />
          Notifications
          {unRead && unRead.length > 0 && (
            <span className="rounded-full border border-gray-500 bg-primary px-2 text-xs font-normal text-primary-foreground">
              {unRead?.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {notifications?.map((notification, index) => (
            <Notification notification={notification} key={index} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Notification = ({ notification }: { notification: Ent<"notifications"> }) => {
  console.log(notification);
  return (
    <Link  href={notification.actionPath} className="flex flex-col gap-2 border-b border-border py-2">
      {!notification.read && (
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      )}
      {notification.icon && (
        <Avatar>
        <AvatarImage src={notification.icon} alt={notification.title} />
      </Avatar>
      )}
    
      <h3 className="text-sm font-semibold">{notification.title}</h3>
      <p className="text-xs">{notification.body}</p>
      <p className="text-xs">{formatDate(notification._creationTime)}</p>
    </Link>
  );
};
