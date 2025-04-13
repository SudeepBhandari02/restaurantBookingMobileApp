import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FindSlots = ({
                       slots,
                       selectedSlot,
                       setSelectedSlot, // optional callback
                   }) => {
    const [slotsVisible, setSlotsVisible] = useState(false);

    const handlePress = () => {
        setSlotsVisible(!slotsVisible);
    };

    const handleSlotPress = (slot) => {
        if (selectedSlot === slot) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(slot);
        }
    };

    return (
        <View className="flex-1">
            <View className={`flex ${selectedSlot ? "flex-row" : ""}`}>
                <View className={`${selectedSlot ? "flex-1" : ""}`}>
                    <TouchableOpacity onPress={handlePress}>
                        <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                            Find Slots
                        </Text>
                    </TouchableOpacity>
                </View>
                {selectedSlot && (
                    <View className="flex-1">
                        <TouchableOpacity >
                            <Text className="text-center text-white text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                                Book Slot
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {slotsVisible && (
                <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg">
                    {slots.length === 0 ? (
                        <Text className="text-white mx-2">No slots available</Text>
                    ) : (
                        slots.map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                className={`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${
                                    selectedSlot && selectedSlot !== slot ? "opacity-50" : ""
                                }`}
                                onPress={() => handleSlotPress(slot)}
                                disabled={selectedSlot && selectedSlot !== slot}
                            >
                                <Text className="text-white font-bold">{slot}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};

export default FindSlots;
