<?php
require_once '../../vendor/autoload.php';
require_once 'classes/News.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('newUpdate');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        // Validate & sanitize
        $id              = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $name            = filter_var($request['name'], FILTER_SANITIZE_STRING);
        $content         = filter_var($request['content'], FILTER_SANITIZE_STRING);
        $publicationDate = filter_var($request['publicationDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y

        if ($id != '' || $name != '' || $content != '' || $publicationDate != '') {
            $publicationDate = new DateTime("@$publicationDate");
            $publicationDate = $publicationDate->format("Y-m-d H:i:s");

            $newupdate = new News();
            $newupdate->createNews($name, $content, $publicationDate);
            $newupdate->set_id($id);
            $newupdate->updateNew();
        }
    }
} catch (Exception $e) {
    $logger->error('Error al recoger la noticia');
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $id,
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
