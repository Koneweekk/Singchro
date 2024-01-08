// 함수 import
import { useEffect } from "react";
import { axiosRequest } from "@functions/axiosFunc";
// 상태정보
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from "recoil";
import { requestsState } from "@states/featureState";
// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import RequestListItem from "./RequestListItem";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function,
}

// 컴포넌트 정의
const RequestModal = ({visible, setVisible}:Props):JSX.Element => {
  // 상태정보 - 알람 리스트
  const [ requests, setRequests] = useRecoilState(requestsState);

  // 함수 - 커버 수락
  const accept = async(idx:number, id:number) => {
    // api 요청
    try {
      const result = await axiosRequest(`/${id}/`,"PUT", {isAccepted: true})
      const removedList = [...requests]
      removedList.splice(idx, 1)
      await setRequests(removedList)
    // 예외처리 
    } catch {
    }
  }
  // 함수 - 커버 거절
  const refuse = async(idx:number, id:number) => {
    // api 요청
    try {
      const result = await axiosRequest(`/${id}/`,"PUT", {isAccepted: false})
      const removedList = [...requests]
      removedList.splice(idx, 1)
      await setRequests(removedList)
    // 예외처리 
    } catch {
    }
  }

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={() => setVisible(false)}
      sumbitModal={() => setVisible(false)}
      title="커버 요청"
      guide="수락 혹은 거절을 눌러주세요"
      body={
        <>
          {requests.map((request, index) => (
            <RequestListItem
              key={index}
              request={request}
              accept={() => accept(index, request.id)}
              refuse={() => refuse(index, request.id)}
            />
          ))}
        </>
      }
    />
  )
}

export default RequestModal