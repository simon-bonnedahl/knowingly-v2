import { Text, TouchableOpacity, View } from "react-native";
import {
    DropDown,
    DropDownContent,
    DropDownItem,
    DropDownItemSeparator,
    DropDownLabel,
    DropDownTrigger,
  } from './DropDown';
import { Button } from "./Button";
import { Calendar, Compass, MessageSquare } from 'lucide-react-native';


export const Header = () => {

    return (
        <View className="flex w-full h-36 justify-center items-center">
        <Text className="text-3xl" >Header</Text>
        <DropDown>
    <DropDownTrigger>
        <Button label="Open Dropdown" />
    </DropDownTrigger>
    <DropDownContent>
    <DropDownLabel labelTitle="My Account" />
    <DropDownItemSeparator />
    <DropDownItem>
    <TouchableOpacity className="flex flex-row gap-2 items-center">
        <Calendar  size={18} color='#fff'/>
        <Text className="text-primary text-xl">Profile</Text>
    </TouchableOpacity>
    </DropDownItem>
    <DropDownItem>
    <TouchableOpacity className="flex flex-row gap-2 items-center">
        <Compass  size={18} color="#fff" />
        <Text className="text-primary text-xl">Settings</Text>
    </TouchableOpacity>
    </DropDownItem>
  
    <DropDownLabel labelTitle="Team" />
    <DropDownItemSeparator />
    <DropDownItem>
    <TouchableOpacity className="flex flex-row gap-2 items-center">
        <MessageSquare size={18} color="#fff" />
        <Text className="text-primary text-xl">Billing</Text>
    </TouchableOpacity>
    </DropDownItem>
    </DropDownContent>
</DropDown>

        </View>
    );

}