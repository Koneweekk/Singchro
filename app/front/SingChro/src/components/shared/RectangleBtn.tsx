// 태그 import
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// 스타일 import 
import { shadows } from "@styles/shadowStyles";

// Props 정의
interface Props {
  btnFunc: Function;
  btnTxt: string;
  imgUrl: number;
}

// 스타일 정의
const styles = StyleSheet.create({
  btn: {
    height:"100%",
    width: "45%",
    backgroundColor: "white",
    padding: 10,
    ...shadows.btn
  },
  btnIcon: {
    height: "70%", // Image 컴포넌트의 가로 크기를 100%로 설정
    aspectRatio: 1, // 가로세로 비율을 유지하기 위해 필요한 설정
    resizeMode:"cover"
  },
  btnTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15
  },
});

// 구현 코드 정의
const RectangleBtn = ({btnFunc, btnTxt, imgUrl}:Props):JSX.Element => {
  return (
    <TouchableOpacity 
      style={styles.btn}
      activeOpacity={0.4}
      onPress={() => btnFunc()}
    >
      <Image source={imgUrl} style={styles.btnIcon}/>
      <Text style={styles.btnTxt}>{btnTxt}</Text>
    </TouchableOpacity>
)}

export default RectangleBtn