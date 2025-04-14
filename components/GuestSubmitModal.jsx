import {Alert, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Formik} from "formik";
import {Ionicons} from "@expo/vector-icons";
import guestValidation from "../validation/guestFormValidation";
import {addDoc, collection,} from "firebase/firestore";
import {db} from "../configurations/firebaseConfig";


const GuestModalSubmit = ({visible,setModalVisible,selectedSlot,date,peopleSelected,restaurant}) =>{


    const handleFormSubmit = async (values) =>{
        try {
            await addDoc(collection(db, "guestBookings"), {
                ...values,
                slot: selectedSlot,
                date: date.toISOString(),
                guests: peopleSelected,
                restaurant: restaurant,
            });
            setModalVisible(false);
            Alert.alert("Slot Booked","Booking was successful",[{text:"OK"}]);
        }catch (e) {
            Alert.alert("Error Occurred","Try Again Later !",[{text:"OK"}]);
        }
    }

    const handleCloseModal = ()=>{
        setModalVisible(false);
    }
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            style={{
                flex: 1,
                justifyContent: "flex-end",
                margin: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            <View className="flex-1 bg-[#00000080] justify-end">
                <View className="bg-[#474747] mx-4 rounded-t-lg p-4 pb-6">
                        <Formik
                            initialValues={{ fullName: "", phoneNumber: "" }}
                            validationSchema={guestValidation}
                            onSubmit={handleFormSubmit}
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
                                    <View>
                                        <Ionicons
                                            name="close-sharp"
                                            size={30}
                                            color={"#f49b33"}
                                            onPress={handleCloseModal}
                                        />
                                    </View>
                                    <Text className="text-[#f49b33] mt-4 mb-2">Name</Text>
                                    <TextInput
                                        className="h-15 border border-white text-white rounded px-2"
                                        onChangeText={handleChange("fullName")}
                                        value={values.fullName}
                                        onBlur={handleBlur("fullName")}
                                    />

                                    {touched.fullName && errors.fullName && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.fullName}
                                        </Text>
                                    )}
                                    <Text className="text-[#f49b33] mt-4 mb-2">
                                        Phone Number
                                    </Text>
                                    <TextInput
                                        className="h-15 border border-white text-white rounded px-2"
                                        onChangeText={handleChange("phoneNumber")}
                                        value={values.phoneNumber}
                                        onBlur={handleBlur("phoneNumber")}
                                    />

                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.phoneNumber}
                                        </Text>
                                    )}

                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        className="p-2 my-2 bg-[#f49b33]  text-black rounded-lg mt-10"
                                    >
                                        <Text className="text-lg font-semibold text-center">
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>

                </View>
            </View>
        </Modal>
    )
}

export default GuestModalSubmit;