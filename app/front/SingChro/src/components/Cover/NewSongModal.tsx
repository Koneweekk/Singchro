// 태그 import
import { Text, StyleSheet } from 'react-native';
// 모듈 import
import RNFS from 'react-native-fs';
// 함수 import
import { useEffect, useState } from "react";
// 타입 import
import { Song } from '@constants/featureTypes';
// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import NewSongList from './NewSongList';

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const NewSongModal = ({visible, setVisible}:Props):JSX.Element => {
  // 변수 - 노래 정보
  const [ songs, setSongs ] = useState<Array<Song>>([])

  // 변수 - 로딩 중
  const [ Loading, isLoading] = useState<boolean>(false)

  // 함수 - 유저가 기기에 보유하고 있는 노래 불러오기
  const newSongArray:Array<Song> = []
  const findNewSongs = async(folderPath: string) => {
    await isLoading(true);
    try {
      // 현재 폴더 탐색
      const files = await RNFS.readDir(folderPath);
      for (const file of files) {
        // data폴더거나 obb 폴더이면 탐색 X
        if (file.name === "data" || file.name === "obb") {
          continue;
        }
        // 그 외의 폴더면 그 안도 탐색
        else if (file.isDirectory()) {
          await findNewSongs(file.path);
        // mp3 파일이면 배열에 추가
        } else if (file.isFile() && file.name.endsWith('.mp3')) {
          newSongArray.push({id: -1, title: file.name.replace(".mp3",""), path:file.path})
        }
      }
      // 예외처리
    } catch (error) {
      // console.error('Error scanning for MP3 files:', error);
    } finally {
      await isLoading(false);
      await setSongs(newSongArray);
    }
  }

  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
  }

  // 기능 - 모달창이 로드되면 보이스 모델 로드
  useEffect(() => {
    findNewSongs(RNFS.ExternalStorageDirectoryPath);
  }, []);

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={closeModal}
      title="노래 선택"
      guide="커버를 할 노래 선택"
      body={ Loading?
        <Text style={{color:"black", fontSize:20, fontWeight:"bold"}}>
          로딩 중....
        </Text> :
        <NewSongList songs={songs}/>
      }
    />
  )
}

export default NewSongModal