'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionChart } from '@/components/PredictionChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MetricCard } from '@/components/MetricCard';
import api from '@/lib/api';
import { PredictRequest, PredictionResult } from '@/lib/types';
import { Cloud, Droplets } from 'lucide-react';
import { toast } from 'sonner';

interface PredictionHistory {
  index: number;
  actual: number;
  predicted: number;
}

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePrediction = async (formData: PredictRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.predict(formData);
      setResult(response);

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          index: prev.length,
          actual: formData.rainfall,
          predicted: response.predicted_runoff,
        },
      ]);

      toast.success('Prediction generated successfully!');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate prediction';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const confidenceLevel = result
    ? result.confidence > 0.8
      ? 'High'
      : result.confidence > 0.5
      ? 'Medium'
      : 'Low'
    : 'N/A';

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
            <h1 className="text-4xl font-bold text-white mb-2">Predict Runoff</h1>
            <p className="text-gray-400">
              Generate 3-day ahead runoff forecasts using environmental features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <PredictionForm onSubmit={handlePrediction} loading={loading} />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex justify-center"
                >
                  <LoadingSpinner size="lg" text="Generating prediction..." />
                </motion.div>
              )}

              {error && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-md"
                >
                  <p className="text-red-300">{error}</p>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Prediction Result */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">Predicted Runoff</h3>
                      <Droplets className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-300 mb-1">3-Day Ahead Runoff</p>
                        <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {result.predicted_runoff.toFixed(2)}
                          <span className="text-xl ml-2 text-gray-400">mm</span>
                        </p>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Confidence</p>
                          <p className="text-lg font-semibold text-white">
                            {(result.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Confidence Level</p>
                          <p
                            className={`text-lg font-semibold ${
                              confidenceLevel === 'High'
                                ? 'text-green-400'
                                : confidenceLevel === 'Medium'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}
                          >
                            {confidenceLevel}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        Generated at:{' '}
                        {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>

                  {/* Prediction History Chart */}
                  {history.length > 0 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          Prediction Trend
                        </h3>
                        <p className="text-sm text-gray-400">
                          Historical predictions from this session
                        </p>
                      </div>
                      <PredictionChart data={history} />
                    </div>
                  )}
                </motion.div>
              )}

              {!loading && !result && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
                >
                  <Cloud className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Fill in the environmental parameters and submit to generate a prediction
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
