import random
import string
from django.core.mail import send_mail
from django.template.loader import get_template

def generate_email_code(length):
    # 소문자 알파벳과 숫자를 사용한 문자열 생성
    characters = string.ascii_lowercase + string.digits
    # 랜덤한 문자열 생성
    code = ''.join(random.choice(characters) for _ in range(length))
    return code

def send_confirmation_email(email, code):
    data = {
        'code' : code
    }
    message = get_template('confirmation_email.txt').render(data)
    send_mail(subject='SingChro - 이메일 인증',
              message=message,
              from_email='singchro@gmail.com',
              recipient_list=[email],
              fail_silently=True)