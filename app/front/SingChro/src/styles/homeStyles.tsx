import { StyleSheet,Dimensions } from 'react-native';

const { width } = Dimensions.get("window")
const homeStyles = StyleSheet.create({
  // 감싸는 view 태그
  container: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor:"white",
    justifyContent:"space-between",
    alignItems:"center"
  },
  // 홈 스크린 조작 버튼 박스
  btnBox: {
    width:"90%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterBox: {
    height:"100%",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  // 스크롤 부분
  scrollTag: {
    width: width,
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
  },
});

export { homeStyles }