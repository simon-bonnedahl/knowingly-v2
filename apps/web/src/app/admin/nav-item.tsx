'use client';


import { cn } from '@knowingly/ui';
import { Tooltip, TooltipContent, TooltipTrigger } from '@knowingly/ui/tooltip';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();


  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', segments[0] === href.replace("/", "") && 'bg-accent text-foreground'
          )}
        >
          {children}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}