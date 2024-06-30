import { useTheme } from "next-themes"
import Image from "next/image"


interface LogoProps {
    size: "small" | "full"
    }
export const Logo = ({size} : LogoProps) => {

    const {theme} = useTheme()

    if (theme === "dark") {
        if(size === "full") return (<Image src="/logo-white.svg" alt="Knowingly" className="h-8" />)
        else return ( <Image src="/logo-small-white.svg" alt="Knowingly" className="h-8" /> )
    } else if (theme === "light") {
        if(size === "full") return (<Image src="/logo-black.svg" alt="Knowingly" className="h-8" />)
        else return ( <Image src="/logo-small-black.svg" alt="Knowingly" className="h-8" /> )
    }

}
