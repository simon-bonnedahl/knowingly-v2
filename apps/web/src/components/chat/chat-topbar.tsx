import { Info, Phone, Video } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@knowingly/ui/avatar';
import { cn } from '@knowingly/ui';
import { buttonVariants } from '@knowingly/ui/button';
import type { FunctionReturnType } from 'convex/server';
import { api } from '@knowingly/backend/convex/_generated/api';

interface ChatTopbarProps {
    user: FunctionReturnType<typeof api.users.get>;
    }
    
    export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];


export default function ChatTopbar({user}: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={user?.imageUrl}
              alt={user?.name}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.name}</span>
            <span className="text-xs">Active 2 mins ago</span>
          </div>
        </div>

        <div>
          {TopbarIcons.map((icon, index) => (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <icon.icon size={20} className="text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
  )
}
