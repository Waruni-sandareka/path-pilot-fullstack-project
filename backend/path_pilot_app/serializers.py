from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
import logging

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
