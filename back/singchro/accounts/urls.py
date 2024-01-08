from django.urls import include, path
from allauth.account.views import confirm_email

from .views import (SignupAPIView, LoginAPIView, UserProfileView, LogoutAPIView, SendEmailCodeAPIView,
                    ChangNickNameAPIView, ChangPassWordAPIView)
from rest_framework.authtoken.views import (obtain_auth_token,)

from accounts.views import (email_check, nickname_check)

app_name = 'accounts'

urlpatterns = [
    path('email-check/', email_check, name='email_check'),
    path('nickname-check/', nickname_check, name='nickname_check'),
    path('email-verify/', SendEmailCodeAPIView.as_view(), name='send_eamil_code_view'),
    path('', SignupAPIView.as_view(), name='signup_api_view'),
    path('login/', LoginAPIView.as_view(), name='login_api_view'),
    path('logout/', LogoutAPIView.as_view(), name='logout_api_view'),
    path('<int:userId>/', UserProfileView.as_view(), name='user_profile'),
    path('<int:userId>/nickname/', ChangNickNameAPIView.as_view(), name='change_nick_name_view'),
    path('<int:userId>/password/', ChangPassWordAPIView.as_view(), name='chaing_pass_word_view'),
]