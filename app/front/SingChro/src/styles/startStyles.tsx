// 태그 import
import { StyleSheet } from 'react-native';

const startStyles = StyleSheet.create({
  totalBox:{
    backgroundColor: "white",
    width:"100%",
    height: "100%",
    flex:1,
    flexDirection:"column",
    alignItems:"center",
  },
  titleImg: {
    height:"20%",
    marginTop:"20%",
    resizeMode:"contain",
    marginBottom: "5%"
  },
  imgBox:{
    width:"100%",
    height: "85%",
  },
  startImg: {
    opacity:0.9,
    width:"100%",
    height: "85%",
  },
  pushMsg:{
    color:"grey",
    fontSize: 20,
    fontWeight: "bold"
  },
});

export { startStyles }