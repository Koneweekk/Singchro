import { StyleSheet  } from 'react-native';

const loginStyles = StyleSheet.create({
  // 감싸는 view 태그
  container: {
    flexGrow: 1,
    justifyContent:"center",
    alignItems: "center",
  },
  // 배경 이미지 위의 컨텐츠 박스
  contentBox:{
    width: "100%",
    justifyContent:"center",
    alignItems: "center",
    paddingBottom:"10%"
  },
});

export { loginStyles }