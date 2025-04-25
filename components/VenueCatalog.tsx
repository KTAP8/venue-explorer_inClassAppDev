import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import { Card, Text, Avatar } from "react-native-paper";
import venueStyles from "./VenueStyles";
import { Button, FlatList, useWindowDimensions, View } from "react-native";
import { useAppContext } from "@/app/(nav)/_layout";
import getVenues from "@/libs/getVenues";
import { router } from "expo-router";

export default function VenueCatalog() {
  const [venueData, setVenueData] = useState<VenueItem[]>([]);
  const { selectedVenue, setSelectedVenue } = useAppContext();
  const { height, width } = useWindowDimensions();
  const SM_SCREEN = 576;
  const MD_SCREEN = 768;
  const numColumns = width < SM_SCREEN ? 1 : width < MD_SCREEN ? 2 : 3;

  useEffect(() => {
    getVenues({ setVenueData: setVenueData });
  }, []);

  const renderCardData = ({ item }: { item: VenueItem }) => (
    <Card style={venueStyles.cardItem}>
      <Card.Title
        title={item.name}
        subtitle={`${item.dailyrate} Baht`}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={require("@/assets/images/logo.png")}
          ></Avatar.Image>
        )}
      ></Card.Title>
      <Card.Content>
        <Text variant="bodyMedium">
          {item.address} {item.district} {item.province} {item.postalcode}
        </Text>
      </Card.Content>
      <Card.Cover
        source={{ uri: `data:image/jpeg;base64,${item.picture}` }}
      ></Card.Cover>
      <Card.Actions>
        <Button
          title="Book this venue"
          color="#9b59b6"
          onPress={() => {
            setSelectedVenue(item._id);
            router.replace("/explore");
          }}
        ></Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View>
      {venueData.length > 0 ? (
        <FlatList
          data={venueData}
          keyExtractor={(item) => item._id}
          renderItem={renderCardData}
          numColumns={numColumns}
          key={numColumns} //re-render when flatlist numColumns changes
          contentContainerStyle={venueStyles.cardContainer}
          scrollEnabled={false}
        ></FlatList>
      ) : (
        <ThemedText> There are {venueData.length} venues.</ThemedText>
      )}
    </View>
  );
}
