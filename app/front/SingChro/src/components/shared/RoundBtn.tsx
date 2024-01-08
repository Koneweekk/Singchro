// 태그 import
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

// Props
interface Props {
  btnIcon: number;
  btnFunc: Function;
  size?: number;
}

// 스타일
const styles = StyleSheet.create({
  btn: {
    aspectRatio:1,
    paddingVertical:"auto",
    justifyContent: "center",
    alignItems: "center",
  },
  btnIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
});

// 구성요소
const RoundBtn = ({btnIcon, btnFunc, size}:Props):JSX.Element => {
  const width = size? size : 80
  return (
  <>
    <TouchableOpacity 
      style={{...styles.btn, width: width}}
      activeOpacity={0.3}
      onPress={() => btnFunc()}
    >
      <Image style={styles.btnIcon} source={btnIcon}/>
    </TouchableOpacity>
  </>
)}

export default RoundBtn