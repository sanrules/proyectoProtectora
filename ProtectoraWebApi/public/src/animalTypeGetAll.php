<?php
/**
 * Obtiene todos los tipos de animales que hay en la bbdd
 */

require_once 'classes/AnimalType.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalTypeGetAll');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = '';

try {
    $animaltype  = new AnimalType();
    $animaltypes = $animaltype->retrieveAnimalTypesAll();
} catch (Exception $e) {
    $error = 'Error al recoger los tipos de animales';
    $logger->error($error);
}

if ($animaltypes != '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $animaltypes,
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

/* header('Content-type:application/json;charset=utf-8'); */
echo json_encode($reply, JSON_UNESCAPED_UNICODE);

// LO antiguo
// echo json_encode($animaltypes, JSON_UNESCAPED_UNICODE);
// echo json_encode($animals);
// header('Content-Type: application/json');
