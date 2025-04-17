import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {useTheme} from '../Context/themeContext.js'

export default function Index() {

  const {theme} = useTheme(); 
return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Link href={'/home'} ><Text style={{color:theme.text}}>Edit app/index.tsx to edit this.</Text></Link>
      
      
    </View>
  );
}
