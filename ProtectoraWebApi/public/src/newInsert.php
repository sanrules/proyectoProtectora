<?php

require_once 'classes/News.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('newsInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    ChromePhp::log('request: ', $request);
    if ($request) {
        // Validate & sanitize
        $name    = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
        $content = filter_var($request['content'], FILTER_SANITIZE_STRING);
        $date    = filter_var($request['publicationDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '' || $content != '' || $date != '') {
            $date = new DateTime("@$date");
            $date = $date->format("Y-m-d H:i:s");

            $new = new News();
            $new->createNews($name, $content, $date);

            $new->insertNew();
        }
    }
} catch (Exception $e) {
    $error = 'Error al registrar animal: ' . $e->getMessage();
    $logger->error("No se ha podido insertar el animal");
}
if ($error == '') {
    $reply = array(
        'status'   => 'Created',
        'response' => $new->get_id(),
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
