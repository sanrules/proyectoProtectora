<?php
/**
 * Obtiene la lista de imágenes de un animal
 */
require_once 'classes/Images.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('imagesGetByAnimal');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    
    if ($request) {
        $image = new Images();
        $image->setId($request);
        $images = $image->retrieveAnimalImages($image->getId());
        $error     = '';
    }
} catch (Exception $e) {
    $error = 'No se pueden obtener las imágenes';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $images,
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

header('Content-type:application/json;charset=utf-8');
echo json_encode($reply, JSON_UNESCAPED_UNICODE);
