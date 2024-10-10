import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import spacing from '../constants/spacing';

const cateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.medium,
        justifyContent: 'center',
      },
        categoryItem: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: spacing.medium,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        },
        categoryImage: {
          width: 50,
          height: 50,
          resizeMode: 'contain',
          marginRight: spacing.medium,
        },
        categoryName: {
          fontSize: spacing.medium,
          color: colors.black,
        },
      
});

export default cateStyles;
