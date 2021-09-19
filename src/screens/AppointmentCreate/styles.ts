import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    color: theme.colors.heading,
  },
  select: {
    flexDirection: 'row',
    width: '100%',
    height: 68,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 25,
  },
  selectImage: {
    width: 64,
    height: 68,
    backgroundColor: theme.colors.secondary40,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: -2,
  },
  selectBody: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  formField: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  formColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formFieldDivider: {
    marginHorizontal: 4,
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    color: theme.colors.highlight,
  },
  formFieldHint: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight
  },
  footer: {
    marginVertical: 20,
    marginBottom: 56,
  }
});