import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Pressable,Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../configurations/firebaseConfig";
import colors from "../../assets/themeColors";
import CarouselSlider from "../../components/carouselSlider";
import {Ionicons} from "@expo/vector-icons";
import DatePickerComponent from "../../components/DatePickerComponent";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Restaurant= () => {
    const [restaurantData, setRestaurantData] = useState({});
    const [carouselData, setCarouselData] = useState({});
    const [slotsData, setSlotsData] = useState({});
    const [date, setDate] = useState(new Date());
    const {restaurant} = useLocalSearchParams();





    const getDataFromDB = async  () =>{
        try{
            const restaurantQuery = query(collection(db,"restaurants"),where("name","==",restaurant));

            const restaurantSnapshot = await getDocs(restaurantQuery);

            if(restaurantSnapshot.empty){
                console.log("No matching restaurant found");
                return;
            }
            for(const doc of restaurantSnapshot.docs){
                const restaurantData = doc.data();
                console.log(restaurantData);
                setRestaurantData(restaurantData);

                const carousalQuery = query(collection(db,"carousels"),where("res_id","==",doc.ref));
                const carouselSnapshot = await getDocs(carousalQuery);
                const carouselImages = [];
                if (carouselSnapshot.empty) {
                    console.log("No matching carousel found");
                    return;
                }
                carouselSnapshot.forEach((carouselDoc) => {
                    carouselImages.push(carouselDoc.data());
                });
                console.log(carouselImages);
                setCarouselData(carouselImages);

                const slotsQuery = query(
                    collection(db, "slots"),
                    where("ref_id", "==", doc.ref)
                );
                const slotsSnapshot = await getDocs(slotsQuery);
                const slots = [];
                if (carouselSnapshot.empty) {
                    console.log("No matching slots found");
                    return;
                }
                slotsSnapshot.forEach((slotDoc) => {
                    slots.push(slotDoc.data());
                });
                console.log(slots);
                setSlotsData(slots[0]?.slot);
            }
            // console.log(restaurantData,carouselData,slotsData);
        }catch (e){
            console.log(e);
        }
    }

    useEffect(()=>{getDataFromDB()},[]);

    return (
        <SafeAreaView style={{flex: 1,backgroundColor:colors.SECONDARY}}>
            <View className={"mx-4 gap-3 mt-2"}>
                <Text className={"text-2xl"} style={{color:colors.PRIMARY}}>{restaurant}</Text>
                <View className={"border-b"} style={{borderColor:colors.PRIMARY}}/>
            </View>
            <View className={"mt-4 "}>
                {(Object.keys(carouselData).length > 0)?<CarouselSlider data={carouselData}/>:<ActivityIndicator size={"large"} color={colors.PRIMARY}/>}
            </View>

            <View className={"flex flex-row justify-between p-6 w-full"}>
                <View className={"flex flex-row items-center w-[40%] gap-1"}>
                    <Ionicons name={"location-sharp"} size={30} color={colors.PRIMARY}/>
                    <Text className={"text-gray-400"}>{restaurantData.address}</Text>
                </View>
                <Pressable onPress={ ()=> Alert.alert("This feature will be added soon") } className={"flex flex-row" +
                    " items-center w-[50%]" +
                    " gap-1" +
                    " justify-end"}>
                    <Text className={"underline underline-offset-4 text-white text-xl"}>Get Direction</Text>
                    <Ionicons name="navigate" size={30} color={colors.PRIMARY} />
                </Pressable>
            </View>

            <View className={"flex flex-row justify-center items-center gap-2 w-full my-4"}>
                <FontAwesome6 name="clock-four" size={24} color={colors.PRIMARY} />
                <Text className={"text-center font-semibold text-2xl"} style={{color:colors.dark.text}}>Opens : {restaurantData.opening} - Closes : {restaurantData.closing}</Text>
            </View>

            <View className={"flex flex-row items-center justify-center gap-4 p-2 w-full"}>
                <Text className={"text-lg text-white font-semibold"}>Book A Date : </Text>
                <DatePickerComponent date={date} setDate={setDate} />
            </View>


        </SafeAreaView>


    );
};

export default Restaurant;

