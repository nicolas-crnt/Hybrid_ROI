import React from 'react';
import { FileText, Sparkles, Download } from 'lucide-react';

interface AIReportProps {
  content: string;
  isGenerating: boolean;
  onGenerate: () => void;
  projectName: string;
}

export default function AIReport({ content, isGenerating, onGenerate, projectName }: AIReportProps) {
  const handleDownload = () => {
    if (!content) return;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_strategic_analysis.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!content && !isGenerating) {
    return (
      <div className="text-center py-12">
        <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          AI Strategic Analysis Report for {projectName}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Generate a comprehensive strategic analysis report with AI-powered insights 
          based on your ROI calculations and input data.
        </p>
        <button
          onClick={onGenerate}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate AI Report
        </button>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Generating Strategic Analysis for {projectName}...
        </h3>
        <p className="text-gray-600">
          AI is analyzing your data and preparing comprehensive insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Strategic Analysis Report - {projectName}
          </h3>
        </div>
        
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {content}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">AI-Generated Analysis</h4>
            <p className="text-sm text-blue-700 mt-1">
              This report was generated using artificial intelligence based on your input data 
              and ROI calculations. Use these insights as a starting point for strategic planning 
              and decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}