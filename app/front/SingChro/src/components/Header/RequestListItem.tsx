// 태그 import
import { Text, StyleSheet, View } from "react-native"
// 스타일 import
import { basicShadow } from "@styles/shadowStyles"
// 타입 import
import { GetRequest } from "@constants/featureTypes"
// 컴포넌트 import
import RoundBtn from "@components/shared/RoundBtn"

// props 정의
interface Props {
  refuse: Function,
  accept: Function
  request: GetRequest,
}

// 스타일 정의
const styles = StyleSheet.create({
  listBox: {
    width: "90%",
    flexDirection: "column",
    justifyContent:"space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor:"white",
    borderRadius: 10,
    ...basicShadow
  },
  titleTxt: {
    color:"black",
    fontSize: 17,
    fontWeight: "bold",
  },
  bodyTxt: {
    color:"black",
    fontSize:15
  },
  btnBox: {
    width:"100%",
    paddingHorizontal:30,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})

// 컴포넌트 정의
const RequestListItem = ({request, accept, refuse}: Props):JSX.Element => {
  return (
    <View style={styles.listBox}>
      <Text style={styles.titleTxt}>
        {request.user.nickname}님의 커버 요청
      </Text>
      <Text 
        style={styles.bodyTxt}
        numberOfLines={1} 
        ellipsizeMode="tail"
      >
        {request.original.title}
      </Text>
      <View style={styles.btnBox}>
        <RoundBtn btnIcon={require("@assets/icon/accept.png")} btnFunc={() => accept()} size={35}/>
        <RoundBtn btnIcon={require("@assets/icon/refuse.png")} btnFunc={() => refuse()} size={35}/>
      </View>
    </View>
  )
}

export default RequestListItem