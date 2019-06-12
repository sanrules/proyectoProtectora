<?php
require_once 'classes/AnimalBreed.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalBreedGetByidType');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {

        $animalbreed = new AnimalBreed();
        $animalbreed->set_idType($request);
        $animalbreeds = $animalbreed->retrieveAnimalBreedsByIdType($animalbreed->get_idType());

    }    
} catch (Exception $e) {
    $error = 'Error al recoger las razas de los animales';
    $logger->error($error);
}

if ($error != '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $animalbreeds,
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
