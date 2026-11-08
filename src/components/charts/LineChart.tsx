import React from 'react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface LineChartProps {
  data: { month: string; average: number; attendance?: number }[];
  showAttendance?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ data, showAttendance = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
            }}
            labelStyle={{ color: '#1f2937', fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="average"
            stroke="#60a5fa"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAverage)"
            name="Average Score"
          />
          {showAttendance && (
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAttendance)"
              name="Attendance %"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LineChart;
