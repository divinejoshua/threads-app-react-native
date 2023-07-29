import { FontAwesome } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={23} style={{ marginBottom: -3, }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      /> 
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
       <Tabs.Screen
        name="createpost"
        options={{
          title: "",
          href: "/createpost",
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />
       <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart-o" color={color} />,
        }}
        
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
