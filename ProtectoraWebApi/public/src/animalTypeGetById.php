<?php
require_once 'classes/AnimalType.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalTypeGetById');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));


try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    
    if ($request) {
        $animalType = new AnimalType();
        $animalType->set_id($request);
        $animalTypeGet = $animalType->retrieveAnimalType();
        $error = '';
    }
} catch (Exception $e) {
    $error = 'Error al recoger las razas de los animales';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $animalTypeGet,
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
