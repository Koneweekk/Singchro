import { StyleSheet, Dimensions  } from 'react-native';

const { width } = Dimensions.get("window")
// RecordStart
const searchStyles = StyleSheet.create({
  // 감싸는 view 태그
  container: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    paddingTop:20,
    backgroundColor:"white",
    justifyContent:"space-between",
    alignItems:"center"
  },
  // 스크롤 부분
  scrollTag: {
    width: width,
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
  },
});

export { searchStyles }