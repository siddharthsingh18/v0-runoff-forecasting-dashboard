'use client'

import { AlertEvent } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { AlertTriangle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface AlertHistoryProps {
  alerts: AlertEvent[]
}

export function AlertHistory({ alerts }: AlertHistoryProps) {
  const [filterBySeverity, setFilterBySeverity] = useState<'all' | 'level1' | 'level2'>('all')

  const filteredAlerts = alerts.filter(
    (alert) => filterBySeverity === 'all' || alert.severity === filterBySeverity
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['all', 'level1', 'level2'] as const).map((severity) => (
          <button
            key={severity}
            onClick={() => setFilterBySeverity(severity)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterBySeverity === severity
                ? severity === 'level2'
                  ? 'bg-critical text-white'
                  : 'bg-warning text-black'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {severity === 'all' ? 'All' : `Level ${severity === 'level1' ? '1' : '2'}`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <p className="text-center text-white/60 py-8">No alerts found</p>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'level2'
                  ? 'bg-critical/10 border-critical'
                  : 'bg-warning/10 border-warning'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {alert.severity === 'level2' ? (
                    <AlertCircle className="w-5 h-5 text-critical flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{alert.message}</h4>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          alert.severity === 'level2'
                            ? 'bg-critical text-white'
                            : 'bg-warning text-black'
                        }`}
                      >
                        Level {alert.severity === 'level1' ? '1' : '2'}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 mt-1">{alert.location}</p>
                    <p className="text-xs text-white/40 mt-1">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                    {alert.recommendations && alert.recommendations.length > 0 && (
                      <div className="mt-2 text-sm">
                        <p className="text-white/70 font-medium mb-1">Recommendations:</p>
                        <ul className="text-white/60 list-disc list-inside">
                          {alert.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-sm font-semibold ${
                    alert.status === 'active'
                      ? 'text-critical'
                      : alert.status === 'dismissed'
                      ? 'text-white/40'
                      : 'text-safe'
                  }`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </span>
                  <p className="text-sm font-bold text-white">{alert.risk_percentage}% Risk</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
