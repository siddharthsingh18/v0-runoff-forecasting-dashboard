'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { ArrowRight, Zap, Brain, BarChart3, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Brain,
    title: 'Model Auto-Tuning',
    description: 'Automatically tune hyperparameters using grid or randomized search',
  },
  {
    icon: Zap,
    title: 'Hyperparameter Optimization',
    description: 'Find optimal parameters for Random Forest and XGBoost models',
  },
  {
    icon: BarChart3,
    title: 'Interactive Visualizations',
    description: 'View predictions, metrics, and model comparisons in real-time',
  },
  {
    icon: Gauge,
    title: 'Real-time Prediction API',
    description: '3-day ahead runoff forecasting with high accuracy metrics',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Based Runoff
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Forecasting Platform
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Advanced machine learning models for 3-day ahead prediction with
              real-time hyperparameter optimization and interactive analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg transition-all flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/train">
                  <Button className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg rounded-lg border border-white/20 transition-all flex items-center gap-2">
                    Train Model
                    <Zap className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need for advanced forecasting and model optimization
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: '0 20px 25px -5rgba(0, 0, 0, 0.2)' }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/8 transition-all"
                >
                  <div className="mb-4 p-3 rounded-lg bg-indigo-500/20 w-fit">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Runoff AI Platform. Built with advanced machine learning.
          </p>
        </div>
      </footer>
    </div>
  );
}
