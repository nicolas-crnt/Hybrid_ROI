import React from 'react';
import { DollarSign, HelpCircle } from 'lucide-react';
import { FinancialMetrics } from '../../types';
import InputField from './InputField';

interface FinancialSectionProps {
  data: FinancialMetrics;
  onChange: (data: FinancialMetrics) => void;
}

export default function FinancialSection({ data, onChange }: FinancialSectionProps) {
  const handleChange = (field: keyof FinancialMetrics, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="h-6 w-6 text-blue-600" />
        <p className="text-gray-600">
          Enter your financial metrics to calculate profit-based ROI with traditional and advanced financial modeling.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Operational Efficiencies"
          value={data.operationalEfficiencies}
          onChange={(value) => handleChange('operationalEfficiencies', value)}
          placeholder="Annual savings from improved operations"
          tooltip="Cost savings achieved through process improvements, automation, or efficiency gains"
          prefix="$"
        />

        <InputField
          label="Cost Reductions"
          value={data.costReductions}
          onChange={(value) => handleChange('costReductions', value)}
          placeholder="Direct cost savings per year"
          tooltip="Direct cost reductions from the initiative (e.g., reduced material costs, lower overhead)"
          prefix="$"
        />

        <InputField
          label="Revenue Growth"
          value={data.revenueGrowth}
          onChange={(value) => handleChange('revenueGrowth', value)}
          placeholder="Additional annual revenue"
          tooltip="New revenue generated from the initiative (e.g., new products, market expansion)"
          prefix="$"
        />

        <InputField
          label="Initial Investment"
          value={data.initialInvestment}
          onChange={(value) => handleChange('initialInvestment', value)}
          placeholder="Upfront investment required"
          tooltip="Total upfront investment required for the initiative"
          prefix="$"
        />

        <InputField
          label="Annual Maintenance Costs"
          value={data.maintenanceCosts}
          onChange={(value) => handleChange('maintenanceCosts', value)}
          placeholder="Ongoing annual costs"
          tooltip="Recurring annual costs to maintain the initiative (e.g., maintenance, operations)"
          prefix="$"
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Financial ROI Calculation</h4>
            <p className="text-sm text-blue-700 mt-1">
              The financial ROI will be calculated using: (Total Benefits - Total Costs) / Total Costs × 100%
              <br />
              Benefits include operational efficiencies, cost reductions, and revenue growth.
              <br />
              Costs include initial investment and ongoing maintenance costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}