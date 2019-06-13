<?php
require_once '../../vendor/autoload.php';
require_once 'classes/Animal.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('animalUpdate');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];

        // Validate & sanitize
        $id            = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $name          = filter_var($request['name'], FILTER_SANITIZE_STRING);
        $type          = filter_var($request['type'], FILTER_SANITIZE_NUMBER_INT); 
        $breed         = filter_var($request['breed'], FILTER_SANITIZE_NUMBER_INT); 
        $gender        = filter_var($request['gender'], FILTER_SANITIZE_STRING); 


        $size          = filter_var($request['size'], FILTER_SANITIZE_STRING);
        $birth_date    = filter_var($request['birth_date'], FILTER_SANITIZE_NUMBER_INT) / 1000; 
        $entrance_date = filter_var($request['entrance_date'], FILTER_SANITIZE_NUMBER_INT) / 1000;
        $adoption_date = isset($request['adoption_date']) ? filter_var($request['adoption_date'], FILTER_SANITIZE_NUMBER_INT) / 1000 : null;
        $status        = filter_var($request['status'], FILTER_SANITIZE_NUMBER_INT); 
        $description   = filter_var($request['description'], FILTER_SANITIZE_SPECIAL_CHARS);

        if ($status != 0) {
            $userId = filter_var($request['user_id'], FILTER_SANITIZE_NUMBER_INT); 
        } else {
            $userId = null;
        }

        if ($name != '' || $type != '' || $breed != '' || $gender != '' || $birth_date != '' || $entrance_date != '' || $status != '' || $description != '') {
            if ($status == 0) {
                $adoption_date = null;
            }

            $birth_date    = new DateTime("@$birth_date");
            $birth_date    = $birth_date->format("Y-m-d H:i:s");
            $entrance_date = new DateTime("@$entrance_date");
            $entrance_date = $entrance_date->format("Y-m-d H:i:s");

            if ($adoption_date != null) {
                $adoption_date = new DateTime("@$adoption_date");
                $adoption_date = $adoption_date->format("Y-m-d H:i:s");
            }

            $animalupdate = new Animal();
            $animalupdate->createAnimal($name, $type, $breed, $gender, $size, $birth_date, $entrance_date, $adoption_date, $status, $description);
            $animalupdate->setId($id);

            if ($userId != null) {
                $animalupdate->setUserId($userId);
                $animalupdate->updateAnimal(true);
            } else {
                $animalupdate->updateAnimal(false);
            }
        }
    }
} catch (Exception $e) {
    $logger->error('Error al recoger todos los animales');
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $animalupdate->getId(),
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
