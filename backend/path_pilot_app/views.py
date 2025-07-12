from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils.model_loader import generate_answer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import json
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers import UserSerializer
from .serializers import LoginSerializer

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

@csrf_exempt
def chatbot_response(request):
    logger.info("🔧 chatbot_response view triggered")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message', '')
            
            if not user_message:
                logger.warning("⚠️ Message is required")
                return JsonResponse({"error": "Message is required"}, status=400)
            
            logger.info(f"🧠 Received message from user: {user_message}")
            reply_text = generate_answer(user_message)
            logger.info(f"🤖 Model reply: {reply_text}")
            print(f"🤖 Model reply: {reply_text}")
            return JsonResponse({'reply': reply_text})
        except Exception as e:
            logger.error(f"❌ Error in chatbot_response: {e}")
            return JsonResponse({'error': 'Something went wrong'}, status=500)
    logger.warning("⚠️ Only POST requests are allowed")
    print("⚠️ Only POST requests are allowed")
    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    logger.info("🔧 register_user view triggered")
    if request.method == 'POST':
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()  # Should return a User instance
                print(f"Saved user: {user}")  # Debug
                if user is None:
                    logger.error("❌ Serializer.save() returned None")
                    return Response({'error': 'Failed to create user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                token, created = Token.objects.get_or_create(user=user)
                logger.info(f"🆕 User registered: {user.username}")
                return Response({'token': token.key, 'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            logger.warning(f"⚠️ Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"❌ Error in register_user: {e}")
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    logger.info("🔧 login_user view triggered")
    if request.method == 'POST':
        try:
            logger.info(f"🔍 Received data: {request.data}")  # Debug the incoming data
            serializer = LoginSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                user = serializer.validated_data['user']
                logger.info(f"🔐 Authenticated user: {user.email}")
                token, created = Token.objects.get_or_create(user=user)
                logger.info(f"🔐 User logged in: {user.username}")
                return Response({'token': token.key, 'message': 'Login successful'}, status=200)
            logger.warning(f"⚠️ Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=400)
        except Exception as e:
            logger.error(f"❌ Error in login_user: {e}")
            return Response({'error': 'Something went wrong'}, status=500)