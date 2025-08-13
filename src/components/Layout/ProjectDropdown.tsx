import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, FolderOpen, Plus, Trash2 } from 'lucide-react';
import { Project, getUserProjects, deleteProject } from '../../services/projectService';
import { useAuth } from '../../hooks/useAuth';

interface ProjectDropdownProps {
  user: string | null;
  currentProject: any;
  onNewProject: () => void;
  onLoadProject: (project: Project) => void;
}

export default function ProjectDropdown({ user, currentProject, onNewProject, onLoadProject }: ProjectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await getUserProjects(authUser?.id);
      if (error) {
        console.error('Error loading projects:', error);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteProject = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await deleteProject(projectId);
      if (error) {
        console.error('Error deleting project:', error);
      } else {
        await loadProjects();
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
      >
        <span>{user || 'Guest'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Projects</h3>
              <button
                onClick={() => {
                  onNewProject();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>New</span>
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <FolderOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No projects yet</p>
                <p className="text-xs text-gray-400">Create your first project to get started</p>
              </div>
            ) : (
              <div className="py-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                      currentProject?.id === project.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      onLoadProject(project);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {project.name}
                        </h4>
                        {project.description && (
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {project.description}
                          </p>
                        )}
                        {user && (
                          <div className="mt-2 text-xs text-gray-500">
                            <span>by {user}</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => handleDeleteProject(e, project.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}