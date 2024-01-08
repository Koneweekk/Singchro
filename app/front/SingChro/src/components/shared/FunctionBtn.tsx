// 태그 import
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// 스타일 import 
import { shadows } from "@styles/shadowStyles";

// Props
interface Props {
  btnText: string;
  btnFunc: Function;
  width?: number;
}

// 스타일
const styles = StyleSheet.create({
  btn: {
    marginVertical:15,
    backgroundColor: '#5667FD',
    color: "white",
    padding: 12,
    ...shadows.btn
  },
  btnText: {
    color:"white",
    fontSize: 20,
    fontWeight:"bold",
  },
});

// 구성요소
const FunctionBtn = ({btnText, btnFunc, width}:Props):JSX.Element => {
  const btnWidth = width? width: 80
  return (
  <>
    <TouchableOpacity 
      style={{...styles.btn, width:`${btnWidth}%`}}
      activeOpacity={0.5}
      onPress={() => btnFunc()}
    >
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  </>
)}

export default FunctionBtn