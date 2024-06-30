import { cn } from "~/lib/utils";
import { IconBell } from "@tabler/icons-react";
import { useState } from "react";

const notifications = [
  {
    title: "New user registered",
    description: "A new user has registered on your platform",
    time: "3 minutes ago",
  },
  {
    title: "New user registered",
    description: "A new user has registered on your platform",
    time: "3 minutes ago",
  },
  {
    title: "New user registered",
    description: "A new user has registered on your platform",
    time: "3 minutes ago",
  },
  {
    title: "New user registered",
    description: "A new user has registered on your platform",
    time: "3 minutes ago",
  },
  {
    title: "New user registered",
    description: "A new user has registered on your platform",
    time: "3 minutes ago",
  },
];
export const Notifications = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center rounded-md py-2 px-4 gap-3  transition-all duration-150 ease-in-out text-foreground hover:bg-card bg-transparent text-sm font-normal"
        onClick={() => setOpen(!open)}
      >
        <IconBell className="w-5 h-5" />
        Notifications
      </button>
      <div
        className={cn(
          "absolute w-0 left-[18vw] flex flex-col top-0 h-screen bg-background transform duration-500 ease-in-out  ",
          open
            ? "w-full translate-x-0 flex -z-30 border-l "
            : "-translate-x-full z-30 "
        )}
      >
        {open &&
          notifications.map((notification, index) => (
            <Notification notification={notification} key={index} />
          ))}
      </div>
    </>
  );
};

 const Notification = ({ notification }: { notification: any }) => {
    return(
        <div className="flex flex-col gap-2 p-4 border-b border-border">
        <h3 className="font-semibold text-lg">{notification.title}</h3>
        <p className="text-sm">{notification.description}</p>
        <p className="text-xs text-gray-400">{notification.time}</p>
      </div>
    )
 
};
