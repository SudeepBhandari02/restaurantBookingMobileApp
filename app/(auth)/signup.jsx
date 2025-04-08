import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import colors from "../../assets/themeColors";
import frame from "../../assets/images/Frame.png";
import {Formik} from "formik";
import validationSchema from "../../validation/validationSchema";

const signup = () => {
    const handleSubmit = ()=>{
        Alert.alert("Account Created Sucessfully!");
    }

  return (
    <SafeAreaView style={{backgroundColor:colors.SECONDARY}}>
        <ScrollView style={{height:'100%'}} contentContainerStyle={{justifyContent:'center'}}>
            <View className={"flex items-center justify-center"}>
                <Image source={logo} style={{
                    width: 400,height:200
                }}/>

                <View className={"w-3/4 flex  items-center justify-center"}>
                    <Text className="text-lg text-center text-white  font-semibold mb-10">
                        Let's get you started
                    </Text>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
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
                                <TextInput
                                    className="h-16 border border-white text-white rounded px-2"
                                    secureTextEntry
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    onBlur={handleBlur("password")}
                                />

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




                <View className={"flex-1 mt-20 "}>
                    <Image source={frame} resizeMode={"contain"}/>
                </View>

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default signup;