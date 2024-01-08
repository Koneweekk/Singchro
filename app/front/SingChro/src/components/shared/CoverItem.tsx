// 태그 import
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// 타입 import
import { CoverTotal } from '@constants/featureTypes';
// 스타일 import
import { basicShadow } from '@styles/shadowStyles';

// Props 정의
interface Props {
  cover: CoverTotal,
  func: Function
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 65,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:20,
    ...basicShadow
  },
  txtBox:{
    width: "100%",
    height:"100%",
    justifyContent:"space-between"
  },
  title:{
    width:"100%",
    color:"black",
    fontSize: 15,
    fontWeight: "bold"
  },
  name: {
    color: "black",
    fontSize: 13,
  }
})

// 컴포넌트 정의
const CoverItem = ({cover, func}: Props):JSX.Element => {
  // 변수 - 노래 정보
  const username = cover.user.nickname;
  const title = cover.original.title;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => func()}
    >
      <View style={styles.txtBox}>
        <Text 
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail" 
        >
          {title}
        </Text>
        <Text style={styles.name}>{username}</Text>
      </View>
    </TouchableOpacity>
   )
}

export default CoverItem