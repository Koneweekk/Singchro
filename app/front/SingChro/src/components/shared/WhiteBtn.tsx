// 태그 import
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// 스타일 import 
import { basicShadow } from "@styles/shadowStyles";

// Props
interface Props {
  btnText: string;
  btnFunc: Function;
  width?: number;
}

// 스타일
const styles = StyleSheet.create({
  btn: {
    height:50,
    backgroundColor: "white",
    paddingHorizontal: 10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    ...basicShadow
  },
  btnText: {
    color:"black",
    fontSize: 20,
    fontWeight:"bold",
  },
});

// 구성요소
const WhiteBtn = ({btnText, btnFunc, width}:Props):JSX.Element => {

  const btnWidth = width? width: 80
  return (
  <>
    <TouchableOpacity 
      style={{...styles.btn, width:`${btnWidth}%`}}
      activeOpacity={0.3}
      onPress={() => btnFunc()}
    >
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  </>
)}

export default WhiteBtn