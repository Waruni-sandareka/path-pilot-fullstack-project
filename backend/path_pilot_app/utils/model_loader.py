from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

MODEL_PATH = "/home/waruni/path-pilot-full-stack-project-new/path-pilot-fullstack-project/backend/path_pilot_app/models/flan-t5-small-finetuned"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def generate_answer(question):
    input_text = f"question: {question}"  # Removed context from input
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True).to(device)
    outputs = model.generate(
        input_ids=inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_length=100,
        num_beams=5,
        early_stopping=True
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)