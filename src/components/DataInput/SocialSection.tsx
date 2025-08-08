import React from 'react';
import { Users, HelpCircle } from 'lucide-react';
import { SocialMetrics } from '../../types';
import InputField from './InputField';

interface SocialSectionProps {
  data: SocialMetrics;
  onChange: (data: SocialMetrics) => void;
}

export default function SocialSection({ data, onChange }: SocialSectionProps) {
  const handleChange = (section: keyof SocialMetrics, field: string, value: number) => {
    const updated = { ...data };
    (updated[section] as any)[field] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-6 w-6 text-orange-600" />
        <p className="text-gray-600">
          Enter social impact data to calculate Social Value Tokens and measure the people dimension of your ROI.
        </p>
      </div>

      {/* Employee Turnover */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Employee Turnover & Costs</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="FTE Cost"
            value={data.turnover.fteCost}
            onChange={(value) => handleChange('turnover', 'fteCost', value)}
            placeholder="Average cost per FTE"
            prefix="$"
            tooltip="Average annual cost per full-time employee (salary + benefits)"
          />
          <InputField
            label="Total Turnover Cost"
            value={data.turnover.totalTurnoverCost}
            onChange={(value) => handleChange('turnover', 'totalTurnoverCost', value)}
            placeholder="Annual turnover costs"
            prefix="$"
            tooltip="Total annual cost of employee turnover (recruitment, training, lost productivity)"
          />
          <InputField
            label="Employees Who Left"
            value={data.turnover.employeesLeft}
            onChange={(value) => handleChange('turnover', 'employeesLeft', value)}
            placeholder="Number of employees"
            tooltip="Number of employees who left in the past year"
          />
          <InputField
            label="FTE at Beginning"
            value={data.turnover.fteBeginning}
            onChange={(value) => handleChange('turnover', 'fteBeginning', value)}
            placeholder="Total FTE count"
            tooltip="Total number of FTE at the beginning of the period"
          />
        </div>
      </div>

      {/* Turnover Impact Factors */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Turnover Impact Factors (%)</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <InputField
            label="Employee Satisfaction Impact"
            value={data.turnoverComposition.employeeSatisfactionImpact}
            onChange={(value) => handleChange('turnoverComposition', 'employeeSatisfactionImpact', value)}
            placeholder="Impact percentage"
            suffix="%"
            tooltip="Percentage of turnover attributed to employee satisfaction issues"
          />
          <InputField
            label="Career Development Impact"
            value={data.turnoverComposition.careerDevelopmentImpact}
            onChange={(value) => handleChange('turnoverComposition', 'careerDevelopmentImpact', value)}
            placeholder="Impact percentage"
            suffix="%"
            tooltip="Percentage of turnover attributed to lack of career development"
          />
          <InputField
            label="Management Satisfaction Impact"
            value={data.turnoverComposition.managementSatisfactionImpact}
            onChange={(value) => handleChange('turnoverComposition', 'managementSatisfactionImpact', value)}
            placeholder="Impact percentage"
            suffix="%"
            tooltip="Percentage of turnover attributed to management satisfaction issues"
          />
        </div>
      </div>

      {/* Employee Satisfaction */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Employee Satisfaction</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Wage Ratio to Minimum"
            value={data.employeeSatisfaction.wageRatio}
            onChange={(value) => handleChange('employeeSatisfaction', 'wageRatio', value)}
            placeholder="Ratio (e.g., 1.5 for 150%)"
            tooltip="Ratio of average employee wage to minimum wage"
          />
          <InputField
            label="Current Satisfaction Rate"
            value={data.employeeSatisfaction.satisfactionRate}
            onChange={(value) => handleChange('employeeSatisfaction', 'satisfactionRate', value)}
            placeholder="Satisfaction percentage"
            suffix="%"
            tooltip="Current employee satisfaction rate based on surveys"
          />
        </div>
      </div>

      {/* Career Development */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Career Development</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Current Satisfaction"
            value={data.careerDevelopment.currentSatisfaction}
            onChange={(value) => handleChange('careerDevelopment', 'currentSatisfaction', value)}
            placeholder="Current satisfaction %"
            suffix="%"
            tooltip="Current satisfaction with career development opportunities"
          />
          <InputField
            label="Expected Satisfaction"
            value={data.careerDevelopment.expectedSatisfaction}
            onChange={(value) => handleChange('careerDevelopment', 'expectedSatisfaction', value)}
            placeholder="Target satisfaction %"
            suffix="%"
            tooltip="Expected satisfaction after implementing career development initiatives"
          />
        </div>
      </div>

      {/* Management Satisfaction */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Management Satisfaction</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Current Satisfaction"
            value={data.managementSatisfaction.currentSatisfaction}
            onChange={(value) => handleChange('managementSatisfaction', 'currentSatisfaction', value)}
            placeholder="Current satisfaction %"
            suffix="%"
            tooltip="Current satisfaction with management quality"
          />
          <InputField
            label="Expected Satisfaction"
            value={data.managementSatisfaction.expectedSatisfaction}
            onChange={(value) => handleChange('managementSatisfaction', 'expectedSatisfaction', value)}
            placeholder="Target satisfaction %"
            suffix="%"
            tooltip="Expected satisfaction after management improvements"
          />
        </div>
      </div>

      {/* Employer Brand */}
      <div className="bg-orange-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Employer Brand Benefits</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Social Project Benefits"
            value={data.employerBrand.socialProjectBenefits}
            onChange={(value) => handleChange('employerBrand', 'socialProjectBenefits', value)}
            placeholder="Annual benefits from social projects"
            prefix="$"
            tooltip="Annual benefits derived from social responsibility projects"
          />
          <InputField
            label="Revenue Impact"
            value={data.employerBrand.revenueImpact}
            onChange={(value) => handleChange('employerBrand', 'revenueImpact', value)}
            placeholder="Estimated revenue impact"
            prefix="$"
            tooltip="Estimated impact on revenue from improved employer brand"
          />
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <HelpCircle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-orange-900">Social Value Calculation</h4>
            <p className="text-sm text-orange-700 mt-1">
              Social impact will be converted to Social Value Tokens based on turnover reduction, 
              satisfaction improvements, and employer brand enhancement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}