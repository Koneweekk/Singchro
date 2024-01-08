// 태그 import
import { View, Text, StyleSheet } from "react-native"
// 상태정보 import
import { useRecoilState } from "recoil";
import { chooseVoiceState } from "@states/featureState";
// 스타일 import
import { basicShadow } from "@styles/shadowStyles"

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 60,
    justifyContent:"center",
    alignItems: "center",
    marginBottom: "10%",
    paddingHorizontal: 20,
    backgroundColor:"white",
    borderRadius: 10,
    ...basicShadow
  },
  itemBox:{
    width: "100%",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
  },
  itemTxt: {
    color:"black",
    fontSize: 20,
    fontWeight: "bold",
  }
})

// 컴포넌트 정의
const PickedVoiceItem = ():JSX.Element => {
  // 상태정보 - 현재 선택한 voice 모델
  const [ chooseVoice ] = useRecoilState(chooseVoiceState);

  // 구현
  return (
      <View style={styles.container}>
        {chooseVoice.id !== 0?
          <View style={styles.itemBox}>
            <Text style={styles.itemTxt}>{chooseVoice.id}번</Text>
            <Text style={styles.itemTxt}>
              {new Date(chooseVoice.createdAt).toLocaleDateString()}
            </Text>
          </View>:
          <Text style={styles.itemTxt}>아직 선택된 모델이 없어요!</Text>
        }
      </View>
  )
}

export default PickedVoiceItem