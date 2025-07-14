import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import '../Styles/Trends.css';

const mockData = [
  { title: 'AI Engineer', searchVolume: 85 },
  { title: 'Data Scientist', searchVolume: 78 },
  { title: 'Cybersecurity Specialist', searchVolume: 65 },
  { title: 'Cloud Architect', searchVolume: 62 },
  { title: 'UX Designer', searchVolume: 58 },
  { title: 'Full Stack Developer', searchVolume: 54 },
  { title: 'DevOps Engineer', searchVolume: 49 }
];

const COLORS = ['#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50'];

function Trends() {
  return (
    <div className="trends-container">
      <h1> Real-Time Career Trends</h1>

      <div className="chart-section">
        <h3>Top Career Search Volume </h3>
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
              fill="#8884d8"
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
