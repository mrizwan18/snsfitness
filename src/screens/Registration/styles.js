import { StyleSheet } from "react-native";
import { FacilityCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: FacilityCard.container,
  formContainer: FacilityCard.formContainer,
  h1: FacilityCard.h1,
  h2: FacilityCard.h2,
  h3: FacilityCard.h3,
  h4: FacilityCard.h4,
  input: FacilityCard.input,
  button: FacilityCard.button,
  listText: {
    fontSize: 14,
    marginTop: 5,
    padding: 4,
    fontWeight: "bold",
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  label: FacilityCard.label,
  formInput: FacilityCard.formInput,
});

export default styles;
