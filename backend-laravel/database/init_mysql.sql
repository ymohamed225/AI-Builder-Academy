-- Schema MySQL pour AI Builder Academy CI
CREATE DATABASE IF NOT EXISTS `ai_builder_academy` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ai_builder_academy`;

-- Table: pre_registrations
CREATE TABLE IF NOT EXISTS `pre_registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration_reference` VARCHAR(50) NOT NULL UNIQUE,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `city` VARCHAR(100) DEFAULT 'Abidjan',
  `desired_training` VARCHAR(50) DEFAULT 'BOOTCAMP',
  `programming_level` VARCHAR(50) DEFAULT 'débutant',
  `ai_experience` VARCHAR(50) DEFAULT 'aucun',
  `project_idea` TEXT,
  `project_type` VARCHAR(100),
  `weekly_availability` VARCHAR(50),
  `status` VARCHAR(50) DEFAULT 'NEW',
  `admin_notes` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: leads
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(150),
  `phone` VARCHAR(50),
  `source` VARCHAR(100),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: surveys
CREATE TABLE IF NOT EXISTS `surveys` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `fields_json` LONGTEXT,
  `is_active` TINYINT(1) DEFAULT 1,
  `responses_count` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: survey_responses
CREATE TABLE IF NOT EXISTS `survey_responses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `survey_id` INT NOT NULL,
  `respondent_name` VARCHAR(150) DEFAULT 'Anonyme',
  `respondent_email` VARCHAR(150),
  `answers_json` LONGTEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_survey_responses_survey` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: message_campaigns
CREATE TABLE IF NOT EXISTS `message_campaigns` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `channel` VARCHAR(50) DEFAULT 'WHATSAPP',
  `recipient_type` VARCHAR(50) DEFAULT 'ALL',
  `subject` VARCHAR(255),
  `body_template` TEXT NOT NULL,
  `attachment_url` VARCHAR(500),
  `attachment_name` VARCHAR(255),
  `is_scheduled` TINYINT(1) DEFAULT 0,
  `scheduled_at` DATETIME NULL,
  `sent_count` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
