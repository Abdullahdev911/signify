import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return(
    <Tabs screenOptions={{tabBarShowLabel:false, headerShown:false,tabBarActiveTintColor:'white',tabBarStyle:{backgroundColor:'black',position:'absolute',paddingBottom:'40',borderTopWidth:1,borderColor:'grey'}}}>
      <Tabs.Screen name="home" options={{tabBarIcon: ({size,color}) => <Ionicons name="home" size={size} color={color} /> }}/>
      <Tabs.Screen name ="profile" options={{tabBarIcon: ({size,color})=> <Ionicons name="person-circle" size={size} color={color}/>}}/>

    </Tabs>
  ) ;
}
