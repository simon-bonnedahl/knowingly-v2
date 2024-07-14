import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from "@knowingly/backend/convex/_generated/api"
import { Input } from '~/components/Input';
import { HubCard } from '~/components/HubCard';


export default function Discover() {

  const hubs = useQuery(api.hubs.getHubs)


  return (
    <View className='p-4 flex flex-col gap-4'>
    <Input placeholder="Search for a hub" />
    <ScrollView  >
      {hubs?.map((hub) => (
        <HubCard hub={hub}  key={hub._id}/>
        
       
        
        ))}
       
      
    </ScrollView>
    </View>
  );
}
