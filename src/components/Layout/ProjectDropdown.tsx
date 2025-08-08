import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, FolderOpen, Plus, Trash2 } from 'lucide-react';
import { SavedProject, getSavedProjects, deleteProject } from '../../utils/projectStorage';

interface ProjectDropdownProps {
  user: string | null;
  currentProject: any;
  onNewProject: () => void;
  onLoadProject: (project: SavedProject) => void;
}

export default function ProjectDropdown({ user, currentProject, onNewProject, onLoadProject }: ProjectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProjects(getSavedProjects());
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
      setProjects(getSavedProjects());
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
            {projects.length === 0 ? (
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
                        <div className="mt-2 text-xs text-gray-500">
                          <span>by {project.createdBy}</span>
                        </div>
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