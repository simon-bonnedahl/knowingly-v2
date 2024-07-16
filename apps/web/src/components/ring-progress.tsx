import { cn } from "~/lib/utils";

interface RingProgressProps {
    value: number;
    max?: number;
    radius?: number;
    className?: string;
    }
export const RingProgress = ({ value, max = 100, radius=10, className="" }: RingProgressProps) => {
    const circumference = 2 * Math.PI * radius
    if(value > max) value = max
    return(
        <div
      x-data="scrollProgress"
      className={cn("flex  w-8 h-8 items-center justify-center", className)}
    >
      <svg className="w-full h-full  transform -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="15"
          cy="15"
        />
        <circle
          className="text-primary"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (value / max) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="15"
          cy="15"
        />
      </svg>
    </div>
    )
}
