import { Tabs } from "expo-router";
import React, { useContext, useState, createContext } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";

const AppContext = createContext<{
  selectedVenue: string;
  setSelectedVenue: Function;
} | null>(null);
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppContext.Provider");
  }
  return context;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [selectedVenue, setSelectedVenue] = useState("");

  if (Platform.OS === "web")
    return (
      <AppContext.Provider value={{ selectedVenue, setSelectedVenue }}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{ title: "Home" }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="explore"
            options={{ title: "Explore" }}
          ></Drawer.Screen>
        </Drawer>
      </AppContext.Provider>
    );

  return (
    <AppContext.Provider value={{ selectedVenue, setSelectedVenue }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </AppContext.Provider>
  );
}
