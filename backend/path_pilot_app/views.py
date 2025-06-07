from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
import logging
import requests

# Configure logging
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

            # Add a career guidance prompt for better responses
            prompt = f"You are a career guidance expert. Provide concise and professional advice: {user_message}"

            # Call Hugging Face Inference API
            headers = {
                "Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}",
                "Content-Type": "application/json"
            }
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_length": 100,  # Limit response length for efficiency
                    "num_return_sequences": 1,
                    "top_k": 50,  # Control response diversity
                    "top_p": 0.95,  # Nucleus sampling for quality
                    "temperature": 0.7  # Balance creativity and coherence
                }
            }
            api_url = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"  # Use desired model
            response = requests.post(api_url, headers=headers, json=payload)
            response.raise_for_status()  # Raise error for failed requests

            # Extract and clean the response
            reply_text = response.json()[0]["generated_text"].replace(prompt, '').strip()
            logger.info(f"🤖 Hugging Face Inference API reply: {reply_text}")

            return JsonResponse({'reply': reply_text})

        except requests.exceptions.RequestException as e:
            logger.error(f"❌ API request failed: {e}")
            return JsonResponse({'error': 'Failed to connect to Hugging Face API'}, status=500)
        except Exception as e:
            logger.error(f"❌ Error in chatbot_response: {e}")
            return JsonResponse({'error': 'Something went wrong'}, status=500)

    logger.warning("⚠️ Only POST requests are allowed")
    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)