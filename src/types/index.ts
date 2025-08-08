export interface FinancialMetrics {
  operationalEfficiencies: number;
  costReductions: number;
  revenueGrowth: number;
  initialInvestment: number;
  maintenanceCosts: number;
}

export interface EnvironmentalMetrics {
  energy: {
    consumption: number;
    costPerKwh: number;
    reduction: number;
    reductionCost: number;
  };
  water: {
    consumption: number;
    costPerM3: number;
    reduction: number;
    projectCost: number;
  };
  waste: {
    tonnes: number;
    costPerTonne: number;
    reduction: number;
    projectCost: number;
  };
  scope1And2: {
    emissions: number;
    costs: number;
    reduction: number;
    projectCost: number;
  };
  scope3: {
    emissions: number;
    costs: number;
    reduction: number;
    projectCost: number;
  };
  carbonMarket: {
    credits: number;
    sellingPrice: number;
    projectCost: number;
  };
  renewableEnergy: {
    purchased: {
      kwh: number;
      cost: number;
    };
    produced: {
      kwh: number;
      cost: number;
      projectCost: number;
    };
  };
  sustainableMaterials: {
    tonnes: number;
    costPerTonne: number;
    decrease: number;
    projectCost: number;
  };
  brandMargin: {
    totalRevenue: number;
    totalProfits: number;
    greenProducts: {
      margin: number;
      profitImpact: number;
      cost: number;
    };
    certifications: {
      revenueImpact: number;
      cost: number;
    };
    climateRisk: {
      benefits: number;
      revenueImpact: number;
    };
  };
}

export interface SocialMetrics {
  turnover: {
    fteCost: number;
    totalTurnoverCost: number;
    employeesLeft: number;
    fteBeginning: number;
  };
  turnoverComposition: {
    employeeSatisfactionImpact: number;
    careerDevelopmentImpact: number;
    managementSatisfactionImpact: number;
  };
  employeeSatisfaction: {
    wageRatio: number;
    satisfactionRate: number;
  };
  careerDevelopment: {
    currentSatisfaction: number;
    expectedSatisfaction: number;
  };
  managementSatisfaction: {
    currentSatisfaction: number;
    expectedSatisfaction: number;
  };
  employerBrand: {
    socialProjectBenefits: number;
    revenueImpact: number;
  };
}

export interface CommonInputs {
  discountRate: number;
  projectionPeriod: number;
}

export interface ROIResults {
  profit: {
    roi: number;
    npv: number;
    paybackPeriod: number;
    yearlyFlow: number[];
  };
  planet: {
    co2eTokens: number;
    environmentalValue: number;
    brandMarginBenefits: number;
    yearlyImpact: number[];
  };
  people: {
    socialValueTokens: number;
    turnoverSavings: number;
    brandMarginBenefits: number;
    yearlyImpact: number[];
  };
  discountedROI: number;
  totalROI: number;
}

export interface ProjectInfo {
  name: string;
  description: string;
  createdBy?: string;
  createdAt: Date;
  id: string;
}

export interface AIAnalysisInput {
  results: ROIResults;
  inputs: {
    financial: FinancialMetrics;
    environmental: EnvironmentalMetrics;
    social: SocialMetrics;
    common: CommonInputs;
  };
  project: ProjectInfo;
}