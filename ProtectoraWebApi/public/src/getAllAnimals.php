<?php
require_once 'Animal.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('getAllAnimals');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = array();

try {
    $animal  = new Animal();
    $animals = $animal->retrieveAnimalAll();

} catch (Exception $e) {
    $logger->error('Error al recoger todos los animales');
}

if ($animals != '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $animals,
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

// header('Content-type:application/json;charset=utf-8');
echo json_encode($reply, JSON_UNESCAPED_UNICODE);

// Lo antiguo
// echo json_encode($animals, JSON_UNESCAPED_UNICODE);
// // echo json_encode($animals);
// // header('Content-Type: application/json');
