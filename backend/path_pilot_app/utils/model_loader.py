import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM, AutoModelForCausalLM, BitsAndBytesConfig
from sklearn.preprocessing import LabelEncoder
import numpy as np
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self, job_role_model_path, label_encoder_path, chatbot_model_path):
        # Define device as CPU explicitly
        self.device = torch.device("cpu")

        # Load job role prediction model (DistilBERT)
        try:
            self.job_role_tokenizer = AutoTokenizer.from_pretrained(job_role_model_path)
            self.job_role_model = AutoModelForSequenceClassification.from_pretrained(
                job_role_model_path,
                # Uncomment for 4-bit quantization if memory is limited
                # load_in_4bit=True
            )
        except Exception as e:
            raise Exception(f"Error loading job role model or tokenizer: {e}")
        
        # Load chatbot model (MiniChat-1.5-3B)
        try:
            logger.info("Loading chatbot tokenizer and model...")
            self.chatbot_tokenizer = AutoTokenizer.from_pretrained(chatbot_model_path)
            self.chatbot_model = AutoModelForCausalLM.from_pretrained(
                chatbot_model_path,
                torch_dtype=torch.float32,
                device_map=None
            ).to(self.device)
            logger.info("Chatbot model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading chatbot model or tokenizer: {e}")
            raise Exception(f"Error loading chatbot model or tokenizer: {e}")
        
        # Load label encoder for job role prediction
        try:
            self.label_encoder = LabelEncoder()
            self.label_encoder.classes_ = np.load(label_encoder_path, allow_pickle=True)
            print(f"Loaded label encoder classes: {self.label_encoder.classes_}")
        except Exception as e:
            raise Exception(f"Error loading label encoder: {e}")
    
    def predict_job_role(self, text):
        self.job_role_model.eval()
        inputs = self.job_role_tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            outputs = self.job_role_model(**inputs)
        logits = outputs.logits
        predicted_class = logits.argmax(-1).item()
        try:
            predicted_role = self.label_encoder.inverse_transform([predicted_class])[0]
            return predicted_role
        except ValueError as e:
            print(f"Error in label decoding: {e}. Predicted class {predicted_class} not in label encoder classes: {self.label_encoder.classes_}")
            return None
    
    def generate_chatbot_answer(self, question):
        self.chatbot_model.eval()
        logger.info(f"Generating answer for question: {question}")
        # Use MiniChat's prompt format
        input_text = f"<s>[INST] {question} [/INST]"
        logger.info(f"Input text to tokenizer: {input_text}")
        inputs = self.chatbot_tokenizer(input_text, return_tensors="pt", truncation=True, max_length=256).to(self.device)
        logger.info(f"Tokenized inputs: {inputs}")
        try:
            outputs = self.chatbot_model.generate(
                **inputs,
                max_length=256,
                num_return_sequences=1,
                temperature=0.7,
                top_p=0.9,
                do_sample=True
            )
            logger.info(f"Raw model output: {outputs}")
            response = self.chatbot_tokenizer.decode(outputs[0], skip_special_tokens=True)
            logger.info(f"Decoded response: {response}")
            # Extract the response after [/INST]
            if "[/INST]" in response:
                final_response = response.split("[/INST]")[-1].strip()
            else:
                final_response = response.strip()
                logger.warning("No [/INST] found in response, using full response")
            logger.info(f"Final response: {final_response}")
            return final_response
        except Exception as e:
            logger.error(f"Error generating chatbot answer: {str(e)}")
            return None

# Initialize model loader (load once at startup)
job_role_model_path = os.path.join(os.path.dirname(__file__), '/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/fine_tuned_model/content/fine_tuned_model')
label_encoder_path = os.path.join(os.path.dirname(__file__), '/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/label_encoder_classes.npy')
chatbot_model_path = os.path.join(os.path.dirname(__file__), '/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/minichat-finetuned-merged')
model_loader = ModelLoader(job_role_model_path, label_encoder_path, chatbot_model_path)