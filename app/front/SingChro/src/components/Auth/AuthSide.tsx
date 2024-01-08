// 태그 import
import { View, Text, StyleSheet } from "react-native";

// props 정의
interface Props {
  txt1: string;
  fn1: Function;
  txt2 ?: string;
  fn2 ?: Function;
}

// 흰색 입력창 스타일
const styles = StyleSheet.create({
  addBox:{
    width:"75%",
    flexDirection:"row-reverse",
    justifyContent: "space-between",
    marginTop: "7%",
    marginBottom: "8%"
  },
  addText: {
    color: "darkblue",
    fontSize:18,
    fontWeight:"bold"
  }
});

// 컴포넌트 구현
const AuthSide = ({txt1, fn1, txt2, fn2} : Props):JSX.Element => {
  return (
    // 회원 추가 기능 구현
    <View style={styles.addBox}>
      <Text style={styles.addText} onPress={() => fn1()}> {txt1}</Text>
      {fn2 && <Text style={styles.addText} onPress={() => fn2()}> {txt2}</Text>}
    </View>
  )
}

export default AuthSide