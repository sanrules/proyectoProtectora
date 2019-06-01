<?php
require_once 'Animal.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('getAnimalById');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));
$error = array();

try {
    $postdata = file_get_contents("php://input");
    var_dump($postdata);

    $request = json_decode($postdata, true);
    var_dump($request);
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
    foreach ($error as $err) {
        $logger->info("Error: $err");
    }
}

header('Content-type:application/json;charset=utf-8');
echo json_encode($reply, JSON_UNESCAPED_UNICODE);

// echo json_encode($animals);
