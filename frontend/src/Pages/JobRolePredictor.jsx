import React, { useState } from 'react';
import axios from 'axios';

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [jobResult, setJobResult] = useState(null);
  const [jobError, setJobError] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatResult, setChatResult] = useState(null);
  const [chatError, setChatError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle CV file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setJobResult(null);
    setJobError(null);
  };

  const handleCVSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setJobError('Please select a PDF file');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await axios.post('http://localhost:8000/api/predict-job-role/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setJobResult(response.data);
      setJobError(null);
    } catch (err) {
      setJobError(err.response?.data?.error || 'An error occurred');
      setJobResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle chatbot question
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setChatResult(null);
    setChatError(null);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setChatError('Please enter a question');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/chatbot/', { message: question });
      setChatResult(response.data);
      setChatError(null);
    } catch (err) {
      setChatError(err.response?.data?.error || 'An error occurred');
      setChatResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Career Path Pilot</h2>
      
      {/* CV Upload Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload CV to Predict Job Role</h3>
        <form onSubmit={handleCVSubmit} className="space-y-4">
          <div>
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
              Select CV (PDF only)
            </label>
            <input
              type="file"
              id="cv"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Predict Job Role'}
          </button>
        </form>
        {jobResult && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <p className="text-lg font-semibold">Predicted Job Role: {jobResult.predicted_role}</p>
            {jobResult.note && <p className="text-sm text-gray-600">{jobResult.note}</p>}
          </div>
        )}
        {jobError && (
          <div className="mt-4 p-4 bg-red-100 rounded-md">
            <p className="text-lg font-semibold text-red-600">Error: {jobError}</p>
          </div>
        )}
      </div>

      {/* Chatbot Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Ask a Career Question</h3>
        <form onSubmit={handleChatSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">
              Enter your question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestionChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g., What skills are needed for a Software Tester?"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Get Answer'}
          </button>
        </form>
        {chatResult && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <p className="text-lg font-semibold">Answer: {chatResult.reply}</p>
          </div>
        )}
        {chatError && (
          <div className="mt-4 p-4 bg-red-100 rounded-md">
            <p className="text-lg font-semibold text-red-600">Error: {chatError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVUpload;