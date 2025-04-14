import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    TouchableWithoutFeedback
} from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import colors from "../../assets/themeColors";
import frame from "../../assets/images/Frame.png";
import { Formik } from "formik";
import validationSchema from "../../validation/validationSchema";
import {useRouter} from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import asyncStorage from "@react-native-async-storage/async-storage";

const signup = () => {
    const [iconName, setIconName] = useState("eye");
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const auth = getAuth();
    const db = getFirestore();
    const router = useRouter();

    const handleSignin =async (values) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth,values.email, values.password);
            const user = userCredentials.user;
            const userDoc =await  getDoc(doc(db,"users",user.uid));
            if(userDoc.exists()){
              await asyncStorage.setItem("userEmail",values.email);
              await asyncStorage.setItem("userGuest","false");
              router.push("/home");
            }
        }catch (e){
            console.log(e);
            if(e.code==="auth/invalid-credential"){
                Alert.alert("Sign in Failed!","Wrong credentials",[{text:"OK"}]);
            }
            else{
                Alert.alert("Sign in Failed!","Account not found",[{text:"OK"}]);
            }
        }
    };
    const toggleIconName = ()=>{
        if(iconName === "eye"){
            setIconName("eye-with-line");
            setPasswordVisibility(false);
        }else{
            setIconName("eye");
            setPasswordVisibility(true);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.SECONDARY }}>
            <ScrollView
                style={{ height: "100%" }}
                contentContainerStyle={{ justifyContent: "center" }}
            >
                <View className={"flex items-center justify-center"}>
                    <Image
                        source={logo}
                        style={{
                            width: 400,
                            height: 200,
                        }}
                    />

                    <View className={"w-3/4 flex  items-center justify-center"}>
                        <Text className="text-lg text-center text-white  font-semibold mb-10">
                            Let's get you started
                        </Text>

                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSignin}
                        >
                            {({
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  values,
                                  errors,
                                  touched,
                              }) => (
                                <View className="w-full">
                                    <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                                    <TextInput
                                        className="h-16 border border-white text-white rounded px-2"
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                        value={values.email}
                                        onBlur={handleBlur("email")}
                                    />

                                    {touched.email && errors.email && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.email}
                                        </Text>
                                    )}
                                    <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                                    <View className="h-16 border border-white text-white rounded px-2 flex flex-row justify-between items-center">
                                        <TextInput className={"flex-1 text-white"}
                                                   secureTextEntry={passwordVisibility}
                                                   onChangeText={handleChange("password")}
                                                   value={values.password}
                                                   onBlur={handleBlur("password")}
                                        />
                                        <TouchableWithoutFeedback className={"p-2"} onPress={toggleIconName}>
                                            <Entypo name={iconName} size={28} color={colors.PRIMARY} />
                                        </TouchableWithoutFeedback>
                                    </View>

                                    {touched.password && errors.password && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.password}
                                        </Text>
                                    )}

                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        className="p-2 my-2 bg-[#f49b33]  text-black rounded-lg mt-10"
                                    >
                                        <Text className="text-lg font-semibold text-center">
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    </View>

                    <View className={"flex flex-row items-center justify-center my-3"}>
                        <Text
                            className={"text-center mr-2"}
                            style={{ color: colors.dark.text }}
                        >
                            New user?
                        </Text>
                        <TouchableOpacity onPress={() => router.push("/signup")}>
                            <Text
                                className={"font-semibold text-xl"}
                                style={{ color: colors.PRIMARY }}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className={"flex-1 mt-10 "}>
                        <Image source={frame} resizeMode={"contain"} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default signup;
