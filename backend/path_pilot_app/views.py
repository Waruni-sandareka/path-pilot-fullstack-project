from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils.model_loader import generate_answer
import json
import logging

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