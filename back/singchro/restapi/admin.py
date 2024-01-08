from django.contrib import admin
from .models import OriginSong, VoiceModel, CoverRequest, CoverSong, SongLike

# Register your models here.
admin.site.register(OriginSong)
admin.site.register(VoiceModel)
admin.site.register(CoverRequest)
admin.site.register(CoverSong)
admin.site.register(SongLike)
