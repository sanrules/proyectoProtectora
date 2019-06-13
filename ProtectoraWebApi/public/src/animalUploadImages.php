<?php
require_once '../../vendor/autoload.php';
require_once 'classes/Animal.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('animalUploadImages');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    ChromePhp::log("request", $request);
    if ($request) {
        $id     = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $images = $request['images'];
    }
} catch (Exception $error) {
    $error = 'Error al subir imagenes';
    $logger->error($error);
}

if ($error == '') {
    $animal = new Animal();
    foreach ($images as $image) {
        $animal->updateImages($id, $image);
    }

    $reply = array(
        'status'   => 'OK',
        'response' => $images,
    );
    http_response_code(200); // 200 OK
}

header('Content-type:application/json;charset=utf-8');
echo json_encode($reply, JSON_UNESCAPED_UNICODE);
