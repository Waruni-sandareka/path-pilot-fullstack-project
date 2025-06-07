from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import google.generativeai as genai
from django.conf import settings
import logging

# Optional: configure logging level (can be configured globally too)
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

@csrf_exempt
def chatbot_response(request):
    logger.info("🔧 chatbot_response view triggered")

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message', '')
            logger.info(f"🧠 Received message from user: {user_message}")

            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(user_message)

            reply_text = response.text if response else "Sorry, I couldn't generate a response."
            logger.info(f"🤖 Gemini reply: {reply_text}")
            print(f"🤖 Gemini reply: {reply_text}")

            return JsonResponse({'reply': reply_text})

        except Exception as e:
            logger.error(f"❌ Error in chatbot_response: {e}")
            return JsonResponse({'error': 'Something went wrong'}, status=500)

    logger.warning("⚠️ Only POST requests are allowed")
    print("⚠️ Only POST requests are allowed")
    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)
