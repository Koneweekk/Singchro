// 태그 import
import { View } from "react-native";
// 함수 import
import { useState } from "react"
import { axiosAuthed } from "@functions/axiosFunc";
import { resetToken } from "@functions/authFunc";
// 상태정보 import
import { userState } from "@states/modelState";
import { useRecoilState } from "recoil";
// 컴포넌트 import
import NameHeader from "@components/Header/NameHeader";
import RectangleBtn from "@components/shared/RectangleBtn";
import BottomBar from "@components/Footer/BottomBar";
import DeleteUserModal from "@components/Profile/DeleteUserModal";
import ChangePwModal from "@components/Profile/ChangePwModal";
import ChangeNameModal from "@components/Profile/ChangeNameModal";
import VoiceManageModal from "@components/Profile/VoiceManageModal";
import CoverManageModal from "@components/Profile/CoverManageModal";
// 스타일 import
import { profileStyles } from "@styles/profileStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const ProfileView = ({ navigation }:NavigationProps<"Profile">):JSX.Element => {
  // 변수 - 유저 정보
  const [user] = useRecoilState(userState);

  // 변수 - 아이콘 이미지
  const infoImg = require("@assets/icon/userInfo.png");
  const pwImg = require("@assets/icon/password.png");
  const logoutImg = require("@assets/icon/logout.png");
  const deletetImg = require("@assets/icon/delete.png");
  const vlImg = require("@assets/icon/voiceLearning.png");
  const csImg = require("@assets/icon/coverSong.png");

  // 변수 - 모달창 컨트롤
  const [delUser, setDelUser] = useState(false);
  const [changePw, setChangePw] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [voiceManage, setVoiceManage] = useState(false);
  const [coverManage, setCoverManage] = useState(false);

  // 함수 - 로그아웃
  const handleLogout = async() => {
    const result = await axiosAuthed("/logout/", "POST");
    await resetToken();
    navigation.navigate("Start");
  }

  return (
    <View style={profileStyles.container}>
      {/* 모달 */}
      <DeleteUserModal visible={delUser} setVisible={setDelUser} navigation={navigation}/>
      <ChangePwModal visible={changePw} setVisible={setChangePw}/>
      <ChangeNameModal visible={changeName} setVisible={setChangeName}/>
      <VoiceManageModal visible={voiceManage} setVisible={setVoiceManage}/>
      <CoverManageModal visible={coverManage} setVisible={setCoverManage}/>
      {/* 헤더 */}
      <NameHeader name={user.nickname} page="프로필"/>
      <View style={profileStyles.btnBox}>
        <View style={profileStyles.btnRow}>
          <RectangleBtn btnTxt="음성 모델 관리" btnFunc={() => setVoiceManage(true)} imgUrl={vlImg}/>
          <RectangleBtn btnTxt="커버송 관리" btnFunc={() => setCoverManage(true)} imgUrl={csImg}/>
        </View>
        {/* 회원 기능 관련 버튼 */}
        <View style={profileStyles.btnRow}>
          <RectangleBtn btnTxt="닉네임 변경" btnFunc={() => setChangeName(true)} imgUrl={infoImg}/>
          <RectangleBtn btnTxt="비밀번호 변경" btnFunc={() => setChangePw(true)} imgUrl={pwImg}/>
        </View>
        <View style={profileStyles.btnRow}>
          <RectangleBtn btnTxt="회원 탈퇴" btnFunc={() => setDelUser(true)} imgUrl={deletetImg}/>
          <RectangleBtn btnTxt="로그아웃" btnFunc={handleLogout} imgUrl={logoutImg}/>
        </View>
      </View>
      {/* 하단 바 */}
      <BottomBar navigation={navigation}/>
    </View>
  )
}

export default ProfileView