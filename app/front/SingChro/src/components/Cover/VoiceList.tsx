// 태그 import
import { Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
// 상태정보 import
import { useRecoilState, useRecoilValue } from "recoil";
import { chooseVoiceState, isVoiceOwnerState } from "@states/featureState";
// 타입 import
import { VoiceModel } from "@constants/modelTypes"
// 스타일 import
import { basicShadow } from "@styles/shadowStyles"

// 스타일 정의
const {width } = Dimensions.get("window")
const styles = StyleSheet.create({
  scrollBody: {
    width: 0.8 * width,
    paddingBottom: 20,
    justifyContent:"center",
    alignItems: "center",
  },
  listBox: {
    width: "80%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    ...basicShadow
  },
  smallTxt: {
    color:"black",
    fontSize: 20,
    fontWeight: "bold",
  }
})

// 컴포넌트 정의
const VoiceList = ({voices}:{voices:Array<VoiceModel>}):JSX.Element => {
  // 변수 - 현재 선택한 voice 모델
  const [chooseVoice, setChooseVoice] = useRecoilState(chooseVoiceState);
  const isVoiceOwner = useRecoilValue(isVoiceOwnerState);

  return (
    <ScrollView contentContainerStyle={styles.scrollBody}>
      {voices.map((voice, index) => (
        <TouchableOpacity 
          style={{
            ...styles.listBox,
            backgroundColor : chooseVoice.id === voice.id ? "#DDE1FF" : "white"
          }} 
          onPress={() => setChooseVoice(voice)}
          disabled={!voice.activated && !isVoiceOwner}
          key={index}
        >
          <Text style={styles.smallTxt}>{!voice.activated && !isVoiceOwner? "비활성화된 모델":`${voice.id}번`}</Text>
          <Text style={styles.smallTxt}>
            {new Date(voice.createdAt).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default VoiceList