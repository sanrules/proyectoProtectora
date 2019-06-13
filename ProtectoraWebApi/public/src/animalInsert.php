<?php
require_once 'classes/Animal.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error  = '';
$animal = new Animal();

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    ChromePhp::log('request: ', $request);
    if ($request) {
        $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];

        // Validate & sanitize

        $name          = filter_var($request['name'], FILTER_SANITIZE_STRING); 
        $type          = filter_var($request['type'], FILTER_SANITIZE_NUMBER_INT); 
        $breed         = filter_var($request['breed'], FILTER_SANITIZE_NUMBER_INT); 
        $gender        = filter_var($request['gender'], FILTER_SANITIZE_STRING);
        $size          = filter_var($request['size'], FILTER_SANITIZE_STRING);
        $birth_date    = filter_var($request['birth_date'], FILTER_SANITIZE_NUMBER_INT) / 1000; 
        $entrance_date = filter_var($request['entrance_date'], FILTER_SANITIZE_NUMBER_INT) / 1000; 
        $adoption_date = filter_var($request['adoption_date'], FILTER_SANITIZE_NUMBER_INT) / 1000; 
        $status        = filter_var($request['status'], FILTER_SANITIZE_NUMBER_INT); 
        $description   = filter_var($request['description'], FILTER_SANITIZE_SPECIAL_CHARS);

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '' || $type != '' || $breed != '' || $gender != '' || $size != '' || $birth_date != '' || $entrance_date != '' || $adoption_date != '' || $status != '' || $description != '') {
            $adoption_date = null;
            $birth_date    = new DateTime("@$birth_date");
            $birth_date    = $birth_date->format("Y-m-d H:i:s");
            $entrance_date = new DateTime("@$entrance_date");
            $entrance_date = $entrance_date->format("Y-m-d H:i:s");

            $animal = new Animal();
            $animal->createAnimal($name, $type, $breed, $gender, $size, $birth_date, $entrance_date, $adoption_date, $status, $description);

            $animal->insertAnimal();
        }
    }
} catch (Exception $e) {
    $error += 'Error al registrar animal ';
    $logger->error("No se ha podido insertar el animal");
}

if ($error == '') {
    $reply = array(
        'status'   => 'Created',
        'response' => $animal->getId(),
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
