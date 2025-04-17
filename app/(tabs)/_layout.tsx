import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/Context/themeContext";
export default function TabLayout() {
  
  const {theme} = useTheme();  
  return(
    <Tabs screenOptions={{tabBarShowLabel:false,headerShown:false,tabBarActiveTintColor:theme.text,tabBarStyle:{backgroundColor:theme.background,position:'absolute',paddingBottom:'40'}}}>
      <Tabs.Screen name="home" options={{tabBarIcon: ({size,color}) => <Ionicons name="home" size={size} color={color} /> }}/>
      <Tabs.Screen name ="profile" options={{tabBarIcon: ({size,color})=> <Ionicons name="person-circle" size={size} color={color}/>}}/>
    </Tabs>
  ) ;
}
