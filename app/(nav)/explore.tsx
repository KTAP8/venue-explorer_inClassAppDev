import { StyleSheet, Image, Platform, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "./_layout";
import Animated from "react-native-reanimated";
import VenueBookForm from "@/components/VenueBookForm";
import venueBookStyles from "@/components/VenueBookStyles";

export default function TabTwoScreen() {
  const { selectedVenue, setSelectedVenue } = useAppContext();
  return (
    <ThemedView style={venueBookStyles.mainContainer}>
      <Animated.ScrollView>
        <ThemedView style={venueBookStyles.content}>
          <ThemedText type="subtitle">
            Selected Venue is: {selectedVenue}
          </ThemedText>
          <VenueBookForm preSelectedVenueId={selectedVenue} />
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
