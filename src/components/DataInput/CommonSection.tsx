import React from 'react';
import { Settings, HelpCircle } from 'lucide-react';
import { CommonInputs } from '../../types';
import InputField from './InputField';

interface CommonSectionProps {
  data: CommonInputs;
  onChange: (data: CommonInputs) => void;
}

export default function CommonSection({ data, onChange }: CommonSectionProps) {
  const handleChange = (field: keyof CommonInputs, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-6 w-6 text-gray-600" />
        <p className="text-gray-600">
          Configure common parameters for the DCF model and projection analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Discount Rate"
          value={data.discountRate}
          onChange={(value) => handleChange('discountRate', value)}
          placeholder="Annual discount rate"
          suffix="%"
          tooltip="The discount rate used for DCF calculations (typically 6-12% for corporate projects)"
        />

        <InputField
          label="Projection Period"
          value={data.projectionPeriod}
          onChange={(value) => handleChange('projectionPeriod', value)}
          placeholder="Number of years"
          suffix="years"
          tooltip="Number of years to project the ROI analysis (typically 3-10 years)"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <HelpCircle className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">DCF Model Parameters</h4>
            <p className="text-sm text-gray-700 mt-1">
              The discount rate is used to calculate the present value of future cash flows in the DCF model.
              The projection period determines how many years of benefits and costs are included in the analysis.
            </p>
            <div className="mt-3 text-sm text-gray-600">
              <p><strong>Typical Discount Rates:</strong></p>
              <ul className="list-disc list-inside mt-1 ml-4">
                <li>Low-risk projects: 6-8%</li>
                <li>Medium-risk projects: 8-12%</li>
                <li>High-risk projects: 12-18%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}