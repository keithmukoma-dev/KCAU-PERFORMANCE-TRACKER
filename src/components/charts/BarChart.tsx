import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface BarChartProps {
  data: { name: string; value: number; color?: string }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const defaultColor = '#60a5fa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 11 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            cursor={{ fill: '#f3f4f6', radius: 8 }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
            }}
            labelStyle={{ color: '#1f2937', fontWeight: 600 }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={50}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColor}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default BarChart;
