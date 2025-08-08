import React, { useState } from 'react';
import Header from './components/Layout/Header';
import LoginPage from './components/Auth/LoginPage';
import ProjectSetup from './components/ProjectSetup';
import HomePage from './components/HomePage';
import DataInput from './components/DataInput';
import Results from './components/Results';
import { FinancialMetrics, EnvironmentalMetrics, SocialMetrics, CommonInputs, ROIResults, ProjectInfo } from './types';
import { calculateROI } from './utils/calculations';
import { generateAIReport } from './utils/aiReport';
import { saveProject, SavedProject, generateProjectId } from './utils/projectStorage';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'project' | 'home' | 'input' | 'results'>('login');
  const [user, setUser] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [roiResults, setRoiResults] = useState<ROIResults | null>(null);
  const [inputData, setInputData] = useState<{
    financial: FinancialMetrics;
    environmental: EnvironmentalMetrics;
    social: SocialMetrics;
    common: CommonInputs;
  } | null>(null);
  const geminiApiKey = 'AIzaSyCKXG-cpWucKYYfMxY-fGVDOW5VWURt8T0';

  const handleLogin = (username: string) => {
    setUser(username);
    setCurrentPage('project');
  };

  const handleSkipLogin = () => {
    setUser(null);
    setCurrentPage('project');
  };

  const handleProjectCreate = (projectName: string, description: string) => {
    const projectInfo: ProjectInfo = {
      id: generateProjectId(),
      name: projectName,
      description,
      createdBy: user || 'Guest',
      createdAt: new Date()
    };
    setProject(projectInfo);
    
    // Save project to localStorage
    const savedProject: SavedProject = {
      id: projectInfo.id,
      name: projectInfo.name,
      description: projectInfo.description,
      createdBy: projectInfo.createdBy || 'Guest',
      createdAt: projectInfo.createdAt,
      lastModified: new Date()
    };
    saveProject(savedProject);
    
    setCurrentPage('home');
  };

  const handleGetStarted = () => {
    setCurrentPage('input');
  };

  const handleCalculate = (data: {
    financial: FinancialMetrics;
    environmental: EnvironmentalMetrics;
    social: SocialMetrics;
    common: CommonInputs;
  }) => {
    setInputData(data);
    const results = calculateROI(data.financial, data.environmental, data.social, data.common);
    setRoiResults(results);
    
    // Update saved project with data and results
    if (project) {
      const savedProject: SavedProject = {
        id: project.id,
        name: project.name,
        description: project.description,
        createdBy: project.createdBy || 'Guest',
        createdAt: project.createdAt,
        lastModified: new Date(),
        data,
        results
      };
      saveProject(savedProject);
    }
    
    setCurrentPage('results');
  };

  const handleRecalculate = () => {
    setCurrentPage('input');
  };

  const handleGenerateReport = async (): Promise<string> => {
    if (!roiResults || !inputData || !project) {
      throw new Error('No results available');
    }

    return await generateAIReport({
      results: roiResults,
      inputs: inputData,
      project
    }, geminiApiKey);
  };

  const handleNewProject = () => {
    setProject(null);
    setInputData(null);
    setRoiResults(null);
    setCurrentPage('project');
  };

  const handleLoadProject = (savedProject: SavedProject) => {
    const projectInfo: ProjectInfo = {
      id: savedProject.id,
      name: savedProject.name,
      description: savedProject.description,
      createdBy: savedProject.createdBy,
      createdAt: savedProject.createdAt
    };
    
    setProject(projectInfo);
    
    if (savedProject.data) {
      setInputData(savedProject.data);
    }
    
    if (savedProject.results) {
      setRoiResults(savedProject.results);
      setCurrentPage('results');
    } else if (savedProject.data) {
      setCurrentPage('input');
    } else {
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'login' && (
        <Header 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          user={user}
          project={project}
          onNewProject={handleNewProject}
          onLoadProject={handleLoadProject}
        />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onSkipLogin={handleSkipLogin}
        />
      )}
      
      {currentPage === 'project' && (
        <ProjectSetup onProjectCreate={handleProjectCreate} />
      )}
      
      {currentPage === 'home' && (
        <HomePage onGetStarted={handleGetStarted} />
      )}
      
      {currentPage === 'input' && (
        <DataInput onCalculate={handleCalculate} />
      )}
      
      {currentPage === 'results' && roiResults && (
        <Results 
          results={roiResults} 
          projectName={project?.name || 'Untitled Project'}
          onRecalculate={handleRecalculate}
          onGenerateReport={handleGenerateReport}
        />
      )}
    </div>
  );
}

export default App;