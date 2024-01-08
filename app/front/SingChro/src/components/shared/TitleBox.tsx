// 모듈 import
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';

// 스타일
const styles = StyleSheet.create({
  headr: {
    height: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom:"5%"
  },
  titleTxt: {
    color:"black",
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold",
  },
  smallTxt: {
    color:"black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

// 컴포넌트
const TitleBox = ({title, small}:{title:string, small?:string}):JSX.Element => {
  return (
    <View style={styles.headr}>
      <Text style={styles.titleTxt}>{title}</Text>
      <Text style={styles.smallTxt}>{small}</Text>
    </View>
  )
}
export default TitleBox