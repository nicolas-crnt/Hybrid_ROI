/*
  # Create projects table for Hybrid ROI Calculator

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text, project name)
      - `description` (text, project description)
      - `user_id` (uuid, references auth.users)
      - `data` (jsonb, stores input data)
      - `results` (jsonb, stores calculation results)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to manage their own projects
    - Add policy for anonymous users to read/write projects with session-based access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  data jsonb DEFAULT '{}',
  results jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to manage their own projects
CREATE POLICY "Users can manage own projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for anonymous users (guests) - they can only access projects they created in their session
CREATE POLICY "Anonymous users can manage session projects"
  ON projects
  FOR ALL
  TO anon
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);