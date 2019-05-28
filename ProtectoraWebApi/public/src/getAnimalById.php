<?php
require_once 'Animal.php';
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('getAnimalById');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $animal    = new Animal();
        $animalGet = $animal->retrieveAnimal($request);
        // echo json_encode($animalGet, JSON_UNESCAPED_UNICODE);
    }
} catch (Exception $e) {
    $error = 'No se puede obtener el animal';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $animal,
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

// echo json_encode($animals);
