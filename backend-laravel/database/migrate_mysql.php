<?php
// Migration script: JSON to MySQL for AI Builder Academy CI

$host = '127.0.0.1';
$port = '3306';
$user = 'root';
$pass = '';
$dbname = 'ai_builder_academy';

try {
    $pdo = new PDO("mysql:host={$host};port={$port}", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Create DB & tables
    $sql = file_get_contents(__DIR__ . '/init_mysql.sql');
    $pdo->exec($sql);
    echo "MySQL Database & Tables initialized successfully.\n";

    $pdo->exec("USE `{$dbname}`");

    // 1. Migrate Pre-registrations
    $filePreReg = __DIR__ . '/../storage/pre_registrations.json';
    if (file_exists($filePreReg)) {
        $data = json_decode(file_get_contents($filePreReg), true) ?? [];
        $stmt = $pdo->prepare("INSERT IGNORE INTO pre_registrations 
            (registration_reference, first_name, last_name, email, phone, city, desired_training, programming_level, ai_experience, project_idea, project_type, weekly_availability, status, admin_notes, created_at, updated_at) 
            VALUES (:ref, :first_name, :last_name, :email, :phone, :city, :desired_training, :programming_level, :ai_experience, :project_idea, :project_type, :weekly_availability, :status, :admin_notes, :created_at, :updated_at)");
        
        $count = 0;
        foreach ($data as $r) {
            $ref = $r['registration_reference'] ?? ('AI-CI-' . date('Y') . '-' . strtoupper(substr(md5(uniqid()), 0, 5)));
            $stmt->execute([
                ':ref' => $ref,
                ':first_name' => $r['first_name'] ?? 'Inconnu',
                ':last_name' => $r['last_name'] ?? '',
                ':email' => $r['email'] ?? '',
                ':phone' => $r['phone'] ?? '',
                ':city' => $r['city'] ?? 'Abidjan',
                ':desired_training' => $r['desired_training'] ?? 'BOOTCAMP',
                ':programming_level' => $r['programming_level'] ?? 'débutant',
                ':ai_experience' => $r['ai_experience'] ?? 'aucun',
                ':project_idea' => $r['project_idea'] ?? '',
                ':project_type' => $r['project_type'] ?? '',
                ':weekly_availability' => $r['weekly_availability'] ?? '',
                ':status' => $r['status'] ?? 'NEW',
                ':admin_notes' => $r['admin_notes'] ?? '',
                ':created_at' => isset($r['created_at']) ? date('Y-m-d H:i:s', strtotime($r['created_at'])) : date('Y-m-d H:i:s'),
                ':updated_at' => isset($r['updated_at']) ? date('Y-m-d H:i:s', strtotime($r['updated_at'])) : date('Y-m-d H:i:s'),
            ]);
            $count++;
        }
        echo "Migrated {$count} pre-registrations to MySQL.\n";
    }

    // 2. Migrate Surveys
    $fileSurveys = __DIR__ . '/../storage/surveys.json';
    if (file_exists($fileSurveys)) {
        $surveys = json_decode(file_get_contents($fileSurveys), true) ?? [];
        $stmtSurvey = $pdo->prepare("INSERT IGNORE INTO surveys (id, slug, title, description, fields_json, is_active, responses_count, created_at)
            VALUES (:id, :slug, :title, :desc, :fields, :is_active, :resp_count, :created_at)");

        foreach ($surveys as $s) {
            $stmtSurvey->execute([
                ':id' => $s['id'] ?? null,
                ':slug' => $s['slug'] ?? ('survey-' . substr(md5(uniqid()), 0, 5)),
                ':title' => $s['title'] ?? 'Sans titre',
                ':desc' => $s['description'] ?? '',
                ':fields' => json_encode($s['fields'] ?? []),
                ':is_active' => ($s['is_active'] ?? true) ? 1 : 0,
                ':resp_count' => $s['responses_count'] ?? 0,
                ':created_at' => isset($s['created_at']) ? date('Y-m-d H:i:s', strtotime($s['created_at'])) : date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($surveys) . " surveys to MySQL.\n";
    }

    // 3. Migrate Survey Responses
    $fileResponses = __DIR__ . '/../storage/survey_responses.json';
    if (file_exists($fileResponses)) {
        $responses = json_decode(file_get_contents($fileResponses), true) ?? [];
        $stmtResp = $pdo->prepare("INSERT IGNORE INTO survey_responses (id, survey_id, respondent_name, respondent_email, answers_json, created_at)
            VALUES (:id, :survey_id, :name, :email, :answers, :created_at)");

        foreach ($responses as $resp) {
            $stmtResp->execute([
                ':id' => $resp['id'] ?? null,
                ':survey_id' => $resp['survey_id'] ?? 1,
                ':name' => $resp['respondent_name'] ?? 'Anonyme',
                ':email' => $resp['respondent_email'] ?? '',
                ':answers' => json_encode($resp['answers'] ?? []),
                ':created_at' => isset($resp['created_at']) ? date('Y-m-d H:i:s', strtotime($resp['created_at'])) : date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($responses) . " survey responses to MySQL.\n";
    }

    // 4. Migrate Message Campaigns
    $fileCampaigns = __DIR__ . '/../storage/campaigns.json';
    if (file_exists($fileCampaigns)) {
        $campaigns = json_decode(file_get_contents($fileCampaigns), true) ?? [];
        $stmtCamp = $pdo->prepare("INSERT IGNORE INTO message_campaigns (id, title, channel, recipient_type, subject, body_template, attachment_url, attachment_name, is_scheduled, scheduled_at, sent_count, created_at)
            VALUES (:id, :title, :channel, :recipient_type, :subject, :body_template, :attachment_url, :attachment_name, :is_scheduled, :scheduled_at, :sent_count, :created_at)");

        foreach ($campaigns as $c) {
            $stmtCamp->execute([
                ':id' => $c['id'] ?? null,
                ':title' => $c['title'] ?? 'Sans titre',
                ':channel' => $c['channel'] ?? 'WHATSAPP',
                ':recipient_type' => $c['recipient_type'] ?? 'ALL',
                ':subject' => $c['subject'] ?? '',
                ':body_template' => $c['body_template'] ?? '',
                ':attachment_url' => $c['attachment_url'] ?? '',
                ':attachment_name' => $c['attachment_name'] ?? '',
                ':is_scheduled' => ($c['is_scheduled'] ?? false) ? 1 : 0,
                ':scheduled_at' => !empty($c['scheduled_at']) ? date('Y-m-d H:i:s', strtotime($c['scheduled_at'])) : null,
                ':sent_count' => $c['sent_count'] ?? 0,
                ':created_at' => isset($c['created_at']) ? date('Y-m-d H:i:s', strtotime($c['created_at'])) : date('Y-m-d H:i:s')
            ]);
        }
        echo "Migrated " . count($campaigns) . " campaigns to MySQL.\n";
    }

    echo "ALL MIGRATIONS COMPLETED SUCCESSFULLY!\n";

} catch (Exception $e) {
    echo "MIGRATION ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
