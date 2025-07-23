import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GraduationCap, Award, Building, Code, Trophy, Check } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import '../Styles/AcademicRecords.css';
import undergraduateImage from '../assets/img/waruni.jpg';
import schoolImage from '../assets/img/circle1.jpg';

const AcademicRecords = () => {
  const [studentType, setStudentType] = useState('');
  const [gpa, setGpa] = useState('');
  const [aLevels, setALevels] = useState([{ subject: '', grade: '' }]);
  const [oLevels, setOLevels] = useState([{ subject: '', grade: '' }]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [toast, setToast] = useState({ show: false, title: '', description: '' });

  const addALevel = () => {
    setALevels([...aLevels, { subject: '', grade: '' }]);
  };

  const removeALevel = (index) => {
    setALevels(aLevels.filter((_, i) => i !== index));
  };

  const updateALevel = (index, field, value) => {
    const updated = aLevels.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setALevels(updated);
  };

  const addOLevel = () => {
    setOLevels([...oLevels, { subject: '', grade: '' }]);
  };

  const removeOLevel = (index) => {
    setOLevels(oLevels.filter((_, i) => i !== index));
  };

  const updateOLevel = (index, field, value) => {
    const updated = oLevels.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setOLevels(updated);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      duration: ''
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id, field, value) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addCertificate = () => {
    const newCertificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    };
    setCertificates([...certificates, newCertificate]);
  };

  const removeCertificate = (id) => {
    setCertificates(certificates.filter(c => c.id !== id));
  };

  const updateCertificate = (id, field, value) => {
    setCertificates(certificates.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => {
    const newCourse = {
      id: Date.now().toString(),
      name: '',
      provider: '',
      duration: '',
      completionDate: ''
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addParticipation = () => {
    const newParticipation = {
      id: Date.now().toString(),
      event: '',
      type: '',
      achievement: '',
      date: ''
    };
    setParticipations([...participations, newParticipation]);
  };

  const removeParticipation = (id) => {
    setParticipations(participations.filter(p => p.id !== id));
  };

  const updateParticipation = (id, field, value) => {
    setParticipations(participations.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const showToast = (title, description) => {
    setToast({ show: true, title, description });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, title: '', description: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSave = () => {
    showToast(
      "Academic Records Saved",
      "Your academic information has been successfully saved."
    );
  };

  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
  const aLevelGrades = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'];

  return (
    <div className="academic-container">
      <Sidebar />
      
      <main className="academic-main">
        <div className="academic-content">
          <div className="academic-header">
            <h1 className="academic-title">
              Academic Records
            </h1>
            <p className="academic-subtitle">
              Manage your educational achievements and experiences
            </p>
          </div>

          {/* Toast Notification */}
          {toast.show && (
            <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in">
              <h3 className="font-bold">{toast.title}</h3>
              <p>{toast.description}</p>
            </div>
          )}

          <div className="academic-card">
            <div className="card-header">
              <h2 className="card-title">
                <GraduationCap className="icon-lg" />
                Choose Your Student Type
              </h2>
            </div>
            <div className="card-content">
              <div className="student-selection">
                <div 
                  className={`student-option ${studentType === 'undergraduate' ? 'selected' : ''}`}
                  onClick={() => setStudentType('undergraduate')}
                >
                  <div className="selection-check">
                    <Check />
                  </div>
                  <div className="student-image-container">
                    <img 
                      src={undergraduateImage} 
                      alt="Undergraduate Student" 
                      className="student-image"
                    />
                  </div>
                  <div className="student-info">
                    <h3 className="student-type-title">Undergraduate Student</h3>
                    <p className="student-type-description">
                      University-level education with GPA tracking, advanced projects, and industrial experience
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`student-option ${studentType === 'school' ? 'selected' : ''}`}
                  onClick={() => setStudentType('school')}
                >
                  <div className="selection-check">
                    <Check />
                  </div>
                  <div className="student-image-container">
                    <img 
                      src={schoolImage} 
                      alt="School Student" 
                      className="student-image"
                    />
                  </div>
                  <div className="student-info">
                    <h3 className="student-type-title">School Student (Gen Z)</h3>
                    <p className="student-type-description">
                      High school education with A/O Level results, competitions, and extracurricular activities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {studentType && (
            <div className="tabs-container">
              <div className="tabs-list">
                <button 
                  className={`tab-trigger ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Info
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => setActiveTab('experience')}
                >
                  Experience
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'certificates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('certificates')}
                >
                  Certificates
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  Courses
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'events' ? 'active' : ''}`}
                  onClick={() => setActiveTab('events')}
                >
                  Events
                </button>
              </div>

              {activeTab === 'basic' && (
                <div className="flex-col">
                  {studentType === 'undergraduate' && (
                    <div className="academic-card">
                      <div className="card-header">
                        <h2 className="card-title">GPA Information</h2>
                      </div>
                      <div className="card-content">
                        <div className="form-group">
                          <label className="form-label" htmlFor="gpa">Current GPA</label>
                          <input
                            id="gpa"
                            type="number"
                            step="0.01"
                            min="0"
                            max="4.0"
                            className="form-input"
                            value={gpa}
                            onChange={(e) => setGpa(e.target.value)}
                            placeholder="3.75"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="academic-card">
                    <div className="card-header">
                      <h2 className="card-title">Advanced Level Results</h2>
                    </div>
                    <div className="card-content">
                      {aLevels.map((aLevel, index) => (
                        <div key={index} className="subject-row">
                          <div className="subject-input">
                            <input
                              className="form-input"
                              placeholder="Subject"
                              value={aLevel.subject}
                              onChange={(e) => updateALevel(index, 'subject', e.target.value)}
                            />
                          </div>
                          <div className="grade-select">
                            <select 
                              className="form-select"
                              value={aLevel.grade} 
                              onChange={(e) => updateALevel(index, 'grade', e.target.value)}
                            >
                              <option value="">Grade</option>
                              {aLevelGrades.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </div>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeALevel(index)}
                            disabled={aLevels.length === 1}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                      ))}
                      <button onClick={addALevel} className="btn btn-outline" style={{width: '100%'}}>
                        <Plus className="icon" />
                        Add A-Level Subject
                      </button>
                    </div>
                  </div>

                  <div className="academic-card">
                    <div className="card-header">
                      <h2 className="card-title">Ordinary Level Results</h2>
                    </div>
                    <div className="card-content">
                      {oLevels.map((oLevel, index) => (
                        <div key={index} className="subject-row">
                          <div className="subject-input">
                            <input
                              className="form-input"
                              placeholder="Subject"
                              value={oLevel.subject}
                              onChange={(e) => updateOLevel(index, 'subject', e.target.value)}
                            />
                          </div>
                          <div className="grade-select">
                            <select 
                              className="form-select"
                              value={oLevel.grade} 
                              onChange={(e) => updateOLevel(index, 'grade', e.target.value)}
                            >
                              <option value="">Grade</option>
                              {grades.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </div>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeOLevel(index)}
                            disabled={oLevels.length === 1}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                      ))}
                      <button onClick={addOLevel} className="btn btn-outline" style={{width: '100%'}}>
                        <Plus className="icon" />
                        Add O-Level Subject
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="academic-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      <Code className="icon-lg" />
                      University Projects
                    </h2>
                  </div>
                  <div className="card-content">
                    {projects.map((project) => (
                      <div key={project.id} className="project-item">
                        <div className="project-header">
                          <h4 className="project-title">Project {projects.indexOf(project) + 1}</h4>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeProject(project.id)}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Project Title</label>
                            <input
                              className="form-input"
                              value={project.title}
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              placeholder="e.g., E-commerce Platform"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Duration</label>
                            <input
                              className="form-input"
                              value={project.duration}
                              onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
                              placeholder="e.g., 3 months"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-textarea"
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            placeholder="Describe your project..."
                            rows={3}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Technologies Used (comma-separated)</label>
                          <input
                            className="form-input"
                            value={project.technologies.join(', ')}
                            onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', '))}
                            placeholder="React, Node.js, MongoDB"
                          />
                          <div className="badge-container">
                            {project.technologies.filter(tech => tech.trim()).map((tech, index) => (
                              <span key={index} className="badge">{tech.trim()}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addProject} className="btn btn-outline" style={{width: '100%'}}>
                      <Plus className="icon" />
                      Add Project
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="academic-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      <Building className="icon-lg" />
                      Industrial Experience
                    </h2>
                  </div>
                  <div className="card-content">
                    {experiences.map((experience) => (
                      <div key={experience.id} className="project-item">
                        <div className="project-header">
                          <h4 className="project-title">Experience {experiences.indexOf(experience) + 1}</h4>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeExperience(experience.id)}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Company</label>
                            <input
                              className="form-input"
                              value={experience.company}
                              onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                              placeholder="Company name"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Position</label>
                            <input
                              className="form-input"
                              value={experience.position}
                              onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                              placeholder="Job title"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Duration</label>
                          <input
                            className="form-input"
                            value={experience.duration}
                            onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                            placeholder="e.g., June 2023 - August 2023"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-textarea"
                            value={experience.description}
                            onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    <button onClick={addExperience} className="btn btn-outline" style={{width: '100%'}}>
                      <Plus className="icon" />
                      Add Experience
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="academic-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      <Award className="icon-lg" />
                      Certificates
                    </h2>
                  </div>
                  <div className="card-content">
                    {certificates.map((certificate) => (
                      <div key={certificate.id} className="project-item">
                        <div className="project-header">
                          <h4 className="project-title">Certificate {certificates.indexOf(certificate) + 1}</h4>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeCertificate(certificate.id)}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Certificate Name</label>
                            <input
                              className="form-input"
                              value={certificate.name}
                              onChange={(e) => updateCertificate(certificate.id, 'name', e.target.value)}
                              placeholder="e.g., AWS Solutions Architect"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Issuing Organization</label>
                            <input
                              className="form-input"
                              value={certificate.issuer}
                              onChange={(e) => updateCertificate(certificate.id, 'issuer', e.target.value)}
                              placeholder="e.g., Amazon Web Services"
                            />
                          </div>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Issue Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={certificate.date}
                              onChange={(e) => updateCertificate(certificate.id, 'date', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Credential ID (Optional)</label>
                            <input
                              className="form-input"
                              value={certificate.credentialId}
                              onChange={(e) => updateCertificate(certificate.id, 'credentialId', e.target.value)}
                              placeholder="Certificate ID"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addCertificate} className="btn btn-outline" style={{width: '100%'}}>
                      <Plus className="icon" />
                      Add Certificate
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="academic-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      <GraduationCap className="icon-lg" />
                      Online Courses
                    </h2>
                  </div>
                  <div className="card-content">
                    {courses.map((course) => (
                      <div key={course.id} className="project-item">
                        <div className="project-header">
                          <h4 className="project-title">Course {courses.indexOf(course) + 1}</h4>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeCourse(course.id)}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Course Name</label>
                            <input
                              className="form-input"
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                              placeholder="e.g., Machine Learning Fundamentals"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Provider</label>
                            <input
                              className="form-input"
                              value={course.provider}
                              onChange={(e) => updateCourse(course.id, 'provider', e.target.value)}
                              placeholder="e.g., Coursera, Udemy"
                            />
                          </div>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Duration</label>
                            <input
                              className="form-input"
                              value={course.duration}
                              onChange={(e) => updateCourse(course.id, 'duration', e.target.value)}
                              placeholder="e.g., 40 hours"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Completion Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={course.completionDate}
                              onChange={(e) => updateCourse(course.id, 'completionDate', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addCourse} className="btn btn-outline" style={{width: '100%'}}>
                      <Plus className="icon" />
                      Add Course
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div className="academic-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      <Trophy className="icon-lg" />
                      Hackathons & Competitions
                    </h2>
                  </div>
                  <div className="card-content">
                    {participations.map((participation) => (
                      <div key={participation.id} className="project-item">
                        <div className="project-header">
                          <h4 className="project-title">Event {participations.indexOf(participation) + 1}</h4>
                          <button 
                            className="btn btn-destructive btn-icon"
                            onClick={() => removeParticipation(participation.id)}
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Event Name</label>
                            <input
                              className="form-input"
                              value={participation.event}
                              onChange={(e) => updateParticipation(participation.id, 'event', e.target.value)}
                              placeholder="e.g., Google Solution Challenge"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Event Type</label>
                            <select 
                              className="form-select"
                              value={participation.type} 
                              onChange={(e) => updateParticipation(participation.id, 'type', e.target.value)}
                            >
                              <option value="">Select type</option>
                              <option value="hackathon">Hackathon</option>
                              <option value="competition">Competition</option>
                              <option value="conference">Conference</option>
                              <option value="workshop">Workshop</option>
                              <option value="symposium">Symposium</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Achievement/Position</label>
                            <input
                              className="form-input"
                              value={participation.achievement}
                              onChange={(e) => updateParticipation(participation.id, 'achievement', e.target.value)}
                              placeholder="e.g., 1st Place, Participant"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={participation.date}
                              onChange={(e) => updateParticipation(participation.id, 'date', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addParticipation} className="btn btn-outline" style={{width: '100%'}}>
                      <Plus className="icon" />
                      Add Participation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {studentType && (
            <div className="save-section">
              <button onClick={handleSave} className="btn btn-primary">
                <Award className="icon" />
                Save Academic Records
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AcademicRecords;