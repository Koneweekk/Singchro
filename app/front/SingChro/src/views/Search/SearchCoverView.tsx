// 태그 import
import { View, ScrollView } from "react-native"
// 함수 import
import { useState } from "react";
import { axiosCover } from "@functions/axiosFunc";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playListState, playPositionState, playingState } from "@states/featureState";
import { userState, myCoversState } from "@states/modelState";
import { useRecoilState } from "recoil";
// 컴포넌트 import
import SearchInput from "@components/shared/SearchInput";
import BottomBar from "@components/Footer/BottomBar";
import CoverItem from "@components/shared/CoverItem";
// 스타일 import
import { searchStyles } from "@styles/searchStyles"
// 타입 import
import { CoverTotal, NavigationProps } from "@constants/featureTypes";

const SearchCoverView = ({navigation}:NavigationProps<"SearchCover"> ):JSX.Element => {
  // 상태정보 - 플레이리스트
  const [ playPosition, setPlayPosition ] = useRecoilState(playPositionState);
  const [ playList, setPlayList ] = useRecoilState(playListState);
  const [ playing, setPlaying ] = useRecoilState(playingState);
  
  // 변수 - 검색어
  const [ searchTxt, SetSearchTxt ] = useState("");
  // 변수 - 검색된 아이템들
  const [ searchCovers, setSearchedCovers ] = useState([]);
  // 변수 - 아이콘 url
  const searchIcon = require("@assets/icon/search.png");

  // 함수 - 검색
  const handleSearch = async() => {
    // 검색 api 호출
    try {
      const result = await axiosCover(`/search/`, "POST", {title: searchTxt});
      await setSearchedCovers(result);
    // 예외 처리
    } catch(err) {
      console.log(err)
    }
  }
  // 함수 - 현재 필터링된 노래들을 플레이리스트에 넣고 재생 화면으로 이동
  const movePlayer = async(index:number, cover:CoverTotal) => {
    await setPlayList(searchCovers);
    await setPlayPosition(index);
    await setPlaying(false);
    navigation.navigate("MusicPlayer", {coverTotal: cover});
  }

  // 구현
  return( 
    <View style={searchStyles.container}>
      <SearchInput val={searchTxt} change={SetSearchTxt} func={handleSearch}/>
      {/* 노래 리스트 */}
        <ScrollView contentContainerStyle={searchStyles.scrollTag}>
          { searchCovers.map((cover, index) => (
            <CoverItem 
              cover={cover}
              func={() => movePlayer(index, cover)}
              key={index} 
            />
          ))}
        </ScrollView>
      <BottomBar navigation={navigation}/>
    </View>
  )
}

export default SearchCoverView