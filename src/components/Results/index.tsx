import React, { useState } from 'react';
import { BarChart3, Download, RefreshCw, FileText } from 'lucide-react';
import { ROIResults } from '../../types';
import Dashboard from './Dashboard';
import AIReport from './AIReport';

interface ResultsProps {
  results: ROIResults;
  projectName: string;
  onRecalculate: () => void;
  onGenerateReport: () => Promise<string>;
}

export default function Results({ results, projectName, onRecalculate, onGenerateReport }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'report'>('dashboard');
  const [reportContent, setReportContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const content = await onGenerateReport();
      setReportContent(content);
      setActiveTab('report');
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = () => {
    if (!reportContent) return;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_tbl_roi_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">ROI Analysis Results</h2>
            <h3 className="text-xl text-blue-600 mt-1">{projectName}</h3>
            <p className="text-gray-600 mt-2">
              Comprehensive analysis of your Triple Bottom Line ROI across Profit, People, and Planet dimensions
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'AI Report'}
            </button>
            
            {reportContent && (
              <button
                onClick={handleDownloadReport}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            )}
            
            <button
              onClick={onRecalculate}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Recalculate
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('report')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'report'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>AI Strategic Report</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' ? (
              <Dashboard results={results} />
            ) : (
              <AIReport 
                content={reportContent} 
                isGenerating={isGenerating}
                onGenerate={handleGenerateReport}
                projectName={projectName}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}