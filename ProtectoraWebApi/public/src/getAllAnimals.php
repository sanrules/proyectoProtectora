<?php
require_once 'Animal.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('getAllAnimals');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {

    $animal  = new Animal();
    $animals = $animal->retrieveAnimalAll();
    $error = '';
    
} catch (Exception $e) {
    $error = 'No se han podido obtener todos los animales';
    $logger->error($error);
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

echo json_encode($reply, JSON_UNESCAPED_UNICODE);
// header('Content-Type: application/json');
