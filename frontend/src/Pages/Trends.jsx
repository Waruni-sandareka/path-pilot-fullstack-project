import React from 'react';
import {
  FaChartLine,
  FaRobot,
  FaDatabase,
  FaShieldAlt,
  FaCloud,
  FaPencilRuler,
  FaCode,
  FaTools,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Sidebar from '../Components/Sidebar'; // Your existing Sidebar component
import '../Styles/Trends.css';

const mockData = [
  { title: 'AI Engineer', searchVolume: 85 },
  { title: 'Data Scientist', searchVolume: 78 },
  { title: 'Cybersecurity Specialist', searchVolume: 65 },
  { title: 'Cloud Architect', searchVolume: 62 },
  { title: 'UX Designer', searchVolume: 58 },
  { title: 'Full Stack Developer', searchVolume: 54 },
  { title: 'DevOps Engineer', searchVolume: 49 },
];

const COLORS = [
  '#9C27B0',
  '#AB47BC',
  '#8E24AA',
  '#7B1FA2',
  '#EC407A',
  '#D81B60',
  '#BA68C8',
];

const ICONS = [
  FaRobot,
  FaDatabase,
  FaShieldAlt,
  FaCloud,
  FaPencilRuler,
  FaCode,
  FaTools,
];

const descriptions = [
  'Driving the next wave of technological innovation...',
  'Data Scientists analyze complex datasets...',
  'With cyber threats growing...',
  'Cloud Architects design and manage...',
  'UX Designers focus on creating intuitive...',
  'Full Stack Developers build complete web...',
  'DevOps Engineers streamline development...',
];

function Trends() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="trends-container">
        <h1>
          <FaChartLine style={{ marginRight: '10px' }} />
          Real-Time Career Trends
        </h1>

        <div className="charts-row">
          <div className="chart-section">
            <h3>Top Career Search Volume</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }} barCategoryGap="25%">
                <CartesianGrid stroke="#ddd9e4" strokeDasharray="2 2" />
                <XAxis dataKey="title" tick={{ fill: '#5a5273', fontSize: 12 }} />
                <YAxis tick={{ fill: '#5a5273', fontSize: 12 }} />
                <Tooltip
                  wrapperStyle={{ borderRadius: 6 }}
                  contentStyle={{
                    backgroundColor: '#f7f6f9',
                    borderRadius: 6,
                    border: 'none',
                    boxShadow: '0 2px 6px rgba(58,44,74,0.15)',
                  }}
                />
                <Bar dataKey="searchVolume" fill="#7a6ea3" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h3>Career Trend Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={mockData}
                  dataKey="searchVolume"
                  nameKey="title"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={40}
                  paddingAngle={4}
                  labelLine={false}
                  label={({ percent }) => (percent > 0.07 ? `${(percent * 100).toFixed(0)}%` : '')}
                >
                  {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  wrapperStyle={{ borderRadius: 6 }}
                  contentStyle={{
                    backgroundColor: '#f7f6f9',
                    borderRadius: 6,
                    border: 'none',
                    boxShadow: '0 2px 6px rgba(58,44,74,0.15)',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconSize={12}
                  iconType="circle"
                  wrapperStyle={{ fontSize: 14, color: '#5a5273', fontWeight: 600, paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="text-table-row">
          <div className="analytics-info">
            <h3>Career Analytics Summary</h3>
            <ul className="analytics-list">
              {mockData.map(({ title, searchVolume }, idx) => {
                const Icon = ICONS[idx];
                return (
                  <li key={title}>
                    <Icon className="analytics-icon" />
                    <div className="analytics-content">
                      <strong>
                        {title} (Search Volume: {searchVolume})
                      </strong>
                      <p>{descriptions[idx]}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="table-container">
            <h3>Summary Table</h3>
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Search Volume</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map(({ title, searchVolume }, idx) => {
                  const Icon = ICONS[idx];
                  return (
                    <tr key={title}>
                      <td className="role-cell">
                        <Icon className="analytics-icon" />
                        {title}
                      </td>
                      <td>{searchVolume}</td>
                      <td>{descriptions[idx]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
