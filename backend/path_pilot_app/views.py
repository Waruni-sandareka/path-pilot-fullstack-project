from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils.model_loader import model_loader
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.template.loader import render_to_string
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from weasyprint import HTML
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from .models import CareerAssessment
from .serializers import CareerAssessmentSerializer
from .models import AcademicRecord
from .serializers import AcademicRecordSerializer
import pdfplumber
from django.core.files.storage import FileSystemStorage
import json
import logging
import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers import UserSerializer
from .serializers import LoginSerializer
from rest_framework.renderers import BaseRenderer
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class PDFRenderer(BaseRenderer):
    media_type = 'application/pdf'
    format = 'pdf'
    charset = None
    render_style = 'binary'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data

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
            
            # Initialize InferenceClient with token from .env
            client = InferenceClient(
                token=os.environ.get("HF_TOKEN"),
            )
            
            # Make API call to get response
            completion = client.chat.completions.create(
                model="moonshotai/Kimi-K2-Instruct",
                messages=[
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
            )
            
            reply_text = completion.choices[0].message.content
            
            if reply_text:
                logger.info(f"🤖 Model reply: {reply_text}")
                print(f"🤖 Model reply: {reply_text}")
                return JsonResponse({'reply': reply_text}, status=200)
            else:
                logger.error("❌ Failed to generate chatbot response")
                return JsonResponse({'error': 'Failed to generate chatbot response'}, status=500)
        
        except Exception as e:
            logger.error(f"❌ Error in chatbot_response: {e}")
            return JsonResponse({'error': f'Something went wrong: {str(e)}'}, status=500)
    
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
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    logger.info("🔧 user_details view triggered")
    try:
        user = request.user  # Authenticated user from token
        logger.info(f"🔐 Retrieved user: {user.username}")
        return Response({
            'username': user.username,
            'email': user.email,
        })
    except Exception as e:
        logger.error(f"❌ Error in user_details: {e}")
        return Response({'error': 'Something went wrong'}, status=500)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@renderer_classes([PDFRenderer])
def generate_resume(request):
    logger.info("🔧 generate_resume view triggered")
    try:
        user = request.user
        logger.info(f"🔐 Generating resume for user: {user.username}")

        # Fetch academic record
        try:
            academic_record = AcademicRecord.objects.get(user=user)
            academic_data = AcademicRecordSerializer(academic_record).data
        except AcademicRecord.DoesNotExist:
            academic_data = {
                'student_type': '',
                'gpa': None,
                'a_levels': [],
                'o_levels': [],
                'projects': [],
                'experiences': [],
                'certificates': [],
                'courses': [],
                'participations': []
            }

        # Fetch career assessment
        try:
            career_assessment = CareerAssessment.objects.get(user=user)
            career_data = CareerAssessmentSerializer(career_assessment).data
        except CareerAssessment.DoesNotExist:
            career_data = {
                'technical_skills': '',
                'other_technical_skill': '',
                'soft_skills': '',
                'other_soft_skill': '',
                'areas_of_interest': '',
                'exploration': '',
                'career_goals': ''
            }

        html_string = render_to_string('resume_template.html', {
            'user': user,
            'academic_record': academic_data,
            'career_assessment': career_data
        })

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="resume_{user.username}.pdf"'
        response['Content-Type'] = 'application/pdf'
        HTML(string=html_string).write_pdf(response)
        return response
    except Exception as e:
        logger.error(f"❌ Error in generate_resume: {str(e)}")
        logger.error(f"❌ Request headers: {dict(request.headers)}")
        return Response({'error': str(e)}, status=500)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def career_assessment_create(request):
    logger.info("🔧 Career assessment create view triggered")
    logger.debug(f"Request headers: {dict(request.headers)}")
    logger.debug(f"Request data: {request.data}")
    try:
        user = request.user
        logger.info(f"🔐 Saving assessment for user: {user.username}")
        serializer = CareerAssessmentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            logger.info(f"✅ Career assessment saved for user: {user.username}")
            return Response({'message': 'Career assessment submitted successfully'}, status=status.HTTP_201_CREATED)
        logger.error(f"❌ Validation error: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"❌ Error in career_assessment_create: {str(e)}")
        logger.error(f"❌ Request headers: {dict(request.headers)}")
        return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
def predict_job_role(request):
    logger.info("🔧 predict_job_role view triggered")
    if request.method == 'POST':
        try:
            # Check if a file is uploaded
            if 'cv' not in request.FILES:
                logger.warning("⚠️ No CV file uploaded")
                return JsonResponse({"error": "No CV file uploaded"}, status=400)
            
            cv_file = request.FILES['cv']
            # Validate file type
            if not cv_file.name.endswith('.pdf'):
                logger.warning("⚠️ Only PDF files are supported")
                return JsonResponse({"error": "Only PDF files are supported"}, status=400)
            
            # Save the uploaded file temporarily
            fs = FileSystemStorage(location='/tmp')
            filename = fs.save(cv_file.name, cv_file)
            file_path = os.path.join('/tmp', filename)
            
            logger.info(f"📄 Processing CV file: {filename}")
            # Extract text from PDF
            with pdfplumber.open(file_path) as pdf:
                text = ""
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                if not text.strip():
                    logger.warning("⚠️ No text extracted from PDF")
                    return JsonResponse({"error": "No text extracted from PDF"}, status=400)
            
            # Predict job role
            logger.info("🧠 Predicting job role from CV text")
            predicted_role = model_loader.predict_job_role(text)
            if predicted_role:
                response = {"predicted_role": predicted_role}
                if predicted_role == "Quality Assurance":
                    response["note"] = "Quality Assurance may correspond to Software Tester based on CV content."
                logger.info(f"🤖 Predicted job role: {predicted_role}")
                print(f"🤖 Predicted job role: {predicted_role}")
                return JsonResponse(response, status=200)
            else:
                logger.error("❌ Failed to predict job role due to label decoding error")
                return JsonResponse({"error": "Failed to predict job role due to label decoding error"}, status=500)
        
        except Exception as e:
            logger.error(f"❌ Error in predict_job_role: {e}")
            return JsonResponse({"error": f"Error processing CV: {str(e)}"}, status=500)
        
        finally:
            # Clean up temporary file
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"🗑️ Cleaned up temporary file: {file_path}")
    
    logger.warning("⚠️ Only POST requests are allowed")
    print("⚠️ Only POST requests are allowed")
    return JsonResponse({"error": "Only POST requests allowed"}, status=405)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def academic_record_create(request):
    logger.info("🔧 Academic record create view triggered")
    logger.debug(f"Request headers: {dict(request.headers)}")
    logger.debug(f"Request data: {request.data}")
    try:
        user = request.user
        logger.info(f"🔐 Saving academic record for user: {user.username}")
        serializer = AcademicRecordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            logger.info(f"✅ Academic record saved for user: {user.username}")
            return Response({
                'message': 'Academic record submitted successfully'
            }, status=status.HTTP_201_CREATED)
        logger.error(f"❌ Validation error: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"❌ Error in academic_record_create: {str(e)}")
        logger.error(f"❌ Request headers: {dict(request.headers)}")
        return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def academic_record_get(request):
    try:
        user = request.user
        try:
            academic_record = AcademicRecord.objects.get(user=user)
            serializer = AcademicRecordSerializer(academic_record)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AcademicRecord.DoesNotExist:
            return Response({
                'message': 'No academic record found'
            }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"❌ Error in academic_record_get: {str(e)}")
        return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def academic_record_update(request):
    logger.info("🔧 Academic record update view triggered")
    logger.debug(f"Request headers: {dict(request.headers)}")
    logger.debug(f"Request data: {request.data}")
    try:
        user = request.user
        try:
            academic_record = AcademicRecord.objects.get(user=user)
            serializer = AcademicRecordSerializer(academic_record, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                logger.info(f"✅ Academic record updated for user: {user.username}")
                return Response({
                    'message': 'Academic record updated successfully'
                }, status=status.HTTP_200_OK)
            logger.error(f"❌ Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AcademicRecord.DoesNotExist:
            return Response({
                'error': 'Academic record not found'
            }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"❌ Error in academic_record_update: {str(e)}")
        return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
