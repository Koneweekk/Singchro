// 태그 import
import { View, TouchableOpacity, StyleSheet, Image  } from "react-native";
// 스타일 import
import { shadows } from "@styles/shadowStyles";
// 네비게이션 import
import { NavigationProp } from "@react-navigation/native";

// 스타일
const styles = StyleSheet.create({
  btnBox: {
    width: 350,
    height: 60,
    flexDirection: "row",
    paddingHorizontal:"10%",
    paddingTop:3,
    backgroundColor: "white", // 배경색 추가
    ...shadows.bar
  },
  btnIcon: {
    height: "60%",
    aspectRatio: 1,
    resizeMode:"cover"
  }
});

// 컴포넌트
const BottomBar = ({navigation}: {navigation:NavigationProp<any>}):JSX.Element => {
  return (
      <View style={styles.btnBox}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchCover")}>
          <Image source={require("@assets/icon/search.png")} style={styles.btnIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={require("@assets/icon/home.png")} style={styles.btnIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("@assets/icon/myPage.png")} style={styles.btnIcon}/>
        </TouchableOpacity>
      </View>
  );
}

export default BottomBar
