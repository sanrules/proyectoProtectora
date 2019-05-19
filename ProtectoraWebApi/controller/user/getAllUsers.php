<?php
require_once '../../class/user.php';

$user  = new User();
$users = $user->retrieveUserAll();

echo json_encode($users, JSON_UNESCAPED_UNICODE);
//header('Content-Type: application/json');
