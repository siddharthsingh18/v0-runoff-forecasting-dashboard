'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { MetricCard } from '@/components/MetricCard';
import { ModelComparisonTable } from '@/components/ModelComparisonTable';
import { PredictionChart } from '@/components/PredictionChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import api from '@/lib/api';
import { TrainResponse } from '@/lib/types';
import { TrendingUp, TrendingDown, Zap, Target } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [data, setData] = useState<TrainResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const metrics = await api.getLatestMetrics();
        setData(metrics);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        toast.error('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <LoadingSpinner size="lg" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  const bestModel = data.best_model;
  const allModels = data.all_models;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <Sidebar />

      <main className="lg:mr-64 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Real-time model metrics and performance analysis
            </p>
          </motion.div>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Best Model"
              value={bestModel.model_name.replace('_', ' ')}
              icon={<Zap className="w-6 h-6" />}
              highlighted
            />
            <MetricCard
              label="RMSE"
              value={bestModel.rmse}
              icon={<TrendingDown className="w-6 h-6" />}
            />
            <MetricCard
              label="R² Score"
              value={bestModel.r2}
              icon={<Target className="w-6 h-6" />}
            />
            <MetricCard
              label="MAE"
              value={bestModel.mae}
              icon={<TrendingUp className="w-6 h-6" />}
            />
          </div>

          {/* Model Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Model Comparison</h2>
              <p className="text-gray-400">Performance metrics across all trained models</p>
            </div>
            <ModelComparisonTable models={allModels} />
          </motion.div>

          {/* Prediction Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">Prediction History</h2>
              <p className="text-gray-400">Actual vs Predicted runoff values</p>
            </div>
            <PredictionChart data={[]} />
          </motion.div>

          {/* Model Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Model Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Best Parameters</p>
                <pre className="text-xs bg-black/40 p-3 rounded text-cyan-300 overflow-x-auto">
                  {JSON.stringify(bestModel.best_params, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Performance Metrics</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">RMSE:</span>
                    <span className="text-white font-semibold">{bestModel.rmse.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">MAE:</span>
                    <span className="text-white font-semibold">{bestModel.mae.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">R²:</span>
                    <span className="text-white font-semibold">{bestModel.r2.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">NSE:</span>
                    <span className="text-white font-semibold">
                      {isNaN(bestModel.nse) ? 'N/A' : bestModel.nse.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
