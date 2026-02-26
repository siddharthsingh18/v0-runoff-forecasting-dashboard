'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { TrainingForm } from '@/components/TrainingForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MetricCard } from '@/components/MetricCard';
import { ModelComparisonTable } from '@/components/ModelComparisonTable';
import api from '@/lib/api';
import { TrainRequest, TrainResponse } from '@/lib/types';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function TrainPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrainResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTraining = async (formData: TrainRequest) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await api.trainModels(formData);
      setResult(response);
      toast.success('Model training completed successfully!');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to train models';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Training error:', err);
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">Train Models</h1>
            <p className="text-gray-400">
              Auto-tune hyperparameters for Random Forest and XGBoost
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <TrainingForm onSubmit={handleTraining} loading={loading} />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex justify-center"
                >
                  <LoadingSpinner size="lg" text="Training models in progress..." />
                </motion.div>
              )}

              {error && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-md flex items-start gap-4"
                >
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-300 mb-1">Training Failed</h3>
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Success Alert */}
                  <motion.div
                    className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 backdrop-blur-md flex items-start gap-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-300 mb-1">
                        Training Completed
                      </h3>
                      <p className="text-sm text-green-200">
                        Best model saved: <span className="font-mono">{result.artifact_path}</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Best Model Metrics */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Best Model Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <MetricCard
                        label="Model"
                        value={result.best_model.model_name.replace('_', ' ')}
                        highlighted
                      />
                      <MetricCard
                        label="RMSE"
                        value={result.best_model.rmse}
                      />
                      <MetricCard
                        label="MAE"
                        value={result.best_model.mae}
                      />
                      <MetricCard
                        label="R² Score"
                        value={result.best_model.r2}
                      />
                    </div>
                  </div>

                  {/* Model Comparison */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Model Comparison</h3>
                    <ModelComparisonTable models={result.all_models} />
                  </div>

                  {/* Parameters */}
                  <motion.div
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Best Parameters
                    </h3>
                    <pre className="text-xs bg-black/40 p-4 rounded text-cyan-300 overflow-x-auto">
                      {JSON.stringify(result.best_model.best_params, null, 2)}
                    </pre>
                  </motion.div>
                </motion.div>
              )}

              {!loading && !result && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
                >
                  <p className="text-gray-400">
                    Configure training parameters and click "Start Training" to begin
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
