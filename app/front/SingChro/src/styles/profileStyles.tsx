import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
  // 감싸는 view 태그
  container: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor:"white",
    justifyContent:"space-between",
    alignItems:"center"
  },
  // 동작 버튼 박스
  btnBox: {
    flexGrow:1,
    width: "90%",
    justifyContent:"center",
    alignItems:"center",
  },
  btnRow:{
    width:"100%",
    height: 130,
    marginBottom: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { profileStyles }