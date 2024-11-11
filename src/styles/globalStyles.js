import {StyleSheet} from 'react-native';
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
  ShippingAddressContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ShippingAddressContent: {
    padding: spacing.medium,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding:spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    padding:spacing.medium
  },
  defaultLabel: {
    fontSize: 14,
    color: colors.primary,
    textAlign:'right',
    padding:spacing.small

  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
    marginTop: 3,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  imageReview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  renderItemReview: {
    flexDirection: 'row',
  },
  nameReview: {
    marginTop: 20,
  },
  priceReview: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  renderStarReview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateReview: {
    right: 10,
    position: 'absolute',
  },
  cardReview:{
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: '90%',  // Chiều rộng chiếm 90% màn hình
    alignSelf: 'center', // Căn giữa theo chiều ngang
    marginTop:10
  },
  containerSetting:{
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  sectionSetting:{
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000', //đặt màu cho bóng
    shadowOffset: {width: 0, height: 2},//vị trí bóng đổ
    shadowOpacity: 0.1,//độ mờ
    shadowRadius: 8,//độ lan
    elevation: 1,//chiều cao của phần tử so với nền bóng đổ
  },
  sectionTitleSetting:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoContainerSetting:{
    marginBottom: 15,
  },
  labelSetting:{
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  inputSetting:{
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  switchSetting:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerAddress:{
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  headingAddress:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputAddress:{
    marginBottom: 16,
    marginLeft: 5,
  },
  switchContainerAddress:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonAddress:{
    backgroundColor: '#00aaff',
    padding: 8,
  },
  pickerContainerAddress:{
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  pickerAddress:{
    height: 50,
    width: '100%',
  },
  inputContainerAddress:{
    backgroundColor: colors.background,
    borderRadius: 5,
    height: 70,
    marginBottom: 16,
  },
  labelAddress:{
    marginLeft: 5,
    marginTop: 5,
    fontSize: 12,
    justifyContent:'flex-end'
  },

  
});

export default globalStyles;