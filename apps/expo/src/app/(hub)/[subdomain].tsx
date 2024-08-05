import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useQuery, useMutation } from 'convex/react';
import WebView from "react-native-webview";
import { Editor } from "~/components/editor/Editor";


export default function HubPage() {
  const { user } = useUser();
  const { subdomain } = useLocalSearchParams();

  const hub = useQuery(api.hubs.getHub, { subdomain: subdomain as string });
  const pages = useQuery(api.pages.getPagesByHub, { subdomain: subdomain as string});

  const updateHub = useMutation(api.hubs.update);

  

  const onChange = async (content: any) => {
    if(!hub) return;
    await updateHub({
      subdomain: hub.subdomain,
      field: "content",
      value: JSON.stringify(content),
    });
  };


  return (
    <View>
      <SignedIn>
        <Text>Hello this is {hub?.name}</Text>

        {hub?.content && (
           <View className="w-full h-full p-4">
           <Editor initialContent={hub?.content} onChange={onChange}  />
   
           </View>
        )}
       
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}