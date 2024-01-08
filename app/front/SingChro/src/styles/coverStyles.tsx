import { StyleSheet } from 'react-native';

const coverStyles = StyleSheet.create({
  // 감싸는 view 태그
  container: {
    flexGrow: 1,
    justifyContent:"center",
    alignItems: "center",
  },
  // 배경 이미지 위의 컨텐츠 박스
  centerBox:{
    flexGrow: 1,
    width: "100%",
    justifyContent:"center",
    alignItems: "center",
  },
  requestBox: {
    width: "100%",
    height:"100%",
    paddingBottom:"10%",
    justifyContent:"space-between",
    alignItems: "center",
  },
  // 타이틀 텍스트
  titleTxt: {
    color:"black",
    fontSize: 25,
    marginBottom: "15%",
    fontWeight: "bold",
  },
});

export { coverStyles }