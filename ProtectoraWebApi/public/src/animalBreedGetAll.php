<?php
require_once 'classes/AnimalBreed.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalBreedGetAll');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = '';

try {
    $animalbreed = new AnimalBreed();
    $animalbreed = $animalbreed->retrieveAnimalBreedsAll();
} catch (Exception $e) {
    $error = 'Error al recoger las razas de los animales';
    $logger->error($error);
}

if ($animalbreed != '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $animalbreed,
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
