import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Link href={'/home'} ><Text style={{color:'white'}}>Edit app/index.tsx to edit this.</Text></Link>
      <StatusBar style="light" backgroundColor="#000" />
      
    </View>
  );
}
