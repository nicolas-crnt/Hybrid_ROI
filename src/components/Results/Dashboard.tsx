import React from 'react';
import { TrendingUp, Users, Leaf, DollarSign } from 'lucide-react';
import { ROIResults } from '../../types';
import MetricCard from './MetricCard';
import ROIChart from './ROIChart';

interface DashboardProps {
  results: ROIResults;
}

export default function Dashboard({ results }: DashboardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total ROI"
          value={formatPercentage(results.totalROI)}
          icon={TrendingUp}
          color="blue"
          description="Combined ROI across all dimensions"
        />
        
        <MetricCard
          title="Financial ROI"
          value={formatPercentage(results.profit.roi)}
          icon={DollarSign}
          color="green"
          description="Traditional profit-based ROI"
        />
        
        <MetricCard
          title="CO2e Tokens"
          value={results.planet.co2eTokens.toLocaleString()}
          icon={Leaf}
          color="emerald"
          description="Environmental impact tokens"
        />
        
        <MetricCard
          title="Social Value Tokens"
          value={results.people.socialValueTokens.toLocaleString()}
          icon={Users}
          color="orange"
          description="People impact tokens"
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profit Dimension */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Profit Dimension</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">ROI</span>
              <span className="font-medium">{formatPercentage(results.profit.roi)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">NPV</span>
              <span className="font-medium">{formatCurrency(results.profit.npv)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payback Period</span>
              <span className="font-medium">{results.profit.paybackPeriod.toFixed(1)} years</span>
            </div>
          </div>
        </div>

        {/* Planet Dimension */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Planet Dimension</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">CO2e Tokens</span>
              <span className="font-medium">{results.planet.co2eTokens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environmental Value</span>
              <span className="font-medium">{formatCurrency(results.planet.environmentalValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Brand Benefits</span>
              <span className="font-medium">{formatCurrency(results.planet.brandMarginBenefits)}</span>
            </div>
          </div>
        </div>

        {/* People Dimension */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">People Dimension</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Social Value Tokens</span>
              <span className="font-medium">{results.people.socialValueTokens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Turnover Savings</span>
              <span className="font-medium">{formatCurrency(results.people.turnoverSavings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Brand Benefits</span>
              <span className="font-medium">{formatCurrency(results.people.brandMarginBenefits)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">ROI Projection Over Time</h3>
        <ROIChart results={results} />
      </div>

      {/* Discounted ROI Analysis */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discounted Cash Flow Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Discounted ROI</p>
            <p className="text-2xl font-bold text-blue-600">{formatPercentage(results.discountedROI)}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Net Present Value</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.profit.npv)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          The discounted ROI accounts for the time value of money, providing a more conservative 
          estimate of returns by applying the specified discount rate to future cash flows.
        </p>
      </div>
    </div>
  );
}