-- Script d'initialisation PostgreSQL (Supabase / Render / Aiven)
-- AI BUILDER ACADEMY CI

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

CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150),
    phone VARCHAR(50),
    source VARCHAR(50) DEFAULT 'landing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    chariow_transaction_id VARCHAR(100) NOT NULL UNIQUE,
    student_name VARCHAR(150) NOT NULL,
    student_email VARCHAR(150),
    student_phone VARCHAR(50),
    offer_code VARCHAR(50) DEFAULT 'bootcamp',
    amount_paid NUMERIC(12,2) DEFAULT 0,
    payment_status VARCHAR(50) DEFAULT 'completed',
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    fields_json JSONB,
    is_active SMALLINT DEFAULT 1,
    responses_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS survey_responses (
    id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
    respondent_name VARCHAR(150),
    respondent_email VARCHAR(150),
    answers_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message_campaigns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    channel VARCHAR(50) DEFAULT 'WHATSAPP',
    recipient_type VARCHAR(50) DEFAULT 'ALL',
    subject VARCHAR(255),
    body_template TEXT,
    attachment_url VARCHAR(500),
    attachment_name VARCHAR(255),
    is_scheduled SMALLINT DEFAULT 0,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
