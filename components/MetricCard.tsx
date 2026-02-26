'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  highlighted?: boolean;
}

export function MetricCard({
  label,
  value,
  icon,
  highlighted = false,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5rgba(0, 0, 0, 0.2)' }}
      className={`p-6 rounded-2xl backdrop-blur-md border transition-all ${
        highlighted
          ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/40'
          : 'bg-white/5 border-white/10 hover:bg-white/8'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-white mt-2">
            {typeof value === 'number' ? value.toFixed(4) : value}
          </p>
        </div>
        {icon && (
          <div className="text-indigo-400 ml-3">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
