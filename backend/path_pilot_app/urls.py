from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path("chatbot_response/", views.chatbot_response, name="chatbot_response"),
    path('user/', views.user_details, name='user_details'),
    path('resume/', views.generate_resume, name='generate_resume'),
    path('career-assessment/', views.career_assessment_create, name='create_career_assessment'),
]