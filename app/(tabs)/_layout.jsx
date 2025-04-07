import { Tabs } from "expo-router";
import Colors from "../../assets/themeColors.js";
import {Ionicons} from "@expo/vector-icons";

export default function TabsLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.dark.text,
        tabBarStyle: {
          backgroundColor: Colors.SECONDARY,
          height: 60,
          paddingBottom: 20,
        },
          tabBarLabelStyle: {
            fontWeight: "bold",
              fontSize: 10,
        }
        }
      }
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
            tabBarIcon: ({ color }) => (
                <Ionicons name={"home"} color={color}
                size={20}  />
            )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
            tabBarIcon: ({ color }) => (
                <Ionicons name="time" size={20} color={color}/>
            )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
            tabBarIcon: ({ color }) => (
                <Ionicons name={"person"} color={color} size={20}/>
            )
        }}
      />
    </Tabs>
  );
}
