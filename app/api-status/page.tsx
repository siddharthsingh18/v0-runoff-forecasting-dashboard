'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MetricCard } from '@/components/MetricCard';
import api from '@/lib/api';
import { HealthResponse } from '@/lib/types';
import { CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StatusType = 'healthy' | 'error' | 'loading';

export default function ApiStatusPage() {
  const [status, setStatus] = useState<StatusType>('loading');
  const [data, setData] = useState<HealthResponse | null>(null);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      setStatus('loading');
      setError(null);

      const start = Date.now();
      const response = await api.getHealth();
      const end = Date.now();

      setResponseTime(end - start);
      setData(response);
      setStatus('healthy');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to connect to API';
      setError(errorMessage);
      setStatus('error');
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const statusConfig = {
    healthy: {
      icon: CheckCircle,
      title: 'API is Healthy',
      description: 'Backend is operational and responding correctly',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    error: {
      icon: XCircle,
      title: 'API is Down',
      description: 'Unable to connect to the backend service',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    loading: {
      icon: AlertCircle,
      title: 'Checking Status',
      description: 'Connecting to the backend...',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <Sidebar />

      <main className="lg:mr-64 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">API Status</h1>
            <p className="text-gray-400">Backend service health and diagnostics</p>
          </motion.div>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-2xl backdrop-blur-md border transition-all ${config.bgColor} ${config.borderColor}`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {status === 'loading' ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Icon className={`w-12 h-12 ${config.color}`} />
                )}
                <div>
                  <h2 className={`text-2xl font-bold ${config.color}`}>
                    {config.title}
                  </h2>
                  <p className="text-gray-400 mt-1">{config.description}</p>
                </div>
              </div>
              <Button
                onClick={checkHealth}
                disabled={status === 'loading'}
                className="bg-white/10 hover:bg-white/20 text-white gap-2 rounded-lg px-4 py-2 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {status === 'healthy' && data && (
                <>
                  <div className="p-3 rounded-lg bg-black/20">
                    <p className="text-xs text-gray-400 mb-1">Response Time</p>
                    <p className="text-lg font-bold text-white">
                      {responseTime}
                      <span className="text-xs text-gray-400 ml-1">ms</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20">
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <p className="text-lg font-bold text-green-400">
                      {data.status}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20">
                    <p className="text-xs text-gray-400 mb-1">Last Checked</p>
                    <p className="text-xs font-mono text-white">
                      {new Date(data.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {data.uptime && (
                    <div className="p-3 rounded-lg bg-black/20">
                      <p className="text-xs text-gray-400 mb-1">Uptime</p>
                      <p className="text-xs font-mono text-white">
                        {formatUptime(data.uptime)}
                      </p>
                    </div>
                  )}
                </>
              )}

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-black/20 col-span-2 md:col-span-4">
                  <p className="text-xs text-gray-400 mb-1">Error</p>
                  <p className="text-sm font-mono text-red-300">{error}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Endpoints Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white mb-4">Available Endpoints</h3>
            <div className="space-y-3">
              {[
                { method: 'GET', path: '/health', description: 'Backend health check' },
                { method: 'POST', path: '/train/auto', description: 'Auto-tune models' },
                { method: 'POST', path: '/predict', description: 'Generate prediction' },
                { method: 'GET', path: '/metrics/latest', description: 'Get latest metrics' },
              ].map((endpoint, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      endpoint.method === 'GET'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-cyan-300">
                    {endpoint.path}
                  </code>
                  <p className="text-sm text-gray-400 ml-auto">
                    {endpoint.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Configuration Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white mb-4">Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">API Base URL</p>
                <code className="text-xs bg-black/40 p-3 rounded block text-cyan-300 overflow-x-auto">
                  {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
                </code>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Environment</p>
                <code className="text-xs bg-black/40 p-3 rounded block text-cyan-300">
                  {process.env.NODE_ENV || 'development'}
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
