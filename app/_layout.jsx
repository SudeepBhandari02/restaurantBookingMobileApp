import { Stack } from "expo-router";
import "../global.css";
export default function Layout (){
  return (
      <Stack
        screenOptions={{
            headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)"/>
      </Stack>
  )
}
