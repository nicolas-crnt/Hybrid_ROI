import { supabase } from '../lib/supabase';
import { FinancialMetrics, EnvironmentalMetrics, SocialMetrics, CommonInputs, ROIResults } from '../types';

export interface ProjectData {
  financial: FinancialMetrics;
  environmental: EnvironmentalMetrics;
  social: SocialMetrics;
  common: CommonInputs;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  user_id: string | null;
  data: ProjectData | null;
  results: ROIResults | null;
  created_at: string;
  updated_at: string;
}

export async function createProject(name: string, description: string, userId?: string): Promise<{ data: Project | null; error: any }> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name,
      description,
      user_id: userId || null,
    })
    .select()
    .single();

  return { data, error };
}

export async function updateProject(
  id: string,
  updates: {
    name?: string;
    description?: string;
    data?: ProjectData;
    results?: ROIResults;
  }
): Promise<{ data: Project | null; error: any }> {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function getUserProjects(userId?: string): Promise<{ data: Project[] | null; error: any }> {
  let query = supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  } else {
    // For anonymous users, get projects without user_id
    query = query.is('user_id', null);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function deleteProject(id: string): Promise<{ error: any }> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  return { error };
}

export async function getProject(id: string): Promise<{ data: Project | null; error: any }> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}