from django.urls import path
from .views import isModeling
from .views import ( HaveModelWork, VoiceFileUpdateView, 
                    VoiceModelCreateView, GetVoiceModelsByUser,
                    ToggleModelActivated, GetCoverSongByUser,
                    OriginSongCreateView, CoverSongCreateView,
                    RequestCoverSong, RequestListView, ReviewRequest,
                    SongLikeView, GetTotalCoverSongByUser, GetTotalCoverSongByLike,
                    GetCoverSongByTitle, HaveSongWork, SongFileUpdateView, DeleteCoverSong)

urlpatterns = [
    path('voice/', VoiceModelCreateView.as_view()),
    path('voice/modeling/<int:userId>/', isModeling),
    path('voice/user/<int:user_id>/', GetVoiceModelsByUser().as_view()),
    path('voice/<int:model_id>/', ToggleModelActivated().as_view()),
    path('original/user/<int:userId>/', GetCoverSongByUser().as_view()),
    path('original/', OriginSongCreateView.as_view()),

    path('cover/', CoverSongCreateView.as_view()),
    path('cover/user/<int:userId>/', GetTotalCoverSongByUser().as_view()),
    path('cover/like/<int:userId>/', GetTotalCoverSongByLike().as_view()),
    path('cover/search/', GetCoverSongByTitle().as_view()),
    path('cover/<int:coverSongId>/', DeleteCoverSong().as_view()),

    path('request/', RequestCoverSong().as_view()),
    path('request/<int:requestId>/', ReviewRequest.as_view()),
    path('request/user/<int:userId>/', RequestListView.as_view()),

    path('like/<int:userId>/<int:coverSongId>/', SongLikeView().as_view()),

    path('model/remain-in-queue/', HaveModelWork.as_view()),
    path('model/create/<int:model_id>/', VoiceFileUpdateView.as_view()),

    path('cover-song/remain-in-queue/', HaveSongWork.as_view()),
    path('cover-song/create/<int:cover_song_id>/', SongFileUpdateView.as_view()),
]