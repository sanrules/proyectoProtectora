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
        $name          = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
        $type          = filter_var($request['type'], FILTER_SANITIZE_STRING); // Se aceptarán perro, gato, otros
        $breed         = filter_var($request['breed'], FILTER_SANITIZE_STRING); // Raza.
        $gender        = filter_var($request['gender'], FILTER_SANITIZE_STRING); // Se aceptarán M y H (macho / hembra)
        $size          = filter_var($request['size'], FILTER_SANITIZE_STRING);
        $birth_date    = filter_var($request['birth_date'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        $entrance_date = filter_var($request['entrance_date'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        $adoption_date = filter_var($request['adoption_date'], FILTER_SANITIZE_NUMBER_INT) / 1000;  
        $status        = filter_var($request['status'], FILTER_SANITIZE_NUMBER_INT); // Adoptado, pre-adoptado, en adopción
        $description   = filter_var($request['description'], FILTER_SANITIZE_SPECIAL_CHARS);
        
        if($status != 0) {  
            $userId    = filter_var($request['user_id'], FILTER_SANITIZE_NUMBER_INT); // Adoptado, pre-adoptado, en adopción
        } else {
            $userId = null; 
        }
        $pictures      = $request['pictures'];
        // String provisionalmente
        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */
        if ($name != '' || $type != '' || $breed != '' || $gender != '' || $birth_date != '' || $entrance_date != '' || $adoption_date != '' || $status != '' || $description != '' ) {

            if ($status == 0) {
                $adoption_date = null;
            }
            $birth_date    = new DateTime("@$birth_date");
            $birth_date    = $birth_date->format("Y-m-d H:i:s");
            $entrance_date = new DateTime("@$entrance_date");
            $entrance_date = $entrance_date->format("Y-m-d H:i:s");

            $animalupdate = new Animal();
            $animalupdate->createAnimal($name, $type, $breed, $gender, $size, $birth_date, $entrance_date, $adoption_date, $status, $description, $pictures);
            $animalupdate->setId($id);
            if($userId != null){
                $animalupdate->setUserId($userId); 
                $animalupdate->updateAnimal(true);

            }else{
                
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
        'response' => $id,
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
