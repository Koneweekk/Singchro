// 태그 import
import { Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native"
// 상태정보 import
import { useRecoilState } from "recoil";
import { chooseSongState } from "@states/featureState";
// 타입 import
import { OriginalSong } from "@constants/modelTypes";
// 스타일 import
import { basicShadow } from "@styles/shadowStyles"

// 스타일 정의
const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  scrollBody: {
    width: 0.8 * width,
    paddingBottom: 20,
    justifyContent:"center",
    alignItems: "center",
  },
  listBox: {
    width: "90%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor:"white",
    borderRadius: 10,
    ...basicShadow
  },
  smallTxt: {
    color:"black",
    fontSize: 15,
    fontWeight: "bold",
  }
})

// 컴포넌트 정의
const OldSongList = ({songs}:{songs:Array<OriginalSong>}):JSX.Element => {
  // 상태정보 - 현재 선택한 voice 모델
  const [ chooseSong, setChooseSong] = useRecoilState(chooseSongState);

  // 함수 - 노래 선택
  const pickSong = async(song:OriginalSong) => {
    const info = {
      id: song.id,
      title: song.title,
      path: song.path
    };
    setChooseSong(info);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollBody}>
      {songs.map((song, index) => (
        <TouchableOpacity 
          style={{
            ...styles.listBox,
            backgroundColor : chooseSong.id === song.id ? "#DDE1FF" : "white"
          }}
          onPress={() => pickSong(song)}
          key={index}
        >
          <Text style={styles.smallTxt}>{song.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default OldSongList