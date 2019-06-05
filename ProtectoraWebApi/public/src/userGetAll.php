<?php
require_once 'classes/User.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('userGetAll');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $user  = new User();
    $users = $user->retrieveUserAll();
    $error = '';
} catch (Exception $e) {
    $error = 'No se han podido obtener todos los usuarios';
    $logger->error($error);
}

if ($users != '') {
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
