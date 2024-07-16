import { cn } from ".";

interface StatusProps {
    children: React.ReactNode;
    className?: string;
    variant ?: "default" | "primary" 
    color?: "bg-blue-500" | "bg-green-500" | "bg-red-500" | "bg-yellow-500"; 
}
export const Status = ({ children, className, variant="default", color="bg-green-500" }: StatusProps) => {
    if(variant === "default") 
    return (
        <div
            className={cn(
                `flex items-center space-x-2 text-xs font-normal ${color} bg-opacity-30  rounded-full px-2 py-0.5 `,
                className,
               
            )}
        >
            <span className={`w-2 h-2 rounded-full ${color}` } />
            <span >{children}</span>
        </div>
    );

   return(
    <div
            className={cn(
                `flex items-center space-x-2 text-sm font-normal bg-primary/30 rounded-full px-2 py-0.5 `,
                className,
               
            )}
        >
            <span className={`w-2 h-2 rounded-full bg-primary` } />
            <span >{children}</span>
        </div>

   )
   
}