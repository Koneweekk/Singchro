// 함수 import
import { useEffect, useState } from "react";
import { axiosVoice } from "@functions/axiosFunc";
// 태그 import
import { ScrollView, View, Switch, Text, StyleSheet, Dimensions, Alert } from 'react-native';
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
// 타입 import
import { VoiceModel } from '@constants/modelTypes';
// 스타일 import
import { basicShadow } from '@styles/shadowStyles';
// 컴포넌트 import
import RoundBtn from '@components/shared/RoundBtn';

// 스타일 정의
const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  itemBox: {
    width: "90%",
    height: 60,
    marginVertical: 15,
    paddingHorizontal: 20,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:10,
    ...basicShadow,
  },
  // 모델 정보
  infoBox: {
  },
  info: {
    color:"black",
    fontWeight: "bold",
    fontSize: 15
  },
  // 관리 버튼
  btnBox: {
    width: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
  },
})

// 컴포넌트 정의
const VoiceManageList = ():JSX.Element => {
  // 변수 - 보이스 모델 정보
  const [ loading, setLoading ] = useState(false);
  const [ myVoices, setMyVoices ] = useState<Array<VoiceModel>>([]);

  // 변수 - 아이콘 url
  const deleteIcon = require("@assets/icon/delete.png")

  // 함수 - 보이스 모델 로드
  const findVoices = async() => {
    await setLoading(true);
    const userId = parseInt(await AsyncStorage.getItem("id") || "0")
    // api 요청
    try {
      const result = await axiosVoice(`/user/${userId}/`, "GET");
      if (Object.keys(result).length !== 0) {
        await setMyVoices(result)
      }
    // api 오류
    } catch {
    // 모두 완료되면 로딩 완료
    } finally {
      setLoading(false);
    }
  }
  // 함수 - 보이스 모델 삭제
  const deleteVoice = async (index: number, id: number) => {
    // 보이스 모델 삭제 api 요청 함수
    const deleteVoiceApi = async() => {
      try {
        // API 요청 후 로컬 배열 수정
        const result = await axiosVoice(`/${id}/`, "DELETE");
        console.log(result)
        const newStatus = [...myVoices]
        newStatus.splice(index, 1)
        setMyVoices(newStatus);
      // 예외 처리 
      } catch(err){
        console.log(err)
      }
    }
    // alert 창으로 확인 후 삭제
    Alert.alert(
      "음성 모델 삭제",          
      "정말로 선택한 음성 모델을 삭제하시겠습니까?",
      [  
        { text: "취소" },
        {
          text: "확인",
          onPress: deleteVoiceApi
        },
      ],
      // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
      { cancelable: true } 
    );
  }

  // 함수 - 보이스 모델 활성화 토글
  const toggleVoice = async (index: number, id: number) => {
    // api 요청 후 로컬 배열 수정
    try {
      const { activated } = await axiosVoice(`/${id}/`, "PUT");
      const newStatus = [...myVoices]
      newStatus[index].activated = activated
      setMyVoices(newStatus);
    // 예외 처리 
    } catch(err) {
      console.log(err)
    }
  }

  // 기능 - 마운트되면 보이스모델 로드
  useEffect(() => {
    findVoices();
  }, [])

  return (
    <>
      { myVoices.map((voice, index) => (
        <View key={index} style={styles.itemBox}>
          <View style={styles.infoBox}>
            <Text style={styles.info}>{voice.id}번 모델</Text>
            <Text style={styles.info}>{new Date(voice.createdAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.btnBox}>
            <RoundBtn btnFunc={() => deleteVoice(index, voice.id)} btnIcon={deleteIcon} size={30}/>
            <Switch
              trackColor={{false: '#767577', true: '#5667FD'}}
              thumbColor="grey"
              onValueChange={() => toggleVoice(index, voice.id)}
              value={voice.activated}
            />
          </View>
        </View>
      ))}
    </>
  )
}

export default VoiceManageList