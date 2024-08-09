import { Icon as IconType } from "@knowingly/backend/convex/types";
import { Icon } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import Image from "next/image";

/**
 * Props for rendering an icon.
 *
 * @param size - The size of the icon in rem.
 */
interface RenderIconProps {
    icon: IconType;
    className?: string;
    size?: number
}


export const RenderIcon = ({ icon, className, size=1 }: RenderIconProps) => {

   
    return(
        <div className={cn(`flex items-center justify-center`, className )} style={{
            width: size + "rem",
            height: size + "rem",
        }}>

            {icon.type === "URL" && (
              <Image
                src={icon.value}
                width={100}
                height={100}
                alt="icon"
                className="size-full rounded-full object-cover"
              />
            )}
            {icon.type === "EMOJI" && (
              <span className={`select-none`} style={{
                fontSize: size*0.9 + "rem",
                lineHeight: size*0.9 + "rem"
              }}>
                {icon.value}
              </span>
            )}
            {icon.type === "ICON" && (
              <Icon name={icon.value} className="size-full" />
            )}
            </div>
    )

}