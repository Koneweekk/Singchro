// 태그 import
import { Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native"
// 상태정보 import
import { useState } from "react";
import { useRecoilState } from "recoil";
import { chooseSongState } from "@states/featureState";
// 컴포넌트 import
import SearchInput from "@components/shared/SearchInput";
// 타입 import
import { Song } from "@constants/featureTypes"
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
const NewSongList = ({songs}:{songs:Array<Song>}):JSX.Element => {
  // 상태정보 - 현재 선택한 voice 모델
  const [ chooseSong, setChooseSong] = useRecoilState(chooseSongState);

  // 변수 - 음악 검색
  const [ topic, setTopic ] = useState("");
  const [ searchedSongs, setSearchedSongs ] = useState<Array<Song>>([])

  // 함수 - 노래 검색
  const searchSong = async(topic:string) => {
    setTopic(topic);
    const result = await songs.filter(song => song.title.includes(topic));
    setSearchedSongs(result);
  }

  return (
    <>
      <SearchInput val={topic} change={setTopic} func={() => searchSong(topic)}/>
        {searchedSongs.map((song, index) => (
          <TouchableOpacity 
            style={{
              ...styles.listBox,
              backgroundColor : chooseSong.title === song.title ? "#DDE1FF" : "white"
            }}
            onPress={() => setChooseSong(song)}
            key={index}
          >
            <Text style={styles.smallTxt}>{song.title}</Text>
          </TouchableOpacity>
        ))}
    </>
  )
}

export default NewSongList