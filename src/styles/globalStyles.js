import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import spacing from '../constants/spacing';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: colors.textPrimary,
    fontFamily: fonts.bold,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: spacing.medium,
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  orText: {
    textAlign: 'center',
    marginVertical: spacing.small,
    color: colors.black,
  },
  googleIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  categoryText: {
    fontWeight: 'bold',
    color: '#333',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  floatingButton: {
    backgroundColor: 'green',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  floatingIcon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 23,
    marginLeft: 25,
    marginBottom: 10,
    color: 'black',
    marginTop: 25,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 23,
    marginLeft: 30,
    marginVertical: 20,
    color: 'black',
  },
});

export default globalStyles;
