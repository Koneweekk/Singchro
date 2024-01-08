import { StyleSheet, Platform} from "react-native";

const basicShadow =  StyleSheet.create({
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    android: {
      elevation: 20,
    },
  }),
});

const shadows = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 10,
    // 플랫폼에 따른 그림자 효과
    ...basicShadow
  },
  bar: {
    alignItems: "center",
    justifyContent:"space-between",
    borderTopLeftRadius: 30, // 상단 왼쪽 모서리 둥글게
    borderTopRightRadius: 30, // 상단 오른쪽 모서리 둥글게
    // 플랫폼에 따른 그림자 효과
    ...basicShadow
  }
});

export {shadows, basicShadow}