<?php
require_once '../../vendor/autoload.php';
require_once 'classes/Comments.php';


use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('commentsGetByAnimal');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = array();

try {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);
    ChromePhp::log('request: ', $request);

    if ($request) {
        $comment = new Comments();
        $comments = $comment->retrieveAnimalComments($request);
    } else {
        $error['request'] = 'No se han recibido datos';
        $logger->error($error);
    }
} catch (Exception $e) {
    $error['comment'] = 'No se han podido obtener los comentarios';
    $logger->error($error);
}

if (count($error) == 0) {
    $reply = array(
        'status'   => 'OK',
        'response' => $comments,
    );
    http_response_code(200); // 200 OK
} else {
    $reply = array(
        'status' => 'Error',
        'error'  => $error,
    );
    http_response_code(503); // 503 Service Unavailable
    foreach ($error as $err) {
        $logger->info("Error: $err");
    }
}
