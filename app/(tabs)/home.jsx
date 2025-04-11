import {Image, ImageBackground, ScrollView, Text, View} from "react-native";
import colors from "../../assets/themeColors"
import {SafeAreaView} from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png"
import banner from "../../assets/images/homeBanner.png"
import {BlurView} from "@react-native-community/blur";

export default function Home(){
const col = "#2b2b2b";
    return (
        <SafeAreaView style={{backgroundColor:colors.SECONDARY}}>
            <View>
                <View className={`bg-[#2b2b2b] px-4 py-8 `}>
                    <View className={"flex-row gap-2 p-2  rounded-xl items-center bg-gray-700"}>
                        <Text className={"text-white font-semibold tracking-wider ml-2 text-lg"}>Welcome to</Text>
                        <Image resizeMode={"cover"} className={" w-24 h-14"} source={logo}/>
                    </View>
                </View>
            </View>
            <ScrollView>
                <ImageBackground resizeMode={"cover"} source={banner} className={"w-full h-44 my-1 justify-center items-center"}>
                        <Text className={"text-white text-xl bg-gray-500 bg-opacity-50"}>Book a table for your loved ones</Text>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}