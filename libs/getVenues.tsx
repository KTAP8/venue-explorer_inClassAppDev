export default function getVenues({
  setVenueData,
}: {
  setVenueData: Function;
}) {
  const fetchVenue = async () => {
    try {
      const response = await fetch(
        "https://0a43-34-86-105-84.ngrok-free.app/get_venues",
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
  fetchVenue();
}
