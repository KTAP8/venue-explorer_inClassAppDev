import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import { Card, Text, Avatar } from "react-native-paper";
import venueStyles from "./VenueStyles";
import { Button, FlatList, useWindowDimensions, View } from "react-native";

export default function VenueCatalog() {
  const [venueData, setVenueData] = useState<VenueItem[]>([]);
  const { height, width } = useWindowDimensions();
  const SM_SCREEN = 576;
  const MD_SCREEN = 768;
  const numColumns = width < SM_SCREEN ? 1 : width < MD_SCREEN ? 2 : 3;

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const response = await fetch(
        "https://4aa5-104-196-207-47.ngrok-free.app/get_venues",
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const json: VenueJson = await response.json();
        setVenueData(json.all_venues);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        <Button title="Book this venue"></Button>
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
