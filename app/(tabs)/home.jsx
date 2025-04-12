import {ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, Text, View} from "react-native";
import colors from "../../assets/themeColors"
import {SafeAreaView} from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png"
import banner from "../../assets/images/homeBanner.png"
//import uploadData from "../../configurations/firebaseDataUpload";
import {useEffect, useState} from "react";
import {db} from "../../configurations/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home(){

    const [restaurants, setRestaurants] = useState([]);
    // useEffect(() => {   //use this function while uploading data to database in the beginning
    //     uploadData();
    // },[]);
const createListItem = ({item}) =>(
    <View className={"bg-gray-500 p-6  gap-2 rounded-xl w-60 shadow-2xl "} style={{elevation:20}}>
        <Image source={{uri:item.image}} resizeMode={"cover"} className={"h-36 rounded-xl "} />
        <Text className={"font-semibold text-center text-lg"}>{item.name}</Text>
        <Text >{item.address}</Text>
        <Text className={"text-sm text-gray-400"}>{`Opens : ${item.opening} - Closes: ${item.closing}`}</Text>
    </View>
);
    const getData = async () => {
        console.log("inside getData - 1")
        const q= query(collection( db ,"restaurants"));
        const res = await getDocs(q);
        console.log("inside getData - 2");
        res.forEach((item) => {
            setRestaurants((prev) => [...prev, item.data()]);
        });
    }

    useEffect(()=>{
        console.log("inside useEffect");
        getData();
    },[]);

    return (
        <SafeAreaView style={{backgroundColor:colors.SECONDARY,paddingBottom:100}}>
            <View>
                <View className={`bg-[#2b2b2b] px-4 pt-8 pb-2 `}>
                    <View className={"flex-row gap-2 p-1 pl-4  rounded-xl items-center bg-gray-700"}>
                        <Text className={"text-white font-semibold tracking-wider ml-2 text-lg"}>Welcome to</Text>
                        <Image resizeMode={"cover"} className={" w-24 h-16"} source={logo}/>
                    </View>
                </View>
            </View>
            <ScrollView stickyHeaderIndices={[0]}>
                <ImageBackground resizeMode={"cover"} source={banner} className={"w-full h-44 justify-center" +
                    " items-center"} style={{backgroundColor:colors.SECONDARY}}>
                        <Text className={"text-white text-xl p-1 bg-gray-500 bg-opacity-50"}>Book a table for your loved ones</Text>
                </ImageBackground>
                <Text className={"text-white mt-10 mx-10 text-2xl"} style={{marginLeft:15}}>Special Discount %</Text>
                { restaurants.length > 0?(
                <FlatList data={restaurants} renderItem={createListItem} horizontal={true} contentContainerStyle={{backgroundColor:colors.SECONDARY,gap:20,padding:20}}/>) :
                (<ActivityIndicator size={"large"} animating={true} color="white" />)
                }
                <Text style={{marginLeft:15,color:colors.PRIMARY,fontSize:25}}>Our Restaurants</Text>
                { restaurants.length > 0?(
                        <FlatList data={restaurants} renderItem={createListItem} horizontal={true} contentContainerStyle={{backgroundColor:colors.SECONDARY,gap:20,padding:20}}/>) :
                    (<ActivityIndicator size={"large"} animating={true} color="white" />)
                }
            </ScrollView>
        </SafeAreaView>
    )
}