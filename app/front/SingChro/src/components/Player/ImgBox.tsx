// 태그 import 
import { View, Image, StyleSheet, Text } from 'react-native';
// 타입 import
import { CoverTotal } from '@constants/featureTypes';

// 스타일 정의
const styles = StyleSheet.create({
  ImgBox: {
    flexGrow: 1,
    justifyContent:"center",
    alignContent:"center",
  },
  bgImg:{
    ...StyleSheet.absoluteFillObject,
    width:"100%",
    height:"100%",
    resizeMode:"cover",
    opacity: 0.5
  },
  titleText: {
    paddingHorizontal:20,
    textAlign:"center",
    color:"black",
    fontWeight:"bold",
    fontSize: 25,
    opacity: 0.7
  },
  userText: {
    textAlign:"center",
    color:"black",
    fontWeight:"bold",
    fontSize: 15,
        opacity: 0.7
  },
})

const ImgBox = ({ cover }: {cover: CoverTotal}):JSX.Element => {
  // 변수 - 커버송 정보, 유저 정보
  const coverTotal = cover;
  return (
    <View style={styles.ImgBox}>
      <Image source={require("@assets/images/test.jpg")} style={styles.bgImg}/>
      <Text style={styles.titleText}>{coverTotal.original.title}</Text>
      <Text style={styles.userText}>covered by {coverTotal.user.nickname}</Text>
    </View>
  )
}

export default ImgBox