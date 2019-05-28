<?php

include 'lib/phpmailer.php';
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('sendMailTeacherData');
$logger->pushHandler(new StreamHandler($CFG->logFile, Logger::DEBUG));
$error = '';

try {
    sendMail();
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
