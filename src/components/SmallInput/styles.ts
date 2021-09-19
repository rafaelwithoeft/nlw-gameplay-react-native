import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: 'center',
  },
});