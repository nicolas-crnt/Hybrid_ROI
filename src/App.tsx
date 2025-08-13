import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Layout/Header';
import LoginPage from './components/Auth/LoginPage';
import ProjectSetup from './components/ProjectSetup';
import HomePage from './components/HomePage';
import DataInput from './components/DataInput';
import Results from './components/Results';
import { FinancialMetrics, EnvironmentalMetrics, SocialMetrics, CommonInputs, ROIResults, ProjectInfo } from './types';
import { calculateROI } from './utils/calculations';
import { generateAIReport } from './utils/aiReport';
import { Project, createProject, updateProject } from './services/projectService';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'login' | 'project' | 'home' | 'input' | 'results'>('login');
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [roiResults, setRoiResults] = useState<ROIResults | null>(null);
  const [inputData, setInputData] = useState<{
    financial: FinancialMetrics;
    environmental: EnvironmentalMetrics;
    social: SocialMetrics;
    common: CommonInputs;
  } | null>(null);
  const geminiApiKey = 'AIzaSyCKXG-cpWucKYYfMxY-fGVDOW5VWURt8T0';

  // Redirect authenticated users past login
  React.useEffect(() => {
    if (!loading) {
      if (user && currentPage === 'login') {
        setCurrentPage('project');
      }
    }
  }, [user, loading, currentPage]);

  const handleLoginSuccess = () => {
    setCurrentPage('project');
  };

  const handleSkipLogin = () => {
    setCurrentPage('project');
  };

  const handleProjectCreate = async (projectName: string, description: string) => {
    try {
      const { data, error } = await createProject(projectName, description, user?.id);
      
      if (error) {
        console.error('Error creating project:', error);
        return;
      }

      if (data) {
        const projectInfo: ProjectInfo = {
          id: data.id,
          name: data.name,
          description: data.description,
          createdBy: user?.email || 'Guest',
          createdAt: new Date(data.created_at)
        };
        setProject(projectInfo);
        setCurrentPage('home');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleGetStarted = () => {
    setCurrentPage('input');
  };

  const handleCalculate = async (data: {
    financial: FinancialMetrics;
    environmental: EnvironmentalMetrics;
    social: SocialMetrics;
    common: CommonInputs;
  }) => {
    setInputData(data);
    const results = calculateROI(data.financial, data.environmental, data.social, data.common);
    setRoiResults(results);
    
    // Update project in database
    if (project) {
      try {
        await updateProject(project.id, {
          data,
          results
        });
      } catch (error) {
        console.error('Error updating project:', error);
      }
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

  const handleLoadProject = (savedProject: Project) => {
    const projectInfo: ProjectInfo = {
      id: savedProject.id,
      name: savedProject.name,
      description: savedProject.description,
      createdBy: user?.email || 'Guest',
      createdAt: new Date(savedProject.created_at)
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

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'login' && (
        <Header 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          project={project}
          onNewProject={handleNewProject}
          onLoadProject={handleLoadProject}
        />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
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