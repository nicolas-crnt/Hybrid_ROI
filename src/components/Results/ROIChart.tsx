import React from 'react';
import { ROIResults } from '../../types';

interface ROIChartProps {
  results: ROIResults;
}

export default function ROIChart({ results }: ROIChartProps) {
  const years = Array.from({ length: results.profit.yearlyFlow.length }, (_, i) => `Year ${i + 1}`);
  const maxValue = Math.max(
    ...results.profit.yearlyFlow,
    ...results.planet.yearlyImpact,
    ...results.people.yearlyImpact
  );

  const getBarHeight = (value: number) => {
    return Math.max((value / maxValue) * 100, 2);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Financial Flow</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Planet Impact</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">People Impact</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        <div className="flex items-end justify-between h-full space-x-2">
          {years.map((year, index) => (
            <div key={year} className="flex-1 flex flex-col items-center">
              <div className="flex items-end space-x-1 mb-2 h-48">
                {/* Financial Bar */}
                <div 
                  className="bg-green-500 rounded-t w-6 relative group cursor-pointer"
                  style={{ height: `${getBarHeight(results.profit.yearlyFlow[index])}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                    {formatCurrency(results.profit.yearlyFlow[index])}
                  </div>
                </div>
                
                {/* Planet Bar */}
                <div 
                  className="bg-emerald-500 rounded-t w-6 relative group cursor-pointer"
                  style={{ height: `${getBarHeight(results.planet.yearlyImpact[index])}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                    {formatCurrency(results.planet.yearlyImpact[index])}
                  </div>
                </div>
                
                {/* People Bar */}
                <div 
                  className="bg-orange-500 rounded-t w-6 relative group cursor-pointer"
                  style={{ height: `${getBarHeight(results.people.yearlyImpact[index])}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                    {formatCurrency(results.people.yearlyImpact[index])}
                  </div>
                </div>
              </div>
              
              <span className="text-xs text-gray-600">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}