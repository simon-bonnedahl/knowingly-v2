import { useState } from "react";
import Image from "next/image";

import { Icon as IconType } from "@knowingly/backend/convex/types";
import { Icon } from "@knowingly/icons";
import { cn } from "@knowingly/ui";

/**
 * Props for rendering an icon.
 *
 * @param size - The size of the icon in rem.
 */
interface RenderIconProps {
  icon: IconType;
  className?: string;
  size?: number;
  id?: string;
}

export const RenderIcon = ({ icon, className, size = 1, id }: RenderIconProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      id={id}
      className={cn(`flex items-center justify-center`, className)}
      style={{
        width: size + "rem",
        height: size + "rem",
      }}
    >
      {icon.type === "URL" && (
        <Image
          className={cn(
            "transform transition duration-300",
            isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
            "size-full rounded-full object-cover",
          )}
          onLoad={() => setLoading(false)}
          src={icon.value}
          width={100}
          height={100}
          loading="lazy"
          decoding="async"
          alt="Icon"
          blurDataURL={icon.value}
        />
      )}
      {icon.type === "EMOJI" && (
        <span
          className={`select-none`}
          style={{
            fontSize: size * 0.9 + "rem",
            lineHeight: size * 0.9 + "rem",
          }}
        >
          {icon.value}
        </span>
      )}
      {icon.type === "ICON" && <Icon name={icon.value} className="size-full" />}
    </div>
  );
};
