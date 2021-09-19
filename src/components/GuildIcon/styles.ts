import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 62,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
  },
  image: {
    width: 62,
    height: 66,
  }
});