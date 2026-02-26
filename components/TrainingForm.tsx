'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingSpinner } from './LoadingSpinner';
import { TrainRequest } from '@/lib/types';

interface TrainingFormProps {
  onSubmit: (data: TrainRequest) => Promise<void>;
  loading?: boolean;
}

export function TrainingForm({ onSubmit, loading = false }: TrainingFormProps) {
  const [formData, setFormData] = useState<TrainRequest>({
    train_end_year: 2000,
    test_start_year: 2006,
    search_type: 'randomized',
    n_iter: 20,
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
      <h2 className="text-2xl font-bold text-white">Model Training</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="train-end" className="text-gray-300">
            Training End Year
          </Label>
          <Input
            id="train-end"
            type="number"
            value={formData.train_end_year}
            onChange={(e) =>
              setFormData({
                ...formData,
                train_end_year: parseInt(e.target.value),
              })
            }
            disabled={loading}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-start" className="text-gray-300">
            Test Start Year
          </Label>
          <Input
            id="test-start"
            type="number"
            value={formData.test_start_year}
            onChange={(e) =>
              setFormData({
                ...formData,
                test_start_year: parseInt(e.target.value),
              })
            }
            disabled={loading}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="search-type" className="text-gray-300">
            Search Type
          </Label>
          <Select
            value={formData.search_type}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                search_type: value as 'grid' | 'randomized',
              })
            }
            disabled={loading}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-950 border-white/10">
              <SelectItem value="grid">Grid Search</SelectItem>
              <SelectItem value="randomized">Randomized Search</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="n-iter" className="text-gray-300">
            Iterations
          </Label>
          <Input
            id="n-iter"
            type="number"
            value={formData.n_iter}
            onChange={(e) =>
              setFormData({
                ...formData,
                n_iter: parseInt(e.target.value),
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
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Training in progress...
          </div>
        ) : (
          'Start Training'
        )}
      </Button>
    </motion.form>
  );
}
