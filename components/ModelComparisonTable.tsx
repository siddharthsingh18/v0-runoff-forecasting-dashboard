'use client';

import { motion } from 'framer-motion';
import { ModelComparison } from '@/lib/types';

interface ModelComparisonTableProps {
  models: ModelComparison[];
  loading?: boolean;
}

export function ModelComparisonTable({
  models,
  loading = false,
}: ModelComparisonTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Model
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
              RMSE
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
              MAE
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
              R²
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
              NSE
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
              CV Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {models.map((model, idx) => (
            <motion.tr
              key={model.model_name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`transition-colors ${
                idx === 0
                  ? 'bg-indigo-500/10 hover:bg-indigo-500/15'
                  : 'hover:bg-white/5'
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {idx === 0 && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400">
                      Best
                    </span>
                  )}
                  <span className="font-medium text-white capitalize">
                    {model.model_name.replace('_', ' ')}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right text-white">
                {model.rmse.toFixed(4)}
              </td>
              <td className="px-6 py-4 text-right text-white">
                {model.mae.toFixed(4)}
              </td>
              <td className="px-6 py-4 text-right text-white">
                {model.r2.toFixed(4)}
              </td>
              <td className="px-6 py-4 text-right text-white">
                {isNaN(model.nse) ? 'N/A' : model.nse.toFixed(4)}
              </td>
              <td className="px-6 py-4 text-right text-white">
                {model.cv_score_rmse.toFixed(4)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
