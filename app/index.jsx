import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png"
import frame from "../assets/images/Frame.png"
import {StatusBar} from "expo-status-bar";
import colors from "../assets/themeColors"
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {
  const router = useRouter();

  const handleGuest = async () =>{
      await AsyncStorage.setItem("userGuest", "true");
      await AsyncStorage.removeItem("userEmail");
      router.push("/home");
  }

  return (
    <SafeAreaView style={{backgroundColor:colors.SECONDARY}} >
      <ScrollView  style={{height:'100%'}} contentContainerStyle={{justifyContent:'center'}}>
        <View>
            <View className={"w-3/4 p-4"}>
              <Image source={logo} style={{
                 width: 400,height:300
             }}/>
            </View>

            <View>
              <TouchableOpacity className={"w-3/4 p-3 self-center rounded-lg my-3"} style={{backgroundColor:colors.PRIMARY}} onPress={() => router.push("/signup")}>
                 <Text className={"text-2xl font-semibold text-center"}>Sign Up</Text>
              </TouchableOpacity>

             <TouchableOpacity className={"w-3/4 p-3 self-center border-2 rounded-lg my-3"} style={{borderColor:colors.PRIMARY}} onPress={handleGuest} >
                 <Text className={"text-2xl font-medium text-center"} style={{color:colors.PRIMARY}}>Guest User</Text>
             </TouchableOpacity>

             <View className={"justify-center my-3"}>
                 <Text className={"text-center color-white"} style={{color:colors.dark.text}}>
                     <View className={"border-b mb-2 w-24"}
                     style={{borderColor:colors.PRIMARY}}/>
                     {" "}  or {" "}
                     <View className={"border-b mb-2 w-24"}
                           style={{borderColor:colors.PRIMARY}}/>
                 </Text>
             </View>

             <View className={"flex flex-row items-center justify-center my-3"}>
                 <Text className={"text-center mr-2"} style={{color:colors.dark.text}}>Already a user?</Text>
                 <TouchableOpacity onPress={() => router.push("/signin")}>
                   <Text className={"font-semibold text-xl"} style={{color:colors.PRIMARY,}}>Login</Text>
                 </TouchableOpacity>
             </View>

             <View className={"flex-1 mt-20 "}>
                 <Image source={frame} resizeMode={"contain"}/>
             </View>
            </View>
        </View>
      </ScrollView>
        <StatusBar barStyle="light-content" backgroundColor={colors.SECONDARY} />
    </SafeAreaView>
  );
}


