import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import '../Styles/Trends.css';
import { FaRobot, FaDatabase, FaShieldAlt, FaCloud, FaPencilRuler, FaCode, FaTools } from 'react-icons/fa';


const mockData = [
  { title: 'AI Engineer', searchVolume: 85 },
  { title: 'Data Scientist', searchVolume: 78 },
  { title: 'Cybersecurity Specialist', searchVolume: 65 },
  { title: 'Cloud Architect', searchVolume: 62 },
  { title: 'UX Designer', searchVolume: 58 },
  { title: 'Full Stack Developer', searchVolume: 54 },
  { title: 'DevOps Engineer', searchVolume: 49 }
];

const COLORS = [
  '#9C27B0', // Deep Orchid
  '#AB47BC', // Mulberry
  '#8E24AA', // Plum
  '#7B1FA2', // Violet
  '#EC407A', // Fuchsia
  '#D81B60', // Rose
  '#BA68C8'  // Mauve
];


function Trends() {
  return (
    <div className="trends-container">
      <h1><FaChartLine style={{ marginRight: '10px' }} />Real-Time Career Trends</h1>

      <div className="analytics-info">
        <div className="analytics-info">

 
  <h3>Career Analytics Summary</h3>
  <ul className="analytics-list">
    <li>
      <FaRobot className="analytics-icon" />
      <div className="analytics-content">
        <strong>AI Engineers (Search Volume: 85)</strong>
        <p>
          Driving the next wave of technological innovation, AI Engineers develop machine learning models and intelligent systems that transform industries such as healthcare, finance, and robotics. Their skills in neural networks, natural language processing, and computer vision make them highly sought-after experts.
        </p>
      </div>
    </li>
    <li>
      <FaDatabase className="analytics-icon" />
      <div className="analytics-content">
        <strong>Data Scientists (Search Volume: 78)</strong>
        <p>
          Data Scientists analyze complex datasets to extract actionable insights that guide strategic decisions. Expertise in statistics, data mining, and predictive analytics enable organizations to optimize operations, improve products, and identify new business opportunities.
        </p>
      </div>
    </li>
    <li>
      <FaShieldAlt className="analytics-icon" />
      <div className="analytics-content">
        <strong>Cybersecurity Specialists (Search Volume: 65)</strong>
        <p>
          With cyber threats growing more sophisticated, cybersecurity professionals protect systems, networks, and data from breaches. Their roles include threat assessment, incident response, and designing secure architectures, essential for safeguarding sensitive information.
        </p>
      </div>
    </li>
    <li>
      <FaCloud className="analytics-icon" />
      <div className="analytics-content">
        <strong>Cloud Architects (Search Volume: 62)</strong>
        <p>
          Cloud Architects design and manage scalable cloud infrastructure solutions, enabling businesses to increase agility and reduce IT costs. Their expertise spans platforms like AWS, Azure, and Google Cloud, ensuring reliable and efficient cloud deployment.
        </p>
      </div>
    </li>
    <li>
      <FaPencilRuler className="analytics-icon" />
      <div className="analytics-content">
        <strong>UX Designers (Search Volume: 58)</strong>
        <p>
          UX Designers focus on creating intuitive and engaging digital experiences. By conducting user research and designing user flows, they improve usability and customer satisfaction across websites, apps, and software products.
        </p>
      </div>
    </li>
    <li>
      <FaCode className="analytics-icon" />
      <div className="analytics-content">
        <strong>Full Stack Developers (Search Volume: 54)</strong>
        <p>
          Full Stack Developers are versatile engineers proficient in both front-end and back-end technologies. They build complete web applications, bridging design and server logic to deliver seamless digital solutions.
        </p>
      </div>
    </li>
    <li>
      <FaTools className="analytics-icon" />
      <div className="analytics-content">
        <strong>DevOps Engineers (Search Volume: 49)</strong>
        <p>
          DevOps Engineers streamline development and operations by automating deployment pipelines, monitoring systems, and improving collaboration between teams. Their work accelerates software delivery and enhances system reliability.
        </p>
      </div>
    </li>
  </ul>
</div>
</div>


      <div className="chart-section">
        <h3>Top Career Search Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="searchVolume" fill="#9C27B0" />


          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Career Trend Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockData}
              dataKey="searchVolume"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {mockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Trends;
