
import { Image, Text,  TouchableOpacity, View } from "react-native";
import {  router } from "expo-router";
import { Ent } from "@knowingly/backend/convex/types";


export const HubCard = ({hub}: {hub : Ent<"hubs">}) => {



    return(
        <View className="w-full">
        <TouchableOpacity onPress={()=> router.push("/(hub)/" + hub.subdomain)}>
                <Image source={{uri: hub.banner}} width={330} height={180} className="object-cover rounded-md w-full"/>

        </TouchableOpacity>
        <View className="mt-2 flex w-full items-center justify-between">
            <View className="flex w-full flex-col">
                <Text className="font-cal my-0 truncate text-xl font-bold tracking-wide text-foreground">
                    {hub.name}
                </Text>
             

                <Text className=" line-clamp-1 text-sm font-normal leading-snug text-foreground">
                {hub.description}
                </Text>
            </View>
            </View>

        </View>
    )

}


{/* <div className="group relative gap-2">
<Link href={`${process.env.NEXT_PUBLIC_PROTOCOL}://${url}`}>
  <div className="w-full transform-gpu  shadow-md duration-150 ease-in-out hover:scale-[1.01] hover:shadow-xl">
    <BlurImage
      alt={hub.name ?? "Card thumbnail"}
      width={500}
      height={400}
      className="aspect-video w-full  rounded-md object-cover"
      src={hub.banner ?? "/placeholder.png"}
      placeholder="blur"
      blurDataURL={hub.bannerBlurhash ?? placeholderBlurhash}
    />
  </div>
</Link>

<div className="mt-2 flex w-full items-center justify-between">
  <div className="flex w-full flex-col">
    <div className="flex w-full items-center justify-between">
      <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide text-black dark:text-white">
        {hub.name}
      </h3>
      <a
        href={`${process.env.NEXT_PUBLIC_PROTOCOL}://${url}`}
        rel="noreferrer"
        className="flex items-center gap-1 truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
      >
        {truncate(url, 20)} <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>

    <p className=" line-clamp-1 text-sm font-normal leading-snug  text-black dark:text-white">
      {hub.description}
    </p>
  </div>
</div>
</div> */}