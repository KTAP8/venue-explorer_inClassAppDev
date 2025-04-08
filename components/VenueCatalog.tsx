import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
export default function VenueCatalog() {
  const [venueData, setVenueData] = useState<VenueItem[]>([]);

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const response = await fetch(
        "https://b039-35-221-16-53.ngrok-free.app/get_venues",
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

  return <ThemedText> There are {venueData.length} venues.</ThemedText>;
}
