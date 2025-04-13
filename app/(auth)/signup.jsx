import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback, Alert,
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
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signup = () => {
  const [iconName, setIconName] = useState("eye");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const handleSignUp =async (values) => {
    try {
      console.log("inside try block")
      const userCredential = await createUserWithEmailAndPassword(auth,values.email,values.password);
      const user = userCredential.user;
      await setDoc(doc(db,"users",user.uid),{
        email:values.email,
        createdAt:new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
      router.push("/home");
    }catch (e) {
      console.log(e)
      if(e.code==="auth/email-already-in-use"){
        Alert.alert("Sign Up Failed!","Email already in use",[{text:"OK"}]);
      }else{
        Alert.alert("Sign Up Failed!","Unknown error occurred",[{text:"OK"}]);
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
              onSubmit={handleSignUp}
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
                      Sign Up
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
              Already a user?
            </Text>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text
                className={"font-semibold text-xl"}
                style={{ color: colors.PRIMARY }}
              >
                Login
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
