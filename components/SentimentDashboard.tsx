'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { useState } from 'react';

// Mock data for Hespress sentiment analysis
const mockSentimentData = [
  { date: '2025-06-01', positive: 45, negative: 23, neutral: 32, total: 100 },
  { date: '2025-06-02', positive: 52, negative: 18, neutral: 30, total: 100 },
  { date: '2025-06-03', positive: 38, negative: 35, neutral: 27, total: 100 },
  { date: '2025-06-04', positive: 61, negative: 15, neutral: 24, total: 100 },
  { date: '2025-06-05', positive: 43, negative: 28, neutral: 29, total: 100 },
  { date: '2025-06-06', positive: 55, negative: 22, neutral: 23, total: 100 },
  { date: '2025-06-07', positive: 48, negative: 31, neutral: 21, total: 100 },
];

const mockCategoryData = [
  { category: 'السياسة', positive: 34, negative: 45, neutral: 21 },
  { category: 'الرياضة', positive: 67, negative: 8, neutral: 25 },
  { category: 'الاقتصاد', positive: 23, negative: 52, neutral: 25 },
  { category: 'التكنولوجيا', positive: 78, negative: 12, neutral: 10 },
  { category: 'الثقافة', positive: 56, negative: 18, neutral: 26 },
  { category: 'الصحة', positive: 45, negative: 35, neutral: 20 },
];

const mockHourlyData = [
  { hour: '00:00', comments: 15, sentiment: 0.2 },
  { hour: '02:00', comments: 8, sentiment: 0.1 },
  { hour: '04:00', comments: 5, sentiment: -0.1 },
  { hour: '06:00', comments: 12, sentiment: 0.3 },
  { hour: '08:00', comments: 45, sentiment: 0.1 },
  { hour: '10:00', comments: 78, sentiment: 0.4 },
  { hour: '12:00', comments: 95, sentiment: 0.2 },
  { hour: '14:00', comments: 87, sentiment: 0.3 },
  { hour: '16:00', comments: 102, sentiment: 0.1 },
  { hour: '18:00', comments: 120, sentiment: -0.2 },
  { hour: '20:00', comments: 98, sentiment: -0.1 },
  { hour: '22:00', comments: 65, sentiment: 0.1 },
];

const mockTopArticles = [
  { title: 'الانتخابات الرئاسية المقبلة في المغرب', comments: 1245, positive: 35, negative: 45, neutral: 20 },
  { title: 'فوز المنتخب المغربي في كأس الأمم الأفريقية', comments: 2145, positive: 78, negative: 12, neutral: 10 },
  { title: 'الوضع الاقتصادي الحالي والتضخم', comments: 987, positive: 25, negative: 55, neutral: 20 },
  { title: 'تطورات الذكاء الاصطناعي في المغرب', comments: 756, positive: 68, negative: 15, neutral: 17 },
  { title: 'المهرجان الدولي للفيلم بمراكش', comments: 623, positive: 52, negative: 22, neutral: 26 },
];

// Add trending topics data
const mockTrendingTopics = [
  { topic: '#المغرب', mentions: 1250},
  { topic: '#هسبريس', mentions: 980},
  { topic: '#الرباط', mentions: 750},
  { topic: '#كأس_لأمم', mentions: 650},
  { topic: '#الاقتصاد', mentions: 520},
];

// Add geographic data
const mockGeographicData = [
  { region: 'الرباط', comments: 450, avgSentiment: 0.2 },
  { region: 'الدار البيضاء', comments: 780, avgSentiment: 0.1 },
  { region: 'فاس', comments: 320, avgSentiment: 0.3 },
  { region: 'مراكش', comments: 290, avgSentiment: 0.4 },
  { region: 'طنجة', comments: 210, avgSentiment: 0.0 },
];


interface SentimentDashboardProps {
  className?: string;
}

export const SentimentDashboard = ({ className = '' }: SentimentDashboardProps) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Calculate summary stats
  const totalComments = mockSentimentData.reduce((sum, day) => sum + day.total, 0);
  const avgPositive = Math.round(mockSentimentData.reduce((sum, day) => sum + day.positive, 0) / mockSentimentData.length);
  const avgNegative = Math.round(mockSentimentData.reduce((sum, day) => sum + day.negative, 0) / mockSentimentData.length);
  const avgNeutral = Math.round(mockSentimentData.reduce((sum, day) => sum + day.neutral, 0) / mockSentimentData.length);

  const pieData = [
    { name: 'Positive', value: avgPositive, color: '#10B981' },
    { name: 'Negative', value: avgNegative, color: '#EF4444' },
    { name: 'Neutral', value: avgNeutral, color: '#6B7280' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hespress Sentiment Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time sentiment analysis of comments and articles
          </p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
          
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Metrics</option>
            <option value="positive">Positive Only</option>
            <option value="negative">Negative Only</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Comments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalComments.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Positive</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{avgPositive}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Negative</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{avgNegative}%</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Neutral</p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{avgNeutral}%</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sentiment Trend Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockSentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={3} name="Positive" />
              <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={3} name="Negative" />
              <Line type="monotone" dataKey="neutral" stroke="#6B7280" strokeWidth={3} name="Neutral" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Overall Sentiment Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Sentiment Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sentiment by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="category" 
                stroke="#6B7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="#10B981" name="Positive" />
              <Bar dataKey="neutral" stackId="a" fill="#6B7280" name="Neutral" />
              <Bar dataKey="negative" stackId="a" fill="#EF4444" name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Comment Activity by Hour
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={mockHourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
              <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="comments" fill="#3B82F6" name="Comments Count" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#F59E0B" 
                strokeWidth={3} 
                name="Avg Sentiment" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Trending Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            الموضوعات الرائجة
          </h3>
        
<ResponsiveContainer width="100%" height={300}>
  <BarChart
    layout="vertical"  // ✅ This is the key!
    data={mockTrendingTopics}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
    <XAxis
      type="number"
      dataKey="mentions"
      stroke="#6B7280"
      fontSize={12}
      tickFormatter={(value) => `${value.toLocaleString()}`}
    />
    <YAxis
      type="category"
      dataKey="topic"
      stroke="#6B7280"
      fontSize={12}
      width={100} // ✅ May need more width for Arabic hashtags
      interval={0}
    />
    <Tooltip
      contentStyle={{
        backgroundColor: '#1F2937',
        border: '1px solid #374151',
        borderRadius: '8px',
        color: '#F9FAFB'
      }}
      formatter={(value) => [`${value.toLocaleString()} mentions`, 'إجمالي الذكر']}
      labelFormatter={(label) => `الموضوع: ${label}`}
    />
    <Bar
      dataKey="mentions"
      fill="#8B5CF6"
      name="عدد الذكر"
      radius={[0, 6, 6, 0]}
    />
  </BarChart>
</ResponsiveContainer>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            التوزيع الجغرافي للتعليقات
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={mockGeographicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="region" 
                stroke="#6B7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="comments" fill="#8B5CF6" name="عدد التعليقات" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="avgSentiment" 
                stroke="#F59E0B" 
                strokeWidth={3} 
                name="متوسط المشاعر" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Real-time Sentiment Monitor */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            مراقب المشاعر المباشر
          </h3>
          <div className="flex items-center text-sm text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            مباشر
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {mockTrendingTopics.map((topic, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {topic.topic}
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {topic.mentions.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                mentions
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Articles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Articles by Engagement
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">Article Title</th>
                <th scope="col" className="px-6 py-3">Comments</th>
                <th scope="col" className="px-6 py-3">Positive %</th>
                <th scope="col" className="px-6 py-3">Negative %</th>
                <th scope="col" className="px-6 py-3">Neutral %</th>
                <th scope="col" className="px-6 py-3">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {mockTopArticles.map((article, index) => {
                const sentiment = article.positive > article.negative ? 'positive' : 
                                article.negative > article.positive ? 'negative' : 'neutral';
                return (
                  <tr key={index} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {article.comments.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400">
                      {article.positive}%
                    </td>
                    <td className="px-6 py-4 text-red-600 dark:text-red-400">
                      {article.negative}%
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {article.neutral}%
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sentiment === 'positive' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                          : sentiment === 'negative'
                          ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {sentiment}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
