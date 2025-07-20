import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, MessageCircle, Zap, Target, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import '../Styles/JobRolePredictor.css';

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [jobResult, setJobResult] = useState(null);
  const [jobError, setJobError] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatResult, setChatResult] = useState(null);
  const [chatError, setChatError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setJobResult(null);
      setJobError(null);
      alert(`${selectedFile.name} is ready for analysis`); // Replace toast with alert for simplicity
    }
  };

  const handleCVSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setJobError('Please select a PDF file');
      alert('Please select a PDF file first');
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await axios.post('http://localhost:8000/api/predict-job-role/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setJobResult(response.data);
      setJobError(null);
      alert('Analysis Complete: Your career prediction is ready!');
    } catch (err) {
      setJobError(err.response?.data?.error || 'An error occurred');
      setJobResult(null);
      alert('Analysis Failed: There was an error analyzing your CV');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setChatResult(null);
    setChatError(null);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setChatError('Please enter a question');
      alert('Please enter a question first');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/chatbot_response/', { message: question });
      setChatResult(response.data);
      setChatError(null);
      alert('Answer Generated: Your career guidance is ready!');
    } catch (err) {
      setChatError(err.response?.data?.error || 'An error occurred');
      setChatResult(null);
      alert('Error: Failed to get career guidance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="container">
          {/* Header Section */}
          <div className="header-section">
            <div className="header-icon">
              <Target className="icon" />
            </div>
            <h1 className="header-title">Career Path Pilot</h1>
            <p className="header-description">
              Unlock your potential with AI-powered career insights. Upload your CV and get personalized job role predictions.
            </p>
          </div>

          <div className="content-grid">
            {/* CV Upload Section */}
            <div className="card">
              <div className="card-header">
                <div className="card-header-content">
                  <div className="card-icon">
                    <Upload className="icon" />
                  </div>
                  <div>
                    <h2 className="card-title">CV Analysis</h2>
                    <p className="card-description">Upload your CV to predict your ideal job role</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <form onSubmit={handleCVSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="cv" className="form-label">Select Your CV (PDF only)</label>
                    <div className="form-input-container">
                      <input
                        type="file"
                        id="cv"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="file-input"
                      />
                      {file && (
                        <div className="file-selected">
                          <FileText className="icon small" />
                          <span className="file-name">{file.name}</span>
                          <CheckCircle className="icon small success" />
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !file}
                    className={`submit-button ${loading || !file ? 'disabled' : ''}`}
                  >
                    {loading ? (
                      <div className="loading">
                        <div className="spinner"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="button-content">
                        <Zap className="icon small" />
                        Predict Job Role
                      </div>
                    )}
                  </button>
                </form>

                {jobResult && (
                  <div className="result success">
                    <div className="result-content">
                      <div className="result-icon">
                        <TrendingUp className="icon small" />
                      </div>
                      <div>
                        <h4 className="result-title">Predicted Job Role: {jobResult.predicted_role}</h4>
                        {jobResult.note && (
                          <p className="result-description">{jobResult.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {jobError && (
                  <div className="result error">
                    <div className="result-content">
                      <AlertCircle className="icon small error" />
                      <div>
                        <h4 className="result-title">Analysis Error</h4>
                        <p className="result-description">{jobError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chatbot Section */}
            <div className="card">
              <div className="card-header">
                <div className="card-header-content">
                  <div className="card-icon">
                    <MessageCircle className="icon" />
                  </div>
                  <div>
                    <h2 className="card-title">Career Guidance</h2>
                    <p className="card-description">Ask questions about your career path</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <form onSubmit={handleChatSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="question" className="form-label">What would you like to know?</label>
                    <input
                      type="text"
                      id="question"
                      value={question}
                      onChange={handleQuestionChange}
                      className="text-input"
                      placeholder="E.g., What skills are needed for a Software Engineer?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className={`submit-button ${loading || !question.trim() ? 'disabled' : ''}`}
                  >
                    {loading ? (
                      <div className="loading">
                        <div className="spinner"></div>
                        Thinking...
                      </div>
                    ) : (
                      <div className="button-content">
                        <MessageCircle className="icon small" />
                        Get Career Advice
                      </div>
                    )}
                  </button>
                </form>

                {chatResult && (
                  <div className="result success">
                    <div className="result-content">
                      <div className="result-icon">
                        <MessageCircle className="icon small" />
                      </div>
                      <div>
                        <h4 className="result-title">Career Guidance</h4>
                        <p className="result-description">{chatResult.reply}</p>
                      </div>
                    </div>
                  </div>
                )}

                {chatError && (
                  <div className="result error">
                    <div className="result-content">
                      <AlertCircle className="icon small error" />
                      <div>
                        <h4 className="result-title">Error</h4>
                        <p className="result-description">{chatError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
                <div className="features-grid">
            {[
              {
                icon: Target,
                title: "AI-Powered Analysis",
                description: "Advanced algorithms analyze your CV to predict the most suitable job roles"
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description: "Get insights based on current job market trends and industry demands"
              },
              {
                icon: MessageCircle,
                title: "Expert Guidance",
                description: "Receive personalized career advice and skill development recommendations"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon className="icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVUpload;