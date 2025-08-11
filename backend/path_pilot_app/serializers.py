from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
import logging
from .models import CareerAssessment
from .models import AcademicRecord
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Debug: Print validated data
        print(f"Validated data: {validated_data}")
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        print(f"Created user: {user}")
        return user
    
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'}, required=True)

    def validate(self, data):
        logger = logging.getLogger(__name__)  # Add logger for debugging
        logger.info(f"🔍 Validating login with email: {data.get('email')}, password: {data.get('password')}")
        user = authenticate(request=self.context.get('request'), username=data.get('email'), password=data.get('password'))
        if user is None:
            logger.warning(f"🔒 Authentication failed for email: {data.get('email')}")
            raise serializers.ValidationError('Invalid email or password')
        return {'user': user}


class CareerAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerAssessment
        fields = [
            'education_level', 'field_of_study', 'year_of_study',
            'technical_skills', 'other_technical_skill',
            'soft_skills', 'other_soft_skill',
            'areas_of_interest', 'exploration', 'career_goals'
        ]
        extra_kwargs = {
            'other_technical_skill': {'required': False, 'allow_blank': True},
            'other_soft_skill': {'required': False, 'allow_blank': True}
        }

    def create(self, validated_data):
        user = self.context['request'].user
        return CareerAssessment.objects.create(user=user, **validated_data)
    


class AcademicRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicRecord
        fields = [
            'student_type',
            'gpa',
            'a_levels',
            'o_levels',
            'projects',
            'experiences',
            'certificates',
            'courses',
            'participations'
        ]
        extra_kwargs = {
            'gpa': {'required': False, 'allow_null': True},
            'a_levels': {'required': False},
            'o_levels': {'required': False},
            'projects': {'required': False},
            'experiences': {'required': False},
            'certificates': {'required': False},
            'courses': {'required': False},
            'participations': {'required': False}
        }

    def validate_gpa(self, value):
        if value is not None and (value < 0 or value > 4.0):
            raise serializers.ValidationError("GPA must be between 0.0 and 4.0")
        return value

    def validate_a_levels(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("A-Levels must be a list")
        for item in value:
            if not all(key in item for key in ['subject', 'grade']):
                raise serializers.ValidationError("Each A-Level must have subject and grade")
        return value

    def validate_o_levels(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("O-Levels must be a list")
        for item in value:
            if not all(key in item for key in ['subject', 'grade']):
                raise serializers.ValidationError("Each O-Level must have subject and grade")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        return AcademicRecord.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        logger.info(f"Updating instance with: {validated_data}")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance