import { AIAnalysisInput } from '../types';

export async function generateAIReport(input: AIAnalysisInput, apiKey: string): Promise<string> {
  if (!apiKey) {
    return generateMockReport(input);
  }

  try {
    const prompt = createAnalysisPrompt(input);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || generateMockReport(input);
  } catch (error) {
    console.error('Error generating AI report:', error);
    return generateMockReport(input);
  }
}

function createAnalysisPrompt(input: AIAnalysisInput): string {
  const { results, inputs } = input;
  
  return `
You are a strategic business analyst specializing in Triple Bottom Line (TBL) analysis and sustainable business practices. 

Generate a comprehensive strategic analysis report for the project "${input.project.name}" based on the following Hybrid TBL ROI calculation results:

PROJECT INFORMATION:
- Project Name: ${input.project.name}
- Description: ${input.project.description || 'No description provided'}
- Created by: ${input.project.createdBy || 'Unknown'}
- Analysis Date: ${new Date().toLocaleDateString()}

FINANCIAL METRICS:
- Financial ROI: ${results.profit.roi.toFixed(2)}%
- Net Present Value: $${results.profit.npv.toLocaleString()}
- Payback Period: ${results.profit.paybackPeriod.toFixed(1)} years
- Total ROI: ${results.totalROI.toFixed(2)}%
- Discounted ROI: ${results.discountedROI.toFixed(2)}%

ENVIRONMENTAL METRICS:
- CO2e Tokens Generated: ${results.planet.co2eTokens.toLocaleString()}
- Environmental Value: $${results.planet.environmentalValue.toLocaleString()}
- Brand Margin Benefits (Planet): $${results.planet.brandMarginBenefits.toLocaleString()}

SOCIAL METRICS:
- Social Value Tokens: ${results.people.socialValueTokens.toLocaleString()}
- Turnover Savings: $${results.people.turnoverSavings.toLocaleString()}
- Brand Margin Benefits (People): $${results.people.brandMarginBenefits.toLocaleString()}

INPUT CONTEXT:
- Initial Investment: $${inputs.financial.initialInvestment.toLocaleString()}
- Projection Period: ${inputs.common.projectionPeriod} years
- Discount Rate: ${inputs.common.discountRate}%
- Energy Reduction Target: ${inputs.environmental.energy.reduction.toLocaleString()} kWh
- Employee Turnover Rate Context: ${inputs.social.turnover.employeesLeft}/${inputs.social.turnover.fteBeginning} employees

Please provide a detailed strategic analysis report with the following structure and formatting:

# STRATEGIC ANALYSIS REPORT: ${input.project.name.toUpperCase()}

## EXECUTIVE SUMMARY

## KEY FINDINGS ANALYSIS
### Financial Performance
### Environmental Impact  
### Social Value Creation

## INTERDEPENDENCIES & SYNERGIES

## STRENGTHS & OPPORTUNITIES

## CHALLENGES & RISKS

## STRATEGIC RECOMMENDATIONS

## IMPLEMENTATION PRIORITIES

## CONCLUSION

FORMATTING REQUIREMENTS:
- Use clear headings with # and ## markdown formatting
- Include bullet points and numbered lists where appropriate
- Write in professional, analytical tone
- Provide specific, data-driven recommendations
- Reference the project name throughout the analysis
- Include quantitative insights from the provided metrics

Focus on:
- Actionable insights and strategic recommendations
- Interdependencies between the three dimensions
- Long-term value creation opportunities
- Risk mitigation strategies
- Implementation guidance

The report should be suitable for executive leadership and board presentations, with specific focus on the "${input.project.name}" project context.
`;
}

function generateMockReport(input: AIAnalysisInput): string {
  const { results } = input;
  
  return `# STRATEGIC ANALYSIS REPORT: ${input.project.name.toUpperCase()}

## EXECUTIVE SUMMARY

This analysis reveals a comprehensive view of your organization's impact across financial, environmental, and social dimensions. With a total ROI of ${results.totalROI.toFixed(2)}% and a discounted ROI of ${results.discountedROI.toFixed(2)}%, your initiative demonstrates strong value creation potential across all three bottom lines.

## KEY FINDINGS ANALYSIS

### Financial Performance
The financial dimension shows an ROI of ${results.profit.roi.toFixed(2)}% with a Net Present Value of $${results.profit.npv.toLocaleString()}. The payback period of ${results.profit.paybackPeriod.toFixed(1)} years indicates ${results.profit.paybackPeriod <= 3 ? 'excellent' : results.profit.paybackPeriod <= 5 ? 'good' : 'moderate'} capital efficiency.

### Environmental Impact
Your environmental initiatives have generated ${results.planet.co2eTokens.toLocaleString()} CO2e tokens, representing significant environmental value creation of $${results.planet.environmentalValue.toLocaleString()}. Additionally, brand margin benefits from environmental initiatives contribute $${results.planet.brandMarginBenefits.toLocaleString()} annually.

### Social Value Creation
The people dimension contributes ${results.people.socialValueTokens.toLocaleString()} Social Value Tokens through improved employee satisfaction and reduced turnover. Direct turnover savings amount to $${results.people.turnoverSavings.toLocaleString()}, with additional brand benefits of $${results.people.brandMarginBenefits.toLocaleString()}.

## INTERDEPENDENCIES & SYNERGIES

The analysis reveals strong synergies between environmental and social initiatives, both contributing to enhanced brand value and customer loyalty. Environmental certifications and social responsibility programs create multiplicative effects on brand margin benefits.

## STRATEGIC RECOMMENDATIONS

1. Accelerate environmental initiatives with highest CO2e token generation potential
2. Integrate employee satisfaction programs with sustainability goals
3. Leverage brand margin benefits through targeted marketing of sustainability achievements
4. Establish measurement systems for ongoing TBL performance tracking
5. Consider expanding successful initiatives based on demonstrated ROI performance

## IMPLEMENTATION PRIORITIES

Priority 1: Focus on initiatives with payback periods under 3 years
Priority 2: Scale environmental programs generating highest CO2e token values  
Priority 3: Enhance employee engagement programs showing turnover reduction impact
Priority 4: Develop integrated reporting systems for continuous TBL monitoring

## CONCLUSION

Your Hybrid TBL ROI analysis demonstrates that sustainable business practices create measurable value across all three dimensions. The strong financial returns, combined with meaningful environmental and social impacts, position your organization for long-term competitive advantage and stakeholder value creation.

This analysis provides a foundation for strategic decision-making and resource allocation that optimizes returns across Profit, People, and Planet dimensions.`;
}