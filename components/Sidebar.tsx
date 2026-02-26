'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

type HealthStatus = 'healthy' | 'error' | 'loading';

export function Sidebar() {
  const [status, setStatus] = useState<HealthStatus>('loading');
  const [responseTime, setResponseTime] = useState<number>(0);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const start = Date.now();
        await api.getHealth();
        const end = Date.now();
        setResponseTime(end - start);
        setStatus('healthy');
      } catch {
        setStatus('error');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    healthy: {
      icon: CheckCircle,
      label: 'API Healthy',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    error: {
      icon: XCircle,
      label: 'API Error',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    loading: {
      icon: AlertCircle,
      label: 'Checking...',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <aside className="hidden lg:block w-64 fixed right-0 top-16 h-[calc(100vh-64px)] p-6 border-l border-white/10 bg-white/5 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-4">API Status</h3>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl border border-white/10 transition-all ${config.bgColor}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className={`w-5 h-5 ${config.color}`} />
              <span className={`text-sm font-semibold ${config.color}`}>
                {config.label}
              </span>
            </div>
            {status === 'healthy' && (
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Response Time</p>
                <p className="text-lg font-bold text-white">
                  {responseTime}
                  <span className="text-xs text-gray-400 ml-1">ms</span>
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="space-y-3 pt-6 border-t border-white/10">
          <h3 className="text-sm font-semibold text-gray-300">Quick Info</h3>
          <div className="space-y-2 text-xs text-gray-400">
            <p>
              <span className="text-gray-300">Version:</span> 1.0.0
            </p>
            <p>
              <span className="text-gray-300">Model:</span> Auto-Tuned
            </p>
            <p>
              <span className="text-gray-300">Forecast:</span> 3-day ahead
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500">
            Last updated:{' '}
            <span className="text-gray-400">
              {new Date().toLocaleTimeString()}
            </span>
          </p>
        </div>
      </motion.div>
    </aside>
  );
}
