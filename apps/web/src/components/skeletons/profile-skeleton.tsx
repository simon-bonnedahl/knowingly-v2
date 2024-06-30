import { Skeleton } from "@knowingly/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="flex w-full flex-1 items-center space-x-2 px-1 py-1.5">
      <Skeleton className="h-8 w-8 rounded-full bg-gray-100" />
      <Skeleton className="h-8 flex-grow bg-gray-100" />
    </div>
  );
}
