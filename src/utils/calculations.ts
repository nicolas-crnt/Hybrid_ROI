import { FinancialMetrics, EnvironmentalMetrics, SocialMetrics, CommonInputs, ROIResults } from '../types';

export function calculateROI(
  financial: FinancialMetrics,
  environmental: EnvironmentalMetrics,
  social: SocialMetrics,
  common: CommonInputs
): ROIResults {
  // Financial ROI Calculation: Net Profit / Cost of Investment
  const annualBenefits = financial.operationalEfficiencies + financial.costReductions + financial.revenueGrowth;
  const financialBenefitsOverPeriod = annualBenefits * common.projectionPeriod;
  const totalMaintenanceCosts = financial.maintenanceCosts * common.projectionPeriod;
  const netProfit = financialBenefitsOverPeriod - totalMaintenanceCosts - financial.initialInvestment;
  const financialROI = financial.initialInvestment > 0 ? (netProfit / financial.initialInvestment) * 100 : 0;

  // Calculate yearly cash flows (excluding initial investment from yearly flows)
  const yearlyFlow = Array.from({ length: common.projectionPeriod }, () => {
    return annualBenefits - financial.maintenanceCosts;
  });

  // DCF Calculation: NPV of gains / NPV of costs
  const discountRate = common.discountRate / 100;
  
  // Calculate NPV of gains (discounted cash flows)
  const npvOfGains = yearlyFlow.reduce((total, flow, year) => {
    return total + (flow / Math.pow(1 + discountRate, year + 1));
  }, 0);
  
  // Calculate NPV of costs (initial investment + discounted maintenance costs)
  const npvOfMaintenanceCosts = Array.from({ length: common.projectionPeriod }, () => financial.maintenanceCosts)
    .reduce((total, cost, year) => {
      return total + (cost / Math.pow(1 + discountRate, year + 1));
    }, 0);
  
  const npvOfCosts = financial.initialInvestment + npvOfMaintenanceCosts;
  const npv = npvOfGains - npvOfCosts;

  // Payback Period
  let cumulativeFlow = 0;
  let paybackPeriod = common.projectionPeriod;
  for (let year = 0; year < common.projectionPeriod; year++) {
    cumulativeFlow += annualBenefits - financial.maintenanceCosts;
    if (cumulativeFlow >= financial.initialInvestment) {
      paybackPeriod = year + 1;
      break;
    }
  }

  // Environmental Impact (CO2e Tokens)
  const energyReduction = environmental.energy.reduction * 0.5; // kg CO2e per kWh
  const waterReduction = environmental.water.reduction * 0.3; // kg CO2e per m³
  const wasteReduction = environmental.waste.reduction * 1000; // kg CO2e per tonne
  const emissionReduction = environmental.scope1And2.reduction + environmental.scope3.reduction;
  
  const co2eTokens = energyReduction + waterReduction + wasteReduction + emissionReduction;
  
  const environmentalValue = co2eTokens * 50; // $50 per tonne CO2e
  const brandMarginPlanet = environmental.brandMargin.greenProducts.profitImpact + 
                           environmental.brandMargin.certifications.revenueImpact * 0.1 +
                           environmental.brandMargin.climateRisk.benefits;

  // Social Impact (Social Value Tokens)
  const turnoverRate = social.turnover.employeesLeft / social.turnover.fteBeginning;
  const turnoverReduction = (social.turnoverComposition.employeeSatisfactionImpact + 
                           social.turnoverComposition.careerDevelopmentImpact + 
                           social.turnoverComposition.managementSatisfactionImpact) / 100;
  
  const turnoverSavings = social.turnover.totalTurnoverCost * turnoverReduction;
  const socialValueTokens = Math.floor(turnoverSavings / 1000); // 1 token per $1000 saved
  
  const brandMarginPeople = social.employerBrand.socialProjectBenefits + social.employerBrand.revenueImpact * 0.05;

  // Yearly impacts
  const planetYearlyImpact = Array.from({ length: common.projectionPeriod }, () => 
    environmentalValue + brandMarginPlanet
  );
  
  const peopleYearlyImpact = Array.from({ length: common.projectionPeriod }, () => 
    turnoverSavings + brandMarginPeople
  );

  // Total ROI (including all three dimensions)
  const totalAnnualBenefits = annualBenefits + environmentalValue + brandMarginPlanet + turnoverSavings + brandMarginPeople;
  const totalBenefitsOverPeriod = totalAnnualBenefits * common.projectionPeriod;
  const totalNetProfit = totalBenefitsOverPeriod - totalMaintenanceCosts - financial.initialInvestment;
  const totalROI = financial.initialInvestment > 0 ? (totalNetProfit / financial.initialInvestment) * 100 : 0;
  
  // Discounted ROI: NPV of total gains / NPV of total costs
  const discountedTotalBenefits = Array.from({ length: common.projectionPeriod }, (_, year) => 
    totalAnnualBenefits / Math.pow(1 + discountRate, year + 1)
  ).reduce((sum, value) => sum + value, 0);
  
  const discountedROI = npvOfCosts > 0 ? (discountedTotalBenefits / npvOfCosts) * 100 : 0;

  return {
    profit: {
      roi: financialROI,
      npv,
      paybackPeriod,
      yearlyFlow
    },
    planet: {
      co2eTokens,
      environmentalValue,
      brandMarginBenefits: brandMarginPlanet,
      yearlyImpact: planetYearlyImpact
    },
    people: {
      socialValueTokens,
      turnoverSavings,
      brandMarginBenefits: brandMarginPeople,
      yearlyImpact: peopleYearlyImpact
    },
    discountedROI,
    totalROI
  };
}