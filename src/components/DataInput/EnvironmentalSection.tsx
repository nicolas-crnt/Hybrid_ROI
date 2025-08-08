import React from 'react';
import { Leaf, HelpCircle } from 'lucide-react';
import { EnvironmentalMetrics } from '../../types';
import InputField from './InputField';

interface EnvironmentalSectionProps {
  data: EnvironmentalMetrics;
  onChange: (data: EnvironmentalMetrics) => void;
}

export default function EnvironmentalSection({ data, onChange }: EnvironmentalSectionProps) {
  const handleChange = (section: keyof EnvironmentalMetrics, field: string, value: number) => {
    const updated = { ...data };
    if (typeof updated[section] === 'object' && updated[section] !== null) {
      (updated[section] as any)[field] = value;
      onChange(updated);
    }
  };

  const handleNestedChange = (section: keyof EnvironmentalMetrics, subsection: string, field: string, value: number) => {
    const updated = { ...data };
    ((updated[section] as any)[subsection] as any)[field] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 mb-6">
        <Leaf className="h-6 w-6 text-green-600" />
        <p className="text-gray-600">
          Enter environmental impact data to calculate CO2e tokens and brand margin benefits from sustainability initiatives.
        </p>
      </div>

      {/* Energy Consumption */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Energy Consumption</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Total Consumption"
            value={data.energy.consumption}
            onChange={(value) => handleChange('energy', 'consumption', value)}
            placeholder="kWh per year"
            suffix="kWh"
          />
          <InputField
            label="Cost per kWh"
            value={data.energy.costPerKwh}
            onChange={(value) => handleChange('energy', 'costPerKwh', value)}
            placeholder="Cost per kWh"
            prefix="$"
          />
          <InputField
            label="Reduction Target"
            value={data.energy.reduction}
            onChange={(value) => handleChange('energy', 'reduction', value)}
            placeholder="kWh reduction per year"
            suffix="kWh"
          />
          <InputField
            label="Reduction Project Cost"
            value={data.energy.reductionCost}
            onChange={(value) => handleChange('energy', 'reductionCost', value)}
            placeholder="Cost of reduction project"
            prefix="$"
          />
        </div>
      </div>

      {/* Water Consumption */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Water Consumption</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Total Consumption"
            value={data.water.consumption}
            onChange={(value) => handleChange('water', 'consumption', value)}
            placeholder="m³ per year"
            suffix="m³"
          />
          <InputField
            label="Cost per m³"
            value={data.water.costPerM3}
            onChange={(value) => handleChange('water', 'costPerM3', value)}
            placeholder="Cost per m³"
            prefix="$"
          />
          <InputField
            label="Reduction Target"
            value={data.water.reduction}
            onChange={(value) => handleChange('water', 'reduction', value)}
            placeholder="m³ reduction per year"
            suffix="m³"
          />
          <InputField
            label="Project Cost"
            value={data.water.projectCost}
            onChange={(value) => handleChange('water', 'projectCost', value)}
            placeholder="Cost of water project"
            prefix="$"
          />
        </div>
      </div>

      {/* Waste Management */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Waste Management</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Total Waste"
            value={data.waste.tonnes}
            onChange={(value) => handleChange('waste', 'tonnes', value)}
            placeholder="Tonnes per year"
            suffix="tonnes"
          />
          <InputField
            label="Cost per Tonne"
            value={data.waste.costPerTonne}
            onChange={(value) => handleChange('waste', 'costPerTonne', value)}
            placeholder="Cost per tonne"
            prefix="$"
          />
          <InputField
            label="Reduction Target"
            value={data.waste.reduction}
            onChange={(value) => handleChange('waste', 'reduction', value)}
            placeholder="Tonnes reduction per year"
            suffix="tonnes"
          />
          <InputField
            label="Project Cost"
            value={data.waste.projectCost}
            onChange={(value) => handleChange('waste', 'projectCost', value)}
            placeholder="Cost of waste reduction project"
            prefix="$"
          />
        </div>
      </div>

      {/* GHG Emissions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">GHG Emissions (Scope 1 & 2)</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Current Emissions"
            value={data.scope1And2.emissions}
            onChange={(value) => handleChange('scope1And2', 'emissions', value)}
            placeholder="tCO2e per year"
            suffix="tCO2e"
          />
          <InputField
            label="Current Costs"
            value={data.scope1And2.costs}
            onChange={(value) => handleChange('scope1And2', 'costs', value)}
            placeholder="Annual emission costs"
            prefix="$"
          />
          <InputField
            label="Reduction Target"
            value={data.scope1And2.reduction}
            onChange={(value) => handleChange('scope1And2', 'reduction', value)}
            placeholder="tCO2e reduction per year"
            suffix="tCO2e"
          />
          <InputField
            label="Project Cost"
            value={data.scope1And2.projectCost}
            onChange={(value) => handleChange('scope1And2', 'projectCost', value)}
            placeholder="Cost of reduction project"
            prefix="$"
          />
        </div>
      </div>

      {/* Brand Margin Benefits */}
      <div className="bg-green-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Brand Margin Benefits</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Total Revenue"
            value={data.brandMargin.totalRevenue}
            onChange={(value) => handleChange('brandMargin', 'totalRevenue', value)}
            placeholder="Annual total revenue"
            prefix="$"
          />
          <InputField
            label="Total Profits"
            value={data.brandMargin.totalProfits}
            onChange={(value) => handleChange('brandMargin', 'totalProfits', value)}
            placeholder="Annual total profits"
            prefix="$"
          />
          <InputField
            label="Green Product Margin"
            value={data.brandMargin.greenProducts.margin}
            onChange={(value) => handleNestedChange('brandMargin', 'greenProducts', 'margin', value)}
            placeholder="Margin % for green products"
            suffix="%"
          />
          <InputField
            label="Certification Revenue Impact"
            value={data.brandMargin.certifications.revenueImpact}
            onChange={(value) => handleNestedChange('brandMargin', 'certifications', 'revenueImpact', value)}
            placeholder="Revenue impact from certifications"
            prefix="$"
          />
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900">Environmental Impact Calculation</h4>
            <p className="text-sm text-green-700 mt-1">
              Environmental impact will be converted to CO2e tokens using standard conversion factors.
              Brand margin benefits from sustainability initiatives will be calculated separately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}