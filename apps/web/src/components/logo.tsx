import { cn } from "@knowingly/ui"
import { useTheme } from "next-themes"
import Image from "next/image"


interface LogoProps {
    size: "small" | "full"
    className ?: string
    theme: string
    }
export const Logo = ({size, className, theme} : LogoProps) => {


    if (theme === "dark") {
        if(size === "full") return (<Image src="/logo-white.svg" alt="Knowingly" width={200} height={100} className={cn(className, "h-8")}/>)
        else return ( <Image src="/logo-small-white.svg" alt="Knowingly" width={100} height={100} className={cn(className, "h-8")}/> )
    } else if (theme === "light") {
        if(size === "full") return (<Image src="/logo-black.svg" alt="Knowingly"  width={200} height={100}className={cn(className, "h-8")}/>)
        else return ( <Image src="/logo-small-black.svg" alt="Knowingly" width={100} height={100} className={cn(className, "h-8")}/> )
    }

}
