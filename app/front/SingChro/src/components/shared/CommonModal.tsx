// 태그 import
import { Modal, Text, View, Image, Dimensions, ScrollView } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
// 컴포넌트 import
import FunctionBtn from "@components/shared/FunctionBtn";
// 스타일 import
import { basicShadow } from "@styles/shadowStyles";

// props 정의
interface Props {
  visible: boolean;
  closeModal: Function;
  sumbitModal: Function
  title: string;
  body: JSX.Element
  guide?: string;
}

// 스타일 정의
const {width } = Dimensions.get("window")
const styles = StyleSheet.create({
  // 컨테이너
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    maxHeight: "90%",
    width: 0.9 * width,
    paddingVertical:"5%",
    paddingHorizontal:"5%",
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent:"center",
    alignItems: 'center',
    ...basicShadow
  },
  modalText: {
    marginTop: 30,
    color: "black",
    fontSize: 15,
    fontWeight: "bold"
  },
  // 헤더
  header: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headTxt: {
    fontSize: 25,
    fontWeight: "bold",
    color:"black",
  },
  iconBox:{
    height: "100%",
    justifyContent:"center",
  },
  headIcon: {
    height: "60%",
    aspectRatio: 1,
    resizeMode: "contain"
  },
  // 컨텐츠 박스
  scrollContatiner: {
    width: 0.8 * width,
    paddingVertical: 20,
    justifyContent:"center",
    alignItems: "center",
  },
})


// 컴포넌트 정의
const CommonModal = ({visible, closeModal, title, body, guide, sumbitModal}:Props):JSX.Element => {
  // 변수 - 아이콘
  const closeImg = require("@assets/icon/close.png")

  // 컴포넌트 구현
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalBox}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.headTxt}>{title}</Text>
            <TouchableOpacity style={styles.iconBox} onPress={() => closeModal()}>
              <Image source={closeImg} style={styles.headIcon}/>
            </TouchableOpacity>
          </View>
          {/* 바디 */}
          <ScrollView contentContainerStyle={styles.scrollContatiner}>
            { body }
          </ScrollView>
          {/* 푸터 */}
          <Text style={styles.modalText}>{guide}</Text>
          <FunctionBtn btnFunc={() => sumbitModal()} btnText="완료"/>
        </View>
      </View>
    </Modal>
  )
}

export default CommonModal