import { cn } from ".";


function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted-foreground border", className)}
      {...props}
    />
  );
}

export { Skeleton };
