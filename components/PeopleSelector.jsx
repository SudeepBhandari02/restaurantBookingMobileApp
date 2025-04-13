import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const PeopleSelector = ({peopleSelected,setPeopleSelected}) => {

    const decrCounter = ()=>{
        if(peopleSelected > 1) setPeopleSelected(peopleSelected-1);
    }
    const incrCounter = ()=>{
        setPeopleSelected(peopleSelected+1);
    }

  return (
    <View className={"mx-1 flex-1 flex-row items-center bg-[#474747] rounded-lg"}>
      <TouchableOpacity onPress={decrCounter} className={" flex-1 border-2 border-gray-600 rounded-l-lg p-1"}>
          <Text className={"text-2xl text-white text-center"}>-</Text>
      </TouchableOpacity>
      <Text className={"text-xl text-white px-4"}>{" "}{peopleSelected}{" "}</Text>
      <TouchableOpacity onPress={incrCounter} className={" flex-1 border-2 border-gray-600 rounded-r-lg p-1"}>
          <Text className={"text-2xl text-white text-center"}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PeopleSelector;