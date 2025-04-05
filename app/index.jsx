import {View, Text, Button} from 'react-native';
import {useRouter} from "expo-router";


export default function Index() {
  const router = useRouter();
  return (
    <View
      className="flex-1 items-center justify-start pt-4 bg-gray-100 dark:bg-gray-500  ">
      <Text className=" text-4xl  text-cyan-500 tracking-wider font-bold">Sign up and sign in page</Text>
        <Button title="Go to home" onPress={() => {router.push("/home")}} />
    </View>
  );
}
