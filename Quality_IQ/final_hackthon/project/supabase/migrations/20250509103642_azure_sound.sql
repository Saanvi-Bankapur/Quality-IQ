/*
  # Initial Schema Setup for Manufacturing Quality Assistant

  1. New Tables
    - users (managed by Supabase Auth)
    - sectors
      - id (uuid, primary key)
      - name (text)
      - description (text)
    - checklist_items
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - sector_id (uuid, foreign key)
      - category (text)
      - failure_rate (numeric)
      - is_required (boolean)
    - checklists
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - sector_id (uuid, foreign key)
      - status (text)
      - completed_at (timestamptz)
      - completed_by (uuid, foreign key)
    - checklist_assignments
      - checklist_id (uuid, foreign key)
      - item_id (uuid, foreign key)
    - failure_records
      - id (uuid, primary key)
      - checklist_item_id (uuid, foreign key)
      - reported_by (uuid, foreign key)
      - description (text)
      - severity (text)
      - timestamp (timestamptz)
      - resolved_at (timestamptz)
      - resolution (text)
    - certifications
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - sector_id (uuid, foreign key)
      - status (text)
      - expires_at (timestamptz)
    - badges
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - icon (text)
    - user_badges
      - user_id (uuid, foreign key)
      - badge_id (uuid, foreign key)
      - earned_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create sectors table
CREATE TABLE sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create checklist_items table
CREATE TABLE checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  sector_id uuid REFERENCES sectors(id),
  category text NOT NULL,
  failure_rate numeric DEFAULT 0,
  is_required boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create checklists table
CREATE TABLE checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  sector_id uuid REFERENCES sectors(id),
  status text NOT NULL DEFAULT 'pending',
  completed_at timestamptz,
  completed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create checklist_assignments junction table
CREATE TABLE checklist_assignments (
  checklist_id uuid REFERENCES checklists(id) ON DELETE CASCADE,
  item_id uuid REFERENCES checklist_items(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (checklist_id, item_id)
);

-- Create failure_records table
CREATE TABLE failure_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_item_id uuid REFERENCES checklist_items(id),
  reported_by uuid REFERENCES auth.users(id),
  description text NOT NULL,
  severity text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  resolved_at timestamptz,
  resolution text,
  created_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  sector_id uuid REFERENCES sectors(id),
  status text NOT NULL DEFAULT 'pending',
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create badges table
CREATE TABLE badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_badges junction table
CREATE TABLE user_badges (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

-- Enable Row Level Security
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE failure_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read sectors"
  ON sectors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read checklist items"
  ON checklist_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read checklists"
  ON checklists FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to create and update their own checklists"
  ON checklists FOR ALL
  TO authenticated
  USING (auth.uid() = completed_by)
  WITH CHECK (auth.uid() = completed_by);

CREATE POLICY "Allow authenticated users to read checklist assignments"
  ON checklist_assignments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to read all failure records"
  ON failure_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to create and update their own failure records"
  ON failure_records FOR ALL
  TO authenticated
  USING (auth.uid() = reported_by)
  WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Allow authenticated users to read certifications"
  ON certifications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read badges"
  ON badges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to read their own badge assignments"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial sectors
INSERT INTO sectors (name, description) VALUES
  ('food', 'Food manufacturing sector with focus on safety and quality'),
  ('textile', 'Textile manufacturing sector with focus on material quality');