"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@knowingly/ui";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";

export default function HubAdminNav() {
  const segment = useSelectedLayoutSegment();
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);

  const navItems = [
    {
      name: "Dashboard",
      href: `/admin`,
      segment: null,
    },
    {
      name: "Members",
      href: `/admin/members`,
      segment: "members",
    },
    {
      name: "Invites",
      href: `/admin/invites`,
      segment: "invites",
    },
    {
      name: "Requests",
      href: `/admin/requests`,
      segment: "requests",
    },
    {
      name: "Templates",
      href: `/admin/templates`,
      segment: "templates",
    },
    {
      name: "Meetings",
      href: `/admin/meetings`,
      segment: "meetings",
    },
    {
      name: "Roles",
      href: `/admin/roles`,
      segment: "roles",
    },
    {
      name: "Emails",
      href: `/admin/emails`,
      segment: "emails"
      },
  ];

  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.querySelector(
        `a[href="${navItems.find((item) => item.segment === segment)?.href}"]`
      );
      if (activeItem) {
        setIndicatorStyle({
          width: `${activeItem.offsetWidth}px`,
          left: `${activeItem.offsetLeft - 15}px`,
        });
      }
    }
  }, [segment]);

  return (
    <div className=" flex space-x-4 border-b sticky bg-card top-0 z-20 pt-4 pb-1 px-2" ref={navRef}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "relative px-2 py-1 text-sm font-medium",
         
          )}
        >
          {item.name}
        </Link>
      ))}
      {segment !== "settings" && (
        <div
        className="absolute bottom-0 h-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      />
      )}
      <Link href="/admin/settings">
      <Button variant={segment === "settings" ? "outline" : "ringHover"} size="icon" className={cn("rounded-full absolute right-2 top-1 ", segment === "settings" && "border-primary border-2")} >
        <Icons.settings className="w-5 h-5 text-muted-foreground" />
      </Button>
      </Link>
    </div>
  );
}
