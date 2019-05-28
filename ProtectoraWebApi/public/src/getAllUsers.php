<?php
require_once 'User.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('getAllUsers');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $user  = new User();
    $users = $user->retrieveUserAll();
} catch (Exception $e) {
    $error = 'No se han podido obtener todos los usuarios';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $users,
    );
    http_response_code(200); // 200 OK
} else {
    $reply = array(
        'status' => 'Error',
        'error'  => $error,
    );
    http_response_code(503); // 503 Service Unavailable
    $logger->info("Error: $error");
}

echo json_encode($reply, JSON_UNESCAPED_UNICODE);
// header('Content-Type: application/json');
