<?php

require_once '../../lib/connection.php';
require_once '../../class/User.php';

$users = retrieveUserAll();

echo json_encode($users, JSON_UNESCAPED_UNICODE);
header('Content-Type: application/json');
