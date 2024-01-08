// 태그 import
import { View, TextInput, StyleSheet } from 'react-native';
// 컴포넌트 import
import RoundBtn from '@components/shared/RoundBtn';
// 스타일 import 
import { basicShadow } from "@styles/shadowStyles";

// props 정의
interface Props {
  val : string | undefined;
  change: (text: string) => void;
  func: Function,
}

// 흰색 입력창 스타일
const styles = StyleSheet.create({
  inputBox:{
    width:"90%",
    height:50,
    paddingHorizontal:20,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderRadius:10,
    ...basicShadow
  },
  inputTag: {
    maxWidth:"80%",
    height: "100%",
    fontSize:15,
    fontWeight:"bold",
    color:"black",
  },
});

// 입력창 구현
const SearchInput = ({val, change, func}: Props):JSX.Element => {
  // 변수 - 아이콘 url
  const searchIcon = require("@assets/icon/search.png");

  return (
  <View style={styles.inputBox}>
    <TextInput 
      style={styles.inputTag}
      value={val}
      onChangeText={change}
      placeholder="검색어를 입력해주세요"
      placeholderTextColor="black"
    />
    <RoundBtn btnFunc={func} btnIcon={searchIcon} size={30}/>
  </View>
)}

export default SearchInput