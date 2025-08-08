export interface SavedProject {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  data?: {
    financial: any;
    environmental: any;
    social: any;
    common: any;
  };
  results?: any;
}

const PROJECTS_STORAGE_KEY = 'tbl_roi_projects';

export function saveProject(project: SavedProject): void {
  const projects = getSavedProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = { ...project, lastModified: new Date() };
  } else {
    projects.push(project);
  }
  
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

export function getSavedProjects(): SavedProject[] {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!stored) return [];
    
    const projects = JSON.parse(stored);
    return projects.map((p: any) => ({
      ...p,
      createdAt: new Date(p.createdAt),
      lastModified: new Date(p.lastModified)
    }));
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export function deleteProject(projectId: string): void {
  const projects = getSavedProjects().filter(p => p.id !== projectId);
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

export function generateProjectId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}