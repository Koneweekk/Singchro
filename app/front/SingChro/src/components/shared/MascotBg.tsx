// 태그 import
import { Image, StyleSheet, Dimensions } from 'react-native';

// Stlye
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  backImg:{
    ...StyleSheet.absoluteFillObject,
    width:"100%",
    minHeight:"100%",
    height:windowHeight,
    opacity: 0.15,
    resizeMode:"cover"
  },
});

// Component
const MascotBg = ({ImgUrl}:{ImgUrl:number}):JSX.Element => {
  return (
    <Image
      source={ImgUrl}
      style={styles.backImg}
    />
)}

export default MascotBg