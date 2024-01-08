// 태그 import
import { Image, StyleSheet, Dimensions } from 'react-native';

// Stlye
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  Img:{
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
    width:"100%",
    height:"100%",
    opacity:0.8,
    resizeMode:"cover"
  },
});

// Component
const MascotBottom = ():JSX.Element => {
  return (
    <Image
      source={require("@assets/images/mascot2.jpg")}
      style={styles.Img}
    />
)}

export default MascotBottom