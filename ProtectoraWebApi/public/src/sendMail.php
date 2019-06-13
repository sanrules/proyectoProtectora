<?php
require 'lib/mail/phpmailer.php';
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('sendMail');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = '';

try {
    sendMail($user);
} catch (Exception $e) {
    $error = 'Mail no enviado';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status' => 'Sended',
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

header('Content-type:application/json;charset=utf-8');
echo json_encode($reply, JSON_UNESCAPED_UNICODE);
