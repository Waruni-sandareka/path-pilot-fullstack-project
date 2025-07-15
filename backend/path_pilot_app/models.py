from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User


class User(AbstractUser):
    email = models.EmailField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
    

class CareerAssessment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='career_assessments')
    education_level = models.CharField(max_length=50)
    field_of_study = models.CharField(max_length=100)
    year_of_study = models.CharField(max_length=20)
    technical_skills = models.TextField()
    other_technical_skill = models.TextField(blank=True)
    soft_skills = models.TextField()
    other_soft_skill = models.TextField(blank=True)
    areas_of_interest = models.TextField()
    exploration = models.TextField()
    career_goals = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Career_Assessment'

    def __str__(self):
        return f"{self.user.username}'s Career Assessment"