// 태그 import
import { Text, StyleSheet, View } from "react-native"
// 스타일 import
import { basicShadow } from "@styles/shadowStyles"
// 타입 import
import { Alarm } from "@constants/featureTypes"
// 컴포넌트 import
import RoundBtn from "@components/shared/RoundBtn"

// props 정의
interface Props {
  deleteAlarm: Function,
  alarm: Alarm,
}

// 스타일 정의
const styles = StyleSheet.create({
  listBox: {
    width: "90%",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:"white",
    borderRadius: 10,
    ...basicShadow
  },
  titleBox: {
  },
  title: {
    color:"black",
    fontSize: 15,
    fontWeight: "bold",
  },
  body: {
    color:"black",
    fontSize:12
  }
})

// 컴포넌트 정의
const AlarmListItem = ({alarm, deleteAlarm}: Props):JSX.Element => {
  return (
    <View style={styles.listBox}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{alarm.title}</Text>
        <Text style={styles.body}>{alarm.body}</Text>
      </View>
      <RoundBtn btnIcon={require("@assets/icon/close.png")} btnFunc={() => deleteAlarm()} size={20}/>
    </View>
  )
}

export default AlarmListItem