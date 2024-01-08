import json
import requests
import google.auth.transport.requests
from google.oauth2 import service_account

PROJECT_ID = "a404-singchro"
BASE_URL = "https://fcm.googleapis.com"
FCM_ENDPOINT = "v1/projects/" + PROJECT_ID + "/messages:send"
FCM_URL = BASE_URL + "/" + FCM_ENDPOINT
SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"]

# 여기는 예시 메시지
fcm_message = {
  "message":{
    # 여기에 기기 토큰값이 가야함
    "token" : "erCDnfM6TASU4LG4qzAHI-:APA91bHe7jY7XneGK4m0KMUawXoqTRV_ocxFMwgxR9I7qUueIq0v9c5hVCXDMbG45MnNzd7tMfHQkjD3OFRtQPsvQl7uEeR0ZABpsuHcx8ax31ha-suqcghKgZPTPqwWhHv0FbhCRg7w",
    # 같이 담아 보낼 텍스트
    "notification":{
      "title" : "노티 타이틀",
      "body" : "노티 바디"
    },
    # 같이 보낼 데이터
    "data": {
      "score": "5:1",
      "time": "15:10"
    },
  }
}

def get_access_token():
  # 보안 파일 찾는 건데 경로는 설정은 자세히는 모르겠음
  # 나는 파이썬 파일이랑 같은 파일에 넣으니깐 작동 하더라
  credentials = service_account.Credentials.from_service_account_file(
    "a404-singchro-1a28e631aa61.json", scopes=SCOPES)
  request = google.auth.transport.requests.Request()
  credentials.refresh(request)
  return credentials.token

def send_fcm_message(message_str):
  headers = {
    "Authorization": "Bearer " + get_access_token(),
    "Content-Type": "application/json; UTF-8",
  }

  now_message = fcm_message
  print(now_message['message']['notification']['title'])
  now_message['message']['notification']['title'] = message_str
  print(now_message['message']['notification']['title'])
  resp = requests.post(FCM_URL, data=json.dumps(fcm_message), headers=headers)


from firebase_admin import messaging
from datetime import datetime

def send_fcm_msg(title, body, token):
    # 현재 시간을 가져오기
    current_time = datetime.now()

    # 시간을 문자열로 변환하기 (예: "YYYY-MM-DD HH:MM:SS")
    current_time_str = current_time.strftime("%Y-%m-%d %H:%M:%S")

    # 푸시 알림 메시지 작성
    message = messaging.Message(
        data={
            "score": "5:1",
            "time": current_time_str
        },
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=token
    )
    # 푸시 알림 보내기
    response = messaging.send(message)
    print("Successfully sent message:", response)
