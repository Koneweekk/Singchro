// 함수 import
import { useEffect, useState } from "react";
import { axiosCover } from "@functions/axiosFunc";
// 태그 import
import { ScrollView, View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from "recoil";
import { myCoversState } from "@states/modelState";
// 스타일 import
import { basicShadow } from '@styles/shadowStyles';
// 컴포넌트 import
import RoundBtn from '@components/shared/RoundBtn';

// 스타일 정의
const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  itemBox: {
    width: "85%",
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
    width: 0.6 * width - 30,
    paddingRight: 10,
  },
  info: {
    color:"black",
    fontWeight: "bold",
    fontSize: 12
  },
})

// 컴포넌트 정의
const CoverManageList = ():JSX.Element => {
  // 변수 - 보이스 모델 정보
  const [ loading, setLoading ] = useState(false);
  const [ myCovers, setMyCovers ] = useRecoilState(myCoversState);

  // 변수 - 아이콘 url
  const deleteIcon = require("@assets/icon/delete.png")

  // 함수 - 커버송 모델 로드
  const findMyCovers = async() => {
    await setLoading(true);
    const userId = parseInt(await AsyncStorage.getItem("id") || "0")
    // api 요청
    try {
      const result = await axiosCover(`/user/${userId}`, "GET");
      await setMyCovers(result)
    // api 오류
    } catch {
    // 모두 완료되면 로딩 완료
    } finally {
      setLoading(false);
    }
  }

  // 함수 - 커버송 삭제 확인
  const deleteMyCover = async (index: number, id: number) => {
      Alert.alert(
        "커버송 삭제",          
        "정말로 선택한 커버송을 삭제하시겠습니까?",
        [  
          { text: "취소" },
          {
            text: "확인",
            onPress: async () => {
              // API 요청 후 로컬 배열 수정
              try {
                const result = await axiosCover(`/${id}/`, "DELETE");
                const newStatus = [...myCovers]
                newStatus.splice(index, 1)
                setMyCovers(newStatus);
              // 예외 처리 
              } catch(err) {
                console.log(err)
              }
            }
          },
        ],
        // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
        { cancelable: true } 
      );
  }

  // 기능 - 마운트되면 보이스모델 로드
  useEffect(() => {
    findMyCovers();
  }, [])

  return (
    <>
      { myCovers.map((cover, index) => (
        <View key={index} style={styles.itemBox}>
          <View style={styles.infoBox}>
            <Text 
              numberOfLines={1} 
              style={styles.info}
              ellipsizeMode="tail"
            >
                {cover.original.title}
            </Text>
            <Text style={styles.info}>{new Date(cover.createdAt).toLocaleDateString()}</Text>
          </View>
          <RoundBtn btnFunc={() => deleteMyCover(index, cover.id)} btnIcon={deleteIcon} size={30}/>
        </View>
      ))}
    </>
  )
}

export default CoverManageList