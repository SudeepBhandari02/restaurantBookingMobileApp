import {Text, View} from "react-native";
import colors from "../../assets/themeColors"

export default function Home(){

    return(
        <View className={`bg-[${colors.dark.background}] `}>
            <Text>Home</Text>
        </View>
    )
}