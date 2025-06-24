from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from transformers import pipeline
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

CAREER_CONTEXT = (
    "The IT industry encompasses a wide range of job roles, including Software Engineer, Data Scientist, DevOps Engineer, "
    "Cybersecurity Analyst, IT Project Manager, Cloud Architect, Full-Stack Developer, Machine Learning Engineer, "
    "Blockchain Developer, and UI/UX Designer. Software Engineers build scalable applications using Python, Java, JavaScript, "
    "TypeScript, C++, Go, and frameworks like Django, Flask, React, Vue.js, Spring Boot, or .NET Core. They master version "
    "control with Git, develop APIs (REST, GraphQL, gRPC), and work with databases like PostgreSQL, MongoDB, or Redis. "
    "Data Scientists leverage Python, R, SQL, Julia, and tools like TensorFlow, PyTorch, Scikit-learn, or Apache Spark for "
    "machine learning, statistical analysis, and data visualization with Tableau, Power BI, or Matplotlib. DevOps Engineers "
    "optimize CI/CD pipelines using Jenkins, GitHub Actions, GitLab CI, and containerization with Docker and Kubernetes, "
    "while managing infrastructure on AWS (EC2, S3, Lambda), Azure, or GCP. Cybersecurity Analysts secure systems with tools "
    "like Splunk, Nessus, Burp Suite, and adopt DevSecOps practices, holding certifications like CompTIA Security+, CISSP, "
    "Certified Ethical Hacker (CEH), or Offensive Security Certified Professional (OSCP). Cloud Architects design resilient "
    "cloud solutions, earning certifications like AWS Certified Solutions Architect, Microsoft Azure Solutions Architect, "
    "or Google Cloud Professional Architect. Full-Stack Developers handle front-end (React, Angular, HTML5, CSS3, Tailwind CSS) "
    "and back-end (Node.js, Express, Django, Ruby on Rails) development, integrating databases and cloud services. "
    "Machine Learning Engineers specialize in deep learning, NLP, and computer vision, using frameworks like PyTorch, "
    "TensorFlow, or Hugging Face Transformers, and deploy models with ONNX or SageMaker. Blockchain Developers build "
    "decentralized applications with Solidity, Rust, or Hyperledger, focusing on smart contracts and Web3 technologies. "
    "UI/UX Designers craft intuitive interfaces using Figma, Sketch, Adobe XD, and apply usability testing and accessibility "
    "standards (WCAG). A career path for a Software Engineer typically starts with a Computer Science degree, coding bootcamps, "
    "or self-learning, followed by internships and contributions to open-source projects on GitHub. Data Scientists often hold "
    "advanced degrees (MSc/PhD) in Data Science, Mathematics, or Statistics, and pursue certifications like Google Data Analytics, "
    "Microsoft Certified: Data Analyst Associate, or AWS Certified Big Data. DevOps Engineers transition from system administration "
    "or development roles, mastering tools like Terraform, Ansible, and Prometheus. To become a Machine Learning Engineer, "
    "complete MOOCs on Coursera, Udacity, or fast.ai, and build a portfolio of Kaggle competitions or research papers. "
    "For resume building, showcase measurable achievements (e.g., 'Reduced API latency by 30% using Redis caching'), a GitHub "
    "portfolio, and certifications. Interview preparation includes solving algorithmic problems on LeetCode, HackerRank, or "
    "Codeforces, practicing system design (e.g., designing a scalable e-commerce platform), and using the STAR method for "
    "behavioral questions. Soft skills like communication, adaptability, and collaboration are essential for all roles. "
    "Emerging IT trends include quantum computing, edge AI, serverless architectures, and zero-trust security frameworks. "
    "The global job market offers remote work opportunities, with companies like Google, Amazon, and startups hiring globally. "
    "Salaries vary by region and experience: Software Engineers earn $80,000-$180,000 in the US, $40,000-$100,000 in Europe, "
    "and $20,000-$60,000 in South Asia; Data Scientists earn $90,000-$200,000 in the US, $50,000-$120,000 in Europe; "
    "Cybersecurity Analysts earn $70,000-$150,000 in the US. Freelancing platforms like Upwork and Fiverr offer opportunities "
    "for UI/UX Designers and Full-Stack Developers, with hourly rates of $30-$150."
)

qa_pipeline = pipeline('question-answering', model='deepset/roberta-base-squad2')

@csrf_exempt
def chatbot_response(request):
    logger.info("🔧 chatbot_response view triggered")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message', '')
            logger.info(f"🧠 Received message from user: {user_message}")
            result = qa_pipeline(question=user_message, context=CAREER_CONTEXT)
            reply_text = result['answer'] #if result['score'] > 0.5 else "Sorry, I couldn't find a relevant answer. Try asking about IT job roles, skills, or certifications."
            logger.info(f"🤖 Hugging Face reply: {reply_text}")
            print(f"🤖 Hugging Face reply: {reply_text}")
            return JsonResponse({'reply': reply_text})
        except Exception as e:
            logger.error(f"❌ Error in chatbot_response: {e}")
            return JsonResponse({'error': 'Something went wrong'}, status=500)
    logger.warning("⚠️ Only POST requests are allowed")
    print("⚠️ Only POST requests are allowed")
    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)