<?php
require_once 'classes/News.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('newsGetAll');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {

    $new  = new News();
    $news = $new->retrieveAllNews();
    $error = '';
} catch (Exception $e) {
    $error = 'No se han podido obtener todos los animales';
    $logger->error($error);
}

if ($news != '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $news,
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
