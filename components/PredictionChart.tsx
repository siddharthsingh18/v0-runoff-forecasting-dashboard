'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartDataPoint {
  index: number;
  actual: number;
  predicted: number;
}

interface PredictionChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
}

export function PredictionChart({ data, loading = false }: PredictionChartProps) {
  if (loading) {
    return (
      <div className="h-96 bg-white/5 rounded-2xl animate-pulse border border-white/10" />
    );
  }

  const chartData = data.length > 0 ? data : generateDummyData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Prediction History</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="index"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: 12 }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: 12 }}
            label={{ value: 'Runoff', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            name="Actual"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#06b6d4"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            isAnimationActive={true}
            name="Predicted"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

function generateDummyData(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  for (let i = 0; i < 12; i++) {
    const actual = 10 + Math.random() * 20 + Math.sin(i * 0.5) * 5;
    const predicted = actual + (Math.random() - 0.5) * 4;
    data.push({
      index: i,
      actual: parseFloat(actual.toFixed(2)),
      predicted: parseFloat(predicted.toFixed(2)),
    });
  }
  return data;
}
