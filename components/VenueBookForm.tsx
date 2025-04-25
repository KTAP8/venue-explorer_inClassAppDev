import { ThemedView } from "./ThemedView";
import { useEffect, useState } from "react";
import getVenues from "@/libs/getVenues";
import { Picker } from "@react-native-picker/picker";
import venueBookStyles from "./VenueBookStyles";
import { useWindowDimensions, TextInput, Button } from "react-native";
import { ThemedText } from "./ThemedText";
import { DatePickerModal } from "react-native-paper-dates";
import addBooking from "@/libs/addBooking";
import { format } from "date-fns";

export default function VenueBookForm({
  preSelectedVenueId,
}: {
  preSelectedVenueId: string;
}) {
  const SM_SCREEN = 576;
  const { height, width } = useWindowDimensions();
  const [venueData, setVenueData] = useState<VenueItem[]>([]);
  const [venueId, setVenueId] = useState(preSelectedVenueId);
  const [email, setEmail] = useState("");
  const [nameLastname, setNameLastname] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState("");
  const [bookResponse, setBookResponse] = useState<
    BookingResponseJson | undefined
  >(undefined);
  useEffect(() => {
    setVenueId(preSelectedVenueId);
  }, [preSelectedVenueId]);

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const onDatePickerConfirm = (params: { date: Date | undefined }) => {
    setShowDatePicker(false);
    setBookingDate(params.date);
  };

  const handleBookingSubmit = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 0);
    if (venueId.trim() === "") {
      setInvalidMsg("Please select venue");
    } else if (email.trim() === "" || !isValidEmail) {
      setInvalidMsg("Please enter invalid email address");
    } else if (nameLastname.trim() === "") {
      setInvalidMsg("Please enter name-lastname");
    } else if (!bookingDate || bookingDate === undefined) {
      setInvalidMsg("Please select booking date");
    } else if (bookingDate <= today) {
      setInvalidMsg("Booking date must be later than today");
    } else {
      setInvalidMsg("");
    }

    if (invalidMsg === "") {
      const booking: bookingItem = {
        email: email,
        name_lastname: nameLastname,
        booking_date:
          bookingDate != undefined ? format(bookingDate, "dd-MM-yyyy") : "",
      };
      addBooking({
        venueId: venueId,
        bookItem: booking,
        setResponse: setBookResponse,
      });
      setEmail("");
      setNameLastname("");
      setBookingDate(undefined);
    }
  };

  return (
    <ThemedView style={{ width: width > SM_SCREEN ? "50%" : "auto" }}>
      <Picker
        selectedValue={venueId}
        onValueChange={(value) => setVenueId(value)}
        dropdownIconColor="#4654eb"
        style={venueBookStyles.picker}
      >
        {venueData.map((venueItem) => (
          <Picker.Item
            label={venueItem.name}
            value={venueItem._id}
            key={venueItem._id}
          ></Picker.Item>
        ))}
      </Picker>
      <ThemedText style={venueBookStyles.label}>Email: </ThemedText>
      <TextInput
        value={email}
        onChangeText={(inputText: string) => {
          setEmail(inputText);
          setIsValidEmail(validateEmail(inputText));
          console.log(isValidEmail);
        }}
        style={venueBookStyles.input}
        placeholder="enter email address"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      ></TextInput>
      {email && !isValidEmail ? (
        <ThemedText style={venueBookStyles.invalidWarn}>
          Please enter a valid email
        </ThemedText>
      ) : (
        <ThemedText></ThemedText>
      )}
      <ThemedText style={venueBookStyles.label}>Name-Lastname: </ThemedText>
      <TextInput
        value={nameLastname}
        onChangeText={setNameLastname}
        style={venueBookStyles.input}
        placeholder="enter name-lastname"
        placeholderTextColor="#999"
      ></TextInput>
      <ThemedView style={{ marginVertical: 20, width: "50%" }}>
        <Button
          title="Select Booking Date"
          color="#8d97fc"
          onPress={() => setShowDatePicker(true)}
        ></Button>
      </ThemedView>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={showDatePicker}
        onDismiss={() => setShowDatePicker(false)}
        date={bookingDate}
        onConfirm={onDatePickerConfirm}
      ></DatePickerModal>
      <ThemedText>
        Booking Date: {bookingDate ? bookingDate.toDateString() : "None"}
      </ThemedText>
      <ThemedView style={{ marginVertical: 20 }}>
        <Button
          title="Book this Venue"
          color="#4654eb"
          onPress={handleBookingSubmit}
        ></Button>
      </ThemedView>
      <ThemedText style={venueBookStyles.invalidWarn}>{invalidMsg}</ThemedText>
      <ThemedText type="subtitle">
        {bookResponse != undefined ? bookResponse.message : ""}
      </ThemedText>
    </ThemedView>
  );
}
