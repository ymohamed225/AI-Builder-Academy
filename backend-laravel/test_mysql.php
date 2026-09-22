<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3306', 'root', '');
    echo "MYSQL_SUCCESS: Connected to MySQL server successfully!\n";
    
    // Create database if not exists
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `ai_builder_academy` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    echo "MYSQL_DB_OK: Database `ai_builder_academy` exists or was created successfully!\n";

    // Show databases
    $stmt = $pdo->query("SHOW DATABASES;");
    $dbs = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "DATABASES: " . implode(", ", $dbs) . "\n";
} catch (PDOException $e) {
    echo "MYSQL_ERROR: " . $e->getMessage() . "\n";
}
