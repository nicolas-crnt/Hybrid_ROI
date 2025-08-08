import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Calculator } from 'lucide-react';
import FinancialSection from './FinancialSection';
import EnvironmentalSection from './EnvironmentalSection';
import SocialSection from './SocialSection';
import CommonSection from './CommonSection';
import { FinancialMetrics, EnvironmentalMetrics, SocialMetrics, CommonInputs } from '../../types';

interface DataInputProps {
  onCalculate: (data: {
    financial: FinancialMetrics;
    environmental: EnvironmentalMetrics;
    social: SocialMetrics;
    common: CommonInputs;
  }) => void;
}

export default function DataInput({ onCalculate }: DataInputProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [financial, setFinancial] = useState<FinancialMetrics>({
    operationalEfficiencies: 0,
    costReductions: 0,
    revenueGrowth: 0,
    initialInvestment: 0,
    maintenanceCosts: 0,
  });
  
  const [environmental, setEnvironmental] = useState<EnvironmentalMetrics>({
    energy: { consumption: 0, costPerKwh: 0, reduction: 0, reductionCost: 0 },
    water: { consumption: 0, costPerM3: 0, reduction: 0, projectCost: 0 },
    waste: { tonnes: 0, costPerTonne: 0, reduction: 0, projectCost: 0 },
    scope1And2: { emissions: 0, costs: 0, reduction: 0, projectCost: 0 },
    scope3: { emissions: 0, costs: 0, reduction: 0, projectCost: 0 },
    carbonMarket: { credits: 0, sellingPrice: 0, projectCost: 0 },
    renewableEnergy: {
      purchased: { kwh: 0, cost: 0 },
      produced: { kwh: 0, cost: 0, projectCost: 0 }
    },
    sustainableMaterials: { tonnes: 0, costPerTonne: 0, decrease: 0, projectCost: 0 },
    brandMargin: {
      totalRevenue: 0,
      totalProfits: 0,
      greenProducts: { margin: 0, profitImpact: 0, cost: 0 },
      certifications: { revenueImpact: 0, cost: 0 },
      climateRisk: { benefits: 0, revenueImpact: 0 }
    }
  });
  
  const [social, setSocial] = useState<SocialMetrics>({
    turnover: { fteCost: 0, totalTurnoverCost: 0, employeesLeft: 0, fteBeginning: 0 },
    turnoverComposition: {
      employeeSatisfactionImpact: 0,
      careerDevelopmentImpact: 0,
      managementSatisfactionImpact: 0
    },
    employeeSatisfaction: { wageRatio: 0, satisfactionRate: 0 },
    careerDevelopment: { currentSatisfaction: 0, expectedSatisfaction: 0 },
    managementSatisfaction: { currentSatisfaction: 0, expectedSatisfaction: 0 },
    employerBrand: { socialProjectBenefits: 0, revenueImpact: 0 }
  });
  
  const [common, setCommon] = useState<CommonInputs>({
    discountRate: 8,
    projectionPeriod: 5,
  });

  const steps = [
    { title: 'Financial Metrics', component: FinancialSection },
    { title: 'Environmental Impact', component: EnvironmentalSection },
    { title: 'Social Metrics', component: SocialSection },
    { title: 'Common Parameters', component: CommonSection },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCalculate = () => {
    onCalculate({ financial, environmental, social, common });
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Data Input</h2>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {steps[currentStep].title}
          </h3>
          
          <CurrentComponent
            data={
              currentStep === 0 ? financial :
              currentStep === 1 ? environmental :
              currentStep === 2 ? social : common
            }
            onChange={
              currentStep === 0 ? setFinancial :
              currentStep === 1 ? setEnvironmental :
              currentStep === 2 ? setSocial : setCommon
            }
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleCalculate}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate ROI
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}