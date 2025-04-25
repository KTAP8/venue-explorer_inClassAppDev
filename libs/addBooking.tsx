export default function addBooking({
  venueId,
  bookItem,
  setResponse,
}: {
  venueId: string;
  bookItem: bookingItem;
  setResponse: Function;
}) {
  const postBooking = async () => {
    try {
      console.log("POST body:", {
        venueId: venueId,
        booking_date: bookItem.booking_date,
        email: bookItem.email,
        name_lastname: bookItem.name_lastname,
      });
      const response = await fetch(
        "https://d703-104-196-207-47.ngrok-free.app/add_booking",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            venueId: venueId,
            booking_date: bookItem.booking_date,
            email: bookItem.email,
            name_lastname: bookItem.name_lastname,
          }),
        }
      );

      if (response.ok) {
        const json: BookingResponseJson = await response.json();
        setResponse(json);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  postBooking();
}
