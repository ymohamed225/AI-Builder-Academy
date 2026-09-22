-- Schema PostgreSQL pour AI Builder Academy CI (Compatible Supabase / Render / Aiven)

-- Table: pre_registrations
CREATE TABLE IF NOT EXISTS pre_registrations (
  id SERIAL PRIMARY KEY,
  registration_reference VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100) DEFAULT 'Abidjan',
  desired_training VARCHAR(50) DEFAULT 'BOOTCAMP',
  programming_level VARCHAR(50) DEFAULT 'débutant',
  ai_experience VARCHAR(50) DEFAULT 'aucun',
  project_idea TEXT,
  project_type VARCHAR(100),
  weekly_availability VARCHAR(50),
  status VARCHAR(50) DEFAULT 'NEW',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: leads
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150),
  phone VARCHAR(50),
  source VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: surveys
CREATE TABLE IF NOT EXISTS surveys (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  fields_json TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  responses_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: survey_responses
CREATE TABLE IF NOT EXISTS survey_responses (
  id SERIAL PRIMARY KEY,
  survey_id INT NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  respondent_name VARCHAR(150) DEFAULT 'Anonyme',
  respondent_email VARCHAR(150),
  answers_json TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: message_campaigns
CREATE TABLE IF NOT EXISTS message_campaigns (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  channel VARCHAR(50) DEFAULT 'WHATSAPP',
  recipient_type VARCHAR(50) DEFAULT 'ALL',
  subject VARCHAR(255),
  body_template TEXT NOT NULL,
  attachment_url VARCHAR(500),
  attachment_name VARCHAR(255),
  is_scheduled BOOLEAN DEFAULT FALSE,
  scheduled_at TIMESTAMP WITH TIME ZONE NULL,
  sent_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
