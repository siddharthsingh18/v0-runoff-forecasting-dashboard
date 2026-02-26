'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PredictRequest } from '@/lib/types';

interface PredictionFormProps {
  onSubmit: (data: PredictRequest) => Promise<void>;
  loading?: boolean;
}

export function PredictionForm({
  onSubmit,
  loading = false,
}: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictRequest>({
    rainfall: 10,
    temperature: 25,
    humidity: 60,
    previous_runoff: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Make Prediction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="rainfall" className="text-gray-300">
            Rainfall (mm)
          </Label>
          <Input
            id="rainfall"
            type="number"
            step="0.1"
            value={formData.rainfall}
            onChange={(e) =>
              setFormData({
                ...formData,
                rainfall: parseFloat(e.target.value),
              })
            }
            disabled={loading}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature" className="text-gray-300">
            Temperature (°C)
          </Label>
          <Input
            id="temperature"
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={(e) =>
              setFormData({
                ...formData,
                temperature: parseFloat(e.target.value),
              })
            }
            disabled={loading}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="humidity" className="text-gray-300">
            Humidity (%)
          </Label>
          <Input
            id="humidity"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.humidity}
            onChange={(e) =>
              setFormData({
                ...formData,
                humidity: parseFloat(e.target.value),
              })
            }
            disabled={loading}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="previous-runoff" className="text-gray-300">
            Previous Runoff (mm)
          </Label>
          <Input
            id="previous-runoff"
            type="number"
            step="0.1"
            value={formData.previous_runoff}
            onChange={(e) =>
              setFormData({
                ...formData,
                previous_runoff: parseFloat(e.target.value),
              })
            }
            disabled={loading}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Predicting...
          </div>
        ) : (
          'Get Prediction'
        )}
      </Button>
    </motion.form>
  );
}
