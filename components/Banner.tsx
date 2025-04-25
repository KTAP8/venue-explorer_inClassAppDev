import { Image, View, Text } from "react-native";
import venueStyles from "./VenueStyles";
import { ThemedView } from "./ThemedView";

export default function Banner() {
  return (
    <ThemedView style={venueStyles.bannerContainer}>
      <Image
        source={require("@/assets/images/cover.jpg")}
        style={venueStyles.bannerImg}
        resizeMode="cover"
      ></Image>
      <View style={venueStyles.bannerTextContainer}>
        <Text style={venueStyles.bannerTextTitle}>
          where every event finds its venue
        </Text>
        <Text style={venueStyles.bannerTextSnippet}>
          Finding the perfect venue has never been easier. Whether it's a
          wedding, corporate event, or private party, we connect people to the
          perfect place
        </Text>
      </View>
    </ThemedView>
  );
}
