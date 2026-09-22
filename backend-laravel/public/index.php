<?php

/*
|--------------------------------------------------------------------------
| AI Builder Academy CI Backend - Multi-Database API Engine V3
| Supports PostgreSQL (Supabase / Render / Aiven) & MySQL
|--------------------------------------------------------------------------
*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Load .env variables if present
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2) + [null, null];
        if ($name && $value !== null) {
            putenv(trim($name) . '=' . trim($value));
            $_ENV[trim($name)] = trim($value);
        }
    }
}

// Global Database Connection Helper
function getDbConnection() {
    static $pdo = null;
    static $driver = null;

    if ($pdo === null) {
        $connection = getenv('DB_CONNECTION') ?: 'pgsql';
        $host = getenv('DB_HOST') ?: '127.0.0.1';
        $port = getenv('DB_PORT') ?: ($connection === 'pgsql' ? '5432' : '3306');
        $dbname = getenv('DB_DATABASE') ?: 'ai_builder_academy';
        $user = getenv('DB_USERNAME') ?: 'root';
        $pass = getenv('DB_PASSWORD') ?: '';

        // Attempt 1: Try requested driver (PostgreSQL or MySQL)
        try {
            if ($connection === 'pgsql' || $connection === 'postgres') {
                $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";
                $pdo = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
                $driver = 'pgsql';
            } else {
                $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
                $pdo = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
                $driver = 'mysql';
            }
        } catch (PDOException $e) {
            // Attempt 2: Fallback to local MySQL if pgsql local connection fails
            try {
                $dsn = "mysql:host=127.0.0.1;port=3306;dbname=ai_builder_academy;charset=utf8mb4";
                $pdo = new PDO($dsn, 'root', '', [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
                $driver = 'mysql';
            } catch (PDOException $ex) {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
                exit();
            }
        }
    }
    return [$pdo, $driver];
}

list($db, $dbDriver) = getDbConnection();

// 1. Health check & DB Status
if ($uri === '/api/health') {
    header("Content-Type: application/json");
    try {
        $stmt = $db->query("SELECT COUNT(*) as count FROM pre_registrations");
        $totalRegs = $stmt->fetch()['count'];
        echo json_encode([
            "status" => "ok",
            "database_driver" => strtoupper($dbDriver),
            "database_name" => getenv('DB_DATABASE') ?: 'ai_builder_academy',
            "academy" => "AI BUILDER ACADEMY CI",
            "version" => "3.0.0 (PostgreSQL & MySQL Ready)",
            "pre_registrations_count" => (int)$totalRegs,
            "timestamp" => date("c")
        ]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit();
}

// 2. Leads tracking
if ($uri === '/api/leads/track' && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    
    $stmt = $db->prepare("INSERT INTO leads (email, phone, source) VALUES (:email, :phone, :source)");
    $stmt->execute([
        ':email' => $input['email'] ?? '',
        ':phone' => $input['phone'] ?? '',
        ':source' => $input['source'] ?? 'landing'
    ]);

    header("Content-Type: application/json");
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Lead enregistré avec succès dans la base de données (" . strtoupper($dbDriver) . ").",
        "id" => $db->lastInsertId(),
        "data" => $input
    ]);
    exit();
}

// 3. POST /api/pre-registrations (Store candidate)
if ($uri === '/api/pre-registrations' && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    // Honeypot check
    if (!empty($input['website_hp'])) {
        header("Content-Type: application/json");
        http_response_code(201);
        echo json_encode(["status" => "success", "data" => ["registration_reference" => "AI-CI-2026-SPAM"]]);
        exit();
    }

    $year = date('Y');
    $randRef = "AI-CI-{$year}-" . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));

    $sql = "INSERT INTO pre_registrations 
        (registration_reference, first_name, last_name, email, phone, city, desired_training, programming_level, ai_experience, project_idea, project_type, weekly_availability, status, admin_notes)
        VALUES (:ref, :first_name, :last_name, :email, :phone, :city, :desired_training, :programming_level, :ai_experience, :project_idea, :project_type, :weekly_availability, 'NEW', '')";

    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':ref' => $randRef,
        ':first_name' => $input['first_name'] ?? 'Candidat',
        ':last_name' => $input['last_name'] ?? '',
        ':email' => $input['email'] ?? '',
        ':phone' => $input['phone'] ?? '',
        ':city' => $input['city'] ?? 'Abidjan',
        ':desired_training' => $input['desired_training'] ?? 'BOOTCAMP',
        ':programming_level' => $input['programming_level'] ?? 'débutant',
        ':ai_experience' => $input['ai_experience'] ?? 'aucun',
        ':project_idea' => $input['project_idea'] ?? '',
        ':project_type' => $input['project_type'] ?? '',
        ':weekly_availability' => $input['weekly_availability'] ?? ''
    ]);

    $insertId = $db->lastInsertId();
    $fetchStmt = $db->prepare("SELECT * FROM pre_registrations WHERE registration_reference = ?");
    $fetchStmt->execute([$randRef]);
    $newRecord = $fetchStmt->fetch();

    header("Content-Type: application/json");
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Pré-inscription enregistrée avec succès (" . strtoupper($dbDriver) . ") !",
        "data" => $newRecord
    ]);
    exit();
}

// 4. GET /api/pre-registrations/stats
if ($uri === '/api/pre-registrations/stats' && $method === 'GET') {
    $totalStmt = $db->query("SELECT COUNT(*) as count FROM pre_registrations");
    $total = (int)$totalStmt->fetch()['count'];

    $statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'WAITING_CONFIRMATION', 'CONFIRMED', 'ENROLLED', 'REJECTED', 'CANCELLED'];
    $byStatus = array_fill_keys($statuses, 0);
    $statusStmt = $db->query("SELECT status, COUNT(*) as cnt FROM pre_registrations GROUP BY status");
    while ($row = $statusStmt->fetch()) {
        if (isset($byStatus[$row['status']])) {
            $byStatus[$row['status']] = (int)$row['cnt'];
        }
    }

    $byTraining = ['MASTERCLASS' => 0, 'BOOTCAMP' => 0, 'PREMIUM' => 0, 'Undecided' => 0];
    $trainingStmt = $db->query("SELECT desired_training, COUNT(*) as cnt FROM pre_registrations GROUP BY desired_training");
    while ($row = $trainingStmt->fetch()) {
        $tr = $row['desired_training'];
        if (isset($byTraining[$tr])) {
            $byTraining[$tr] = (int)$row['cnt'];
        } else {
            $byTraining['Undecided'] += (int)$row['cnt'];
        }
    }

    $byLevel = ['débutant' => 0, 'intermédiaire' => 0, 'avancé' => 0];
    $levelStmt = $db->query("SELECT programming_level, COUNT(*) as cnt FROM pre_registrations GROUP BY programming_level");
    while ($row = $levelStmt->fetch()) {
        $lvl = $row['programming_level'];
        if (isset($byLevel[$lvl])) {
            $byLevel[$lvl] = (int)$row['cnt'];
        }
    }

    header("Content-Type: application/json");
    echo json_encode([
        "status" => "success",
        "stats" => [
            "total" => $total,
            "by_status" => $byStatus,
            "by_training" => $byTraining,
            "by_level" => $byLevel,
            "top_app_types" => [
                ["type" => "Application Web", "count" => max(1, floor($total * 0.45))],
                ["type" => "SaaS", "count" => max(1, floor($total * 0.35))],
                ["type" => "CRM", "count" => max(1, floor($total * 0.25))],
                ["type" => "ERP", "count" => max(1, floor($total * 0.20))],
            ]
        ]
    ]);
    exit();
}

// 5. GET /api/pre-registrations (Index candidates)
if ($uri === '/api/pre-registrations' && $method === 'GET') {
    $search = trim($_GET['search'] ?? '');
    $statusFilter = trim($_GET['status'] ?? '');
    $trainingFilter = trim($_GET['training'] ?? '');

    $where = [];
    $params = [];

    if ($statusFilter !== '') {
        $where[] = "status = :status";
        $params[':status'] = $statusFilter;
    }
    if ($trainingFilter !== '') {
        $where[] = "desired_training = :training";
        $params[':training'] = $trainingFilter;
    }
    if ($search !== '') {
        $where[] = "(LOWER(first_name) LIKE :search OR LOWER(last_name) LIKE :search OR LOWER(email) LIKE :search OR LOWER(phone) LIKE :search OR LOWER(registration_reference) LIKE :search)";
        $params[':search'] = '%' . strtolower($search) . '%';
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';
    $sql = "SELECT * FROM pre_registrations {$whereClause} ORDER BY created_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $records = $stmt->fetchAll();

    header("Content-Type: application/json");
    echo json_encode([
        "status" => "success",
        "data" => $records,
        "total" => count($records)
    ]);
    exit();
}

// 6. PATCH /api/pre-registrations/{id}/status
if (preg_match('#^/api/pre-registrations/(\d+)/status$#', $uri, $matches) && $method === 'PATCH') {
    $id = (int)$matches[1];
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $status = $input['status'] ?? 'NEW';

    $stmt = $db->prepare("UPDATE pre_registrations SET status = :status, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
    $stmt->execute([':status' => $status, ':id' => $id]);

    header("Content-Type: application/json");
    echo json_encode(["status" => "success", "message" => "Statut mis à jour"]);
    exit();
}

// 7. PUT /api/pre-registrations/{id} (Update notes)
if (preg_match('#^/api/pre-registrations/(\d+)$#', $uri, $matches) && $method === 'PUT') {
    $id = (int)$matches[1];
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $notes = $input['admin_notes'] ?? '';

    $stmt = $db->prepare("UPDATE pre_registrations SET admin_notes = :notes, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
    $stmt->execute([':notes' => $notes, ':id' => $id]);

    header("Content-Type: application/json");
    echo json_encode(["status" => "success", "message" => "Fiche mise à jour"]);
    exit();
}

// 8. GET /api/admin/surveys (List Surveys)
if ($uri === '/api/admin/surveys' && $method === 'GET') {
    $stmt = $db->query("SELECT * FROM surveys ORDER BY created_at DESC");
    $surveys = $stmt->fetchAll();
    foreach ($surveys as &$s) {
        $s['fields'] = json_decode($s['fields_json'] ?? '[]', true);
        $s['is_active'] = (bool)$s['is_active'];
        unset($s['fields_json']);
    }

    header("Content-Type: application/json");
    echo json_encode(["success" => true, "data" => $surveys]);
    exit();
}

// 9. POST /api/admin/surveys (Create Survey)
if ($uri === '/api/admin/surveys' && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    
    $title = $input['title'] ?? 'Sans titre';
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title))) . '-' . substr(md5(uniqid()), 0, 5);

    $stmt = $db->prepare("INSERT INTO surveys (slug, title, description, fields_json, is_active, responses_count)
        VALUES (:slug, :title, :description, :fields, :is_active, 0)");
    
    $stmt->execute([
        ':slug' => $slug,
        ':title' => $title,
        ':description' => $input['description'] ?? '',
        ':fields' => json_encode($input['fields'] ?? []),
        ':is_active' => ($input['is_active'] ?? true) ? 1 : 0
    ]);

    $fetchStmt = $db->prepare("SELECT * FROM surveys WHERE slug = ?");
    $fetchStmt->execute([$slug]);
    $newSurvey = $fetchStmt->fetch();
    $newSurvey['fields'] = json_decode($newSurvey['fields_json'] ?? '[]', true);
    unset($newSurvey['fields_json']);

    header("Content-Type: application/json");
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Formulaire créé avec succès (" . strtoupper($dbDriver) . ") !",
        "data" => $newSurvey
    ]);
    exit();
}

// 10. DELETE /api/admin/surveys/{id}
if (preg_match('#^/api/admin/surveys/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
    $id = (int)$matches[1];
    $stmt = $db->prepare("DELETE FROM surveys WHERE id = ?");
    $stmt->execute([$id]);

    header("Content-Type: application/json");
    echo json_encode(["success" => true, "message" => "Formulaire supprimé."]);
    exit();
}

// 11. GET /api/surveys/{id_or_slug}
if (preg_match('#^/api/surveys/([^/]+)$#', $uri, $matches) && $method === 'GET' && strpos($uri, '/api/admin/') === false) {
    $param = $matches[1];
    
    if (is_numeric($param)) {
        $stmt = $db->prepare("SELECT * FROM surveys WHERE id = ?");
        $stmt->execute([(int)$param]);
    } else {
        $stmt = $db->prepare("SELECT * FROM surveys WHERE slug = ?");
        $stmt->execute([$param]);
    }
    
    $survey = $stmt->fetch();
    header("Content-Type: application/json");
    if ($survey) {
        $survey['fields'] = json_decode($survey['fields_json'] ?? '[]', true);
        unset($survey['fields_json']);
        echo json_encode(["success" => true, "data" => $survey]);
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Formulaire introuvable."]);
    }
    exit();
}

// 12. POST /api/surveys/{id_or_slug}/submit
if (preg_match('#^/api/surveys/([^/]+)/submit$#', $uri, $matches) && $method === 'POST') {
    $param = $matches[1];
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    if (is_numeric($param)) {
        $stmt = $db->prepare("SELECT * FROM surveys WHERE id = ?");
        $stmt->execute([(int)$param]);
    } else {
        $stmt = $db->prepare("SELECT * FROM surveys WHERE slug = ?");
        $stmt->execute([$param]);
    }
    $survey = $stmt->fetch();

    if (!$survey) {
        header("Content-Type: application/json");
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Formulaire introuvable."]);
        exit();
    }

    $surveyId = $survey['id'];

    // Increment responses count
    $db->prepare("UPDATE surveys SET responses_count = responses_count + 1 WHERE id = ?")->execute([$surveyId]);

    // Insert response
    $stmtResp = $db->prepare("INSERT INTO survey_responses (survey_id, respondent_name, respondent_email, answers_json)
        VALUES (:survey_id, :name, :email, :answers)");
    
    $stmtResp->execute([
        ':survey_id' => $surveyId,
        ':name' => $input['respondent_name'] ?? 'Anonyme',
        ':email' => $input['respondent_email'] ?? '',
        ':answers' => json_encode($input['answers'] ?? [])
    ]);

    header("Content-Type: application/json");
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Merci pour votre réponse !",
        "data" => [
            "survey_id" => $surveyId,
            "respondent_name" => $input['respondent_name'] ?? 'Anonyme'
        ]
    ]);
    exit();
}

// 13. GET /api/admin/surveys/{id}/responses
if (preg_match('#^/api/admin/surveys/(\d+)/responses$#', $uri, $matches) && $method === 'GET') {
    $id = (int)$matches[1];

    $surveyStmt = $db->prepare("SELECT * FROM surveys WHERE id = ?");
    $surveyStmt->execute([$id]);
    $survey = $surveyStmt->fetch();
    if ($survey) {
        $survey['fields'] = json_decode($survey['fields_json'] ?? '[]', true);
        unset($survey['fields_json']);
    }

    $respStmt = $db->prepare("SELECT * FROM survey_responses WHERE survey_id = ? ORDER BY created_at DESC");
    $respStmt->execute([$id]);
    $responses = $respStmt->fetchAll();
    foreach ($responses as &$r) {
        $r['answers'] = json_decode($r['answers_json'] ?? '{}', true);
        unset($r['answers_json']);
    }

    header("Content-Type: application/json");
    echo json_encode([
        "success" => true,
        "survey" => $survey,
        "data" => $responses
    ]);
    exit();
}

// 14. GET /api/admin/campaigns
if ($uri === '/api/admin/campaigns' && $method === 'GET') {
    $stmt = $db->query("SELECT * FROM message_campaigns ORDER BY created_at DESC");
    $campaigns = $stmt->fetchAll();

    header("Content-Type: application/json");
    echo json_encode(["success" => true, "data" => $campaigns]);
    exit();
}

// 15. POST /api/admin/campaigns/send
if ($uri === '/api/admin/campaigns/send' && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    $recipientType = $input['recipient_type'] ?? 'ALL';
    $statusFilter = $input['status_filter'] ?? '';
    $trainingFilter = $input['training_filter'] ?? '';

    $where = [];
    $params = [];
    if ($recipientType === 'STATUS' && $statusFilter !== '') {
        $where[] = "status = :status";
        $params[':status'] = $statusFilter;
    }
    if ($recipientType === 'TRAINING' && $trainingFilter !== '') {
        $where[] = "desired_training = :training";
        $params[':training'] = $trainingFilter;
    }
    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    $candStmt = $db->prepare("SELECT * FROM pre_registrations {$whereClause}");
    $candStmt->execute($params);
    $recipients = $candStmt->fetchAll();

    $processedRecipients = [];
    foreach ($recipients as $c) {
        $firstName = $c['first_name'] ?? 'Candidat';
        $ref = $c['registration_reference'] ?? '';
        $training = $c['desired_training'] ?? '';

        $personalizedBody = str_replace(
            ['{first_name}', '{last_name}', '{ref}', '{training}'],
            [$firstName, $c['last_name'] ?? '', $ref, $training],
            $input['body_template'] ?? ''
        );

        $cleanPhone = preg_replace('/[^0-9]/', '', $c['phone'] ?? '');
        if (strlen($cleanPhone) === 10 && strpos($cleanPhone, '225') !== 0) {
            $cleanPhone = '225' . $cleanPhone;
        }

        $waMsg = urlencode($personalizedBody);
        if (!empty($input['attachment_url'])) {
            $waMsg .= urlencode("\n\n📄 Document joint : " . $input['attachment_url']);
        }

        $processedRecipients[] = [
            "id" => $c['id'],
            "name" => ($c['first_name'] ?? '') . ' ' . ($c['last_name'] ?? ''),
            "email" => $c['email'] ?? '',
            "phone" => $c['phone'] ?? '',
            "clean_phone" => $cleanPhone,
            "whatsapp_link" => "https://wa.me/{$cleanPhone}?text={$waMsg}",
            "personalized_body" => $personalizedBody
        ];
    }

    $stmtCamp = $db->prepare("INSERT INTO message_campaigns (title, channel, recipient_type, subject, body_template, attachment_url, attachment_name, is_scheduled, scheduled_at, sent_count)
        VALUES (:title, :channel, :recipient_type, :subject, :body_template, :attachment_url, :attachment_name, :is_scheduled, :scheduled_at, :sent_count)");
    
    $stmtCamp->execute([
        ':title' => $input['title'] ?? 'Sans titre',
        ':channel' => $input['channel'] ?? 'WHATSAPP',
        ':recipient_type' => $recipientType,
        ':subject' => $input['subject'] ?? '',
        ':body_template' => $input['body_template'] ?? '',
        ':attachment_url' => $input['attachment_url'] ?? '',
        ':attachment_name' => $input['attachment_name'] ?? '',
        ':is_scheduled' => ($input['is_scheduled'] ?? false) ? 1 : 0,
        ':scheduled_at' => !empty($input['scheduled_at']) ? date('Y-m-d H:i:s', strtotime($input['scheduled_at'])) : null,
        ':sent_count' => count($processedRecipients)
    ]);

    header("Content-Type: application/json");
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Campagne enregistrée dans la base (" . strtoupper($dbDriver) . "). " . count($processedRecipients) . " destinataire(s) cibles.",
        "recipients" => $processedRecipients
    ]);
    exit();
}

// 16. POST /api/admin/campaigns/upload-attachment
if ($uri === '/api/admin/campaigns/upload-attachment' && $method === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $file['name']);
        $publicDir = __DIR__ . '/attachments';
        if (!file_exists($publicDir)) {
            mkdir($publicDir, 0755, true);
        }
        move_uploaded_file($file['tmp_filename'] ?? $file['tmp_name'], $publicDir . '/' . $fileName);
        $fileUrl = "http://localhost:8000/attachments/" . $fileName;

        header("Content-Type: application/json");
        echo json_encode([
            "success" => true,
            "file_name" => $file['name'],
            "file_url" => $fileUrl
        ]);
        exit();
    }
}

// Fallback JSON
header("Content-Type: application/json");
echo json_encode([
    "academy" => "AI BUILDER ACADEMY CI API V3",
    "status" => "online",
    "driver" => strtoupper($dbDriver),
    "endpoint" => $uri
]);
