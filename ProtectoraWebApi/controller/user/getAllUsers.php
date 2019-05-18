<?php
include __DIR__ . '/lib/RedBean/rb.php';
require_once __DIR__ . '/lib/connection.php';
require_once __DIR__ . '/class/User.php';

$users = retrieveUserAll();

echo json_encode($users, JSON_UNESCAPED_UNICODE);
header('Content-Type: application/json');
