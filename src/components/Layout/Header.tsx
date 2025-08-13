import React from 'react';
import { Calculator, Home, FileText, BarChart3, LogOut } from 'lucide-react';
import { ProjectInfo } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import ProjectDropdown from './ProjectDropdown';
import { Project } from '../../services/projectService';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  project: ProjectInfo | null;
  onNewProject: () => void;
  onLoadProject: (project: Project) => void;
}

export default function Header({ currentPage, onNavigate, project, onNewProject, onLoadProject }: HeaderProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    if (user) {
      await signOut();
    }
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Hybrid TBL ROI Calculator
              </h1>
              {project && (
                <p className="text-sm text-gray-600">
                  Project: {project.name}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              
              <button
                onClick={() => onNavigate('input')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'input'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Data Input</span>
              </button>
              
              <button
                onClick={() => onNavigate('results')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'results'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Results</span>
              </button>
            </nav>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <ProjectDropdown
                user={user?.email || null}
                currentProject={project}
                onNewProject={onNewProject}
                onLoadProject={onLoadProject}
              />
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>{user ? 'Sign Out' : 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}