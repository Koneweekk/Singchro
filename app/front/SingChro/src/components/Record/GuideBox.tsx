// 모듈 import
import { View, Text, ScrollView } from "react-native";
import { StyleSheet  } from 'react-native';

// 스타일
const styles = StyleSheet.create({
  guideBox:{
    marginHorizontal:"5%",
    marginVertical:"5%",
    paddingHorizontal:"5%",
    paddingVertical:"5%",
    width:"85%",
    height:"30%",
  },
  guideScroll: {
    flexGrow: 1,
    justifyContent:"center",
    alignItems: "center",
  },
  guideTxt: {
    marginBottom: 20,
    color:"black",
    fontSize: 20,
    fontWeight:"bold"
  },
});

// 컴포넌트
const GuideBox = ():JSX.Element => {
  return (
    <View style={styles.guideBox}>
      <ScrollView contentContainerStyle={styles.guideScroll} >
        <Text style={styles.guideTxt}>1. 웬만하면 노래를 불러주세요</Text>
        <Text style={styles.guideTxt}>2. 음역대가 다양하면 좋습니다.</Text>
        <Text style={styles.guideTxt}>3. 3분 이상의 녹음이 필요합니다.</Text>
        <Text style={styles.guideTxt}>4. 소음이 없는 환경이 좋습니다.</Text>
      </ScrollView>
    </View>
  )
}
export default GuideBox