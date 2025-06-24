from django.contrib import admin
from django.urls import path
from path_pilot_app.views import chatbot_response

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chatbot/', chatbot_response),
]
