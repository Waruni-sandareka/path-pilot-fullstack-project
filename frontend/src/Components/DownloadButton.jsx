import React, { useState, useEffect } from 'react';
import { Download, Sparkles } from 'lucide-react';
import '../Styles/ResumeBuilder.css';

const DownloadButton = ({ onDownload, username }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', description: '', isError: false });

  const handleClick = async () => {
    setIsDownloading(true);
    try {
      await onDownload();
      setToast({
        show: true,
        title: 'Resume Generated! 🎉',
        description: 'Your professional resume has been downloaded successfully.',
        isError: false,
      });
    } catch (error) {
      setToast({
        show: true,
        title: 'Download Failed',
        description: 'There was an error generating your resume. Please try again.',
        isError: true,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, title: '', description: '', isError: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <div className="download-button-container">
      {toast.show && (
        <div className={`toast-notification ${toast.isError ? 'toast-error' : 'toast-success'}`}>
          <h3 className="toast-title">{toast.title}</h3>
          <p className="toast-description">{toast.description}</p>
        </div>
      )}
      <button
        onClick={handleClick}
        disabled={isDownloading}
        className={`download-button ${isDownloading ? 'downloading' : ''}`}
      >
        <div className="download-button-content">
          {isDownloading ? (
            <>
              <div className="spinner" />
              <span>Generating Resume...</span>
            </>
          ) : (
            <>
              <Download className="download-icon" />
              <span>Build My Resume</span>
              <Sparkles className="sparkle-icon" />
            </>
          )}
        </div>
        <div className="download-button-overlay" />
      </button>
      <div className="particles-container">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DownloadButton;