// 태그 import
import { View, Text, TextInput, StyleSheet } from 'react-native';
// 스타일 import 
import { shadows } from "@styles/shadowStyles";

// props 정의
interface Props {
  label:string;
  val : string | undefined;
  change: (text: string) => void;
  secure: boolean;
  errorMsg?: string|null;
}

// 흰색 입력창 스타일
const styles = StyleSheet.create({
  inputBox:{
    width:"80%",
    marginTop: "10%",
  },
  labelText: {
    color:"black",
    fontSize: 20,
    fontWeight:"bold",
    marginBottom:"5%"
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  inputTag: {
    width:"100%",
    height:50,
    paddingRight:20,
    paddingLeft:20,
    backgroundColor: "white",
    fontSize:20,
    color:"black",
    ...shadows.btn
  },
});

// 입력창 구현
const AuthInput = ({label, val, change, secure, errorMsg}: Props):JSX.Element => {
  return (
  <View style={styles.inputBox}>
    <Text style={styles.labelText}>{label}</Text>
    <TextInput 
      style={styles.inputTag}
      secureTextEntry={secure}
      value={val}
      onChangeText={change}
    />
    {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
  </View>
)}

export default AuthInput