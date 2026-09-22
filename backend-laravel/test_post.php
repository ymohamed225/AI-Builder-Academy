<?php
$data = [
    'first_name' => 'Yacouba',
    'last_name' => 'Mohamed',
    'email' => 'yacouba.test@aibuilder.ci',
    'phone' => '0700112233',
    'desired_training' => 'BOOTCAMP',
    'project_idea' => 'Plateforme SaaS IA avec MySQL'
];

$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents('http://localhost:8000/api/pre-registrations', false, $context);
echo "POST RESPONSE:\n" . $result . "\n";

// GET pre-registrations list
$list = file_get_contents('http://localhost:8000/api/pre-registrations');
echo "\nGET LIST RESPONSE:\n" . $list . "\n";
