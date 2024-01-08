// 태그 import
import { TouchableOpacity, ImageBackground, Text, StyleSheet } from "react-native";
// 스타일 import
import { basicShadow } from "@styles/shadowStyles";

// Props 정의
interface Props {
  func: Function,
  count: number,
  icon: number,
  size: number
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    aspectRatio:1,
  },
  icon: {
    width:"100%",
    height:"100%",
    alignItems:"flex-end",

  },
  count: {
    textAlign:"center",
    backgroundColor:"#5667FD",
    color:"black",
    fontWeight:"bold",
    borderRadius:10,
    ...basicShadow
  }
})

// 컴포넌트 정의
const IconBadge = ({ func, count, icon, size }:Props):JSX.Element => {

  return (
    <TouchableOpacity 
      style={{...styles.container, width:size}}
      onPress={() => func()}
    >
      <ImageBackground source={icon} resizeMode="cover" style={styles.icon}>
        <Text 
          style={{...styles.count, paddingHorizontal: 0.1 * size, fontSize: 0.3 * size}}
        >
          {count < 10? count : "9+"}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default IconBadge