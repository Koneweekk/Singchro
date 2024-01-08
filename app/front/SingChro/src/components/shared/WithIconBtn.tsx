// 태그 import
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// 스타일 import 
import { basicShadow } from "@styles/shadowStyles";

// Props
interface Props {
  btnText: string;
  btnFunc: Function;
  icon: number,
  width?: number;
}

// 스타일
const styles = StyleSheet.create({
  btn: {
    height:60,
    backgroundColor: '#DDE1FF',
    paddingHorizontal: 20,
    marginBottom:40,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderRadius:10,
    ...basicShadow
  },
  btnText: {
    color:"black",
    fontSize: 20,
    fontWeight:"bold",
  },
  btnIcon: {
    height: 35,
    aspectRatio:1,
    resizeMode:"cover",
  }
});

// 구성요소
const WithIconBtn = ({btnText, btnFunc, width, icon}:Props):JSX.Element => {

  const btnWidth = width? width: 80
  return (
  <>
    <TouchableOpacity 
      style={{...styles.btn, width:`${btnWidth}%`}}
      activeOpacity={0.5}
      onPress={() => btnFunc()}
    >
      <Text style={styles.btnText}>{btnText}</Text>
      <View>
        <Image source={icon} style={styles.btnIcon}/>
      </View>
    </TouchableOpacity>
  </>
)}

export default WithIconBtn