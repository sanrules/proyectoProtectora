<?php
require_once '../../vendor/autoload.php';
require_once 'classes/AnimalType.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('animalTypeUpdate');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];

        // Validate & sanitize
        $id   = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $name = filter_var($request['name'], FILTER_SANITIZE_STRING);        


        if ($id != '' || $name != '') {

            
            $animalTypeUpdate = new AnimalType();
            $animalTypeUpdate->createAnimalType($name);
            $animalTypeUpdate->set_id($id);

            $animalTypeUpdate->updateAnimalType();
            
        }
    }
} catch (Exception $e) {
    $logger->error('Error al recoger todos los animales');
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $animalTypeUpdate->get_id(),
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