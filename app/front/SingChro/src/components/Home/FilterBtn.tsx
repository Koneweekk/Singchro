// 태그 import
import { TouchableOpacity, StyleSheet, Image } from "react-native";
// 함수 import
import { axiosAuthed } from "@functions/axiosFunc";
import { resetToken } from "@functions/authFunc";
// 네비게이션 import
import { NavigationProp } from '@react-navigation/native';
// 스타일 import 
import { basicShadow } from "@styles/shadowStyles";

// props 정의
interface Props {
  icon: number,
  choosed: boolean,
  action: Function
}

// 스타일 정의
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal:5,
    paddingVertical:10,
    justifyContent:"center",
    alignItems:"center",
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    ...basicShadow
  },
  btnIcon: {
    height: "100%", // Image 컴포넌트의 가로 크기를 100%로 설정
    aspectRatio: 1, // 가로세로 비율을 유지하기 위해 필요한 설정
    resizeMode:"cover"
  },
});

// 구현 코드 정의
const FilterBtn = ({icon, choosed, action}: Props):JSX.Element => {
  return (
    <TouchableOpacity 
      style={{
        ...styles.btn,
        height: choosed? 50 : 35,
        width: choosed? 65 : 50,
        backgroundColor: choosed? "#DDE1FF" : "white"
      }}
      activeOpacity={0.3}
      onPress={() => action()}
    >
      <Image source={icon} style={styles.btnIcon}/>
    </TouchableOpacity>
)}

export default FilterBtn