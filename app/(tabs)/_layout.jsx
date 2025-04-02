import {Tabs} from "expo-router";
import Home from "./home";
import Profile from "./profile";

export default function TabsLayout(){
    return(
        <Tabs>
            <Tabs.Screen 
            name="home" 
            title="Home" 
            options={{
            headerShown:false
            }
            }
            />
            <Tabs.Screen 
            name="history" 
            title="History" 
            options={{
                headerShown:false
                }}
            />
            <Tabs.Screen 
            name="profile" 
            title="Profile" 
            options={{
                headerShown:false
                }}
            />
        </Tabs>
    )
}