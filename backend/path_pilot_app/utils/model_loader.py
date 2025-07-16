import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM
from sklearn.preprocessing import LabelEncoder
import numpy as np
import os

class ModelLoader:
    def __init__(self, job_role_model_path, label_encoder_path, chatbot_model_path):
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
        
        # Load chatbot model (Flan-T5)
        try:
            self.chatbot_tokenizer = AutoTokenizer.from_pretrained(chatbot_model_path)
            self.chatbot_model = AutoModelForSeq2SeqLM.from_pretrained(
                chatbot_model_path,
                # Uncomment for 4-bit quantization if memory is limited
                # load_in_4bit=True
            )
        except Exception as e:
            raise Exception(f"Error loading chatbot model or tokenizer: {e}")
        
        # Move models to GPU if available
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.job_role_model.to(self.device)
        self.chatbot_model.to(self.device)
        
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
        input_text = f"question: {question}"
        inputs = self.chatbot_tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True).to(self.device)
        outputs = self.chatbot_model.generate(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=100,
            num_beams=5,
            early_stopping=True
        )
        return self.chatbot_tokenizer.decode(outputs[0], skip_special_tokens=True)

# Initialize model loader (load once at startup)
job_role_model_path = os.path.join(os.path.dirname(__file__), '/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/fine_tuned_model/content/fine_tuned_model')
label_encoder_path = os.path.join(os.path.dirname(__file__), '/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/label_encoder_classes.npy')
chatbot_model_path = os.path.join(os.path.dirname(__file__), '/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/flan-t5-small-finetuned')
model_loader = ModelLoader(job_role_model_path, label_encoder_path, chatbot_model_path)