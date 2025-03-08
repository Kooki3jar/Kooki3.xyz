import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Wifi, Cpu, Globe, Smartphone } from 'lucide-react';
import { runCompatibilityCheck } from '../utils/compatibility';

export function CompatibilityCheck() {
  const [compatibilityResults, setCompatibilityResults] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const results = runCompatibilityCheck();
    setCompatibilityResults(results);
  }, []);

  if (!compatibilityResults) {
    return null;
  }

  const { results, criticalIssues, isCompatible } = compatibilityResults;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md">
        <div 
          className={`p-4 ${isCompatible ? 'bg-green-50' : 'bg-yellow-50'} cursor-pointer`}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex items-center gap-3">
            {isCompatible ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            )}
            <div>
              <h3 className={`font-medium ${isCompatible ? 'text-green-900' : 'text-yellow-900'}`}>
                {isCompatible ? 'Your browser is compatible' : 'Compatibility Issues Detected'}
              </h3>
              <p className={`text-sm ${isCompatible ? 'text-green-700' : 'text-yellow-700'}`}>
                {isCompatible 
                  ? 'All features should work correctly'
                  : `${criticalIssues.length} issue${criticalIssues.length === 1 ? '' : 's'} found`}
              </p>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="p-4 space-y-4">
            {!isCompatible && criticalIssues.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Critical Issues:</h4>
                <ul className="text-sm space-y-1">
                  {criticalIssues.map((issue, index) => (
                    <li key={index} className="text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">Browser Capabilities</h4>
                </div>
                <ul className="text-sm space-y-1">
                  {Object.entries(results.browser).map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between text-gray-600">
                      <span className="capitalize">{key}</span>
                      <span>{value ? '✓' : '✗'}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">Performance</h4>
                </div>
                <ul className="text-sm space-y-1">
                  {Object.entries(results.performance.timing).map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between text-gray-600">
                      <span className="capitalize">{key}</span>
                      <span>{value}ms</span>
                    </li>
                  ))}
                </ul>
              </div>

              {results.network && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi className="w-4 h-4 text-gray-500" />
                    <h4 className="font-medium text-gray-900">Network</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    {Object.entries(results.network).map(([key, value]) => (
                      <li key={key} className="flex items-center justify-between text-gray-600">
                        <span className="capitalize">{key}</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">Device</h4>
                </div>
                <ul className="text-sm space-y-1">
                  {Object.entries(results.device).map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between text-gray-600">
                      <span className="capitalize">{key}</span>
                      <span>
                        {typeof value === 'object' 
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Close Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}