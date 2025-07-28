from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path("chatbot_response/", views.chatbot_response, name="chatbot_response"),
    path('user/', views.user_details, name='user_details'),
    path('resume/', views.generate_resume, name='generate_resume'),
    path('career-assessment/', views.career_assessment_create, name='create_career_assessment'),
    path('predict-job-role/', views.predict_job_role, name='predict_job_role'),
    path('academic-records/', views.academic_record_create, name='create_academic_record'),
    path('academic-records/get/', views.academic_record_get, name='get_academic_record'),
    path('academic-records/update/', views.academic_record_update, name='update_academic_record'),
]