<?php

require_once 'classes/Animal.php';
require_once '../../vendor/autoload.php';

use PHPMailer\PHPMailer\Exception;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    ChromePhp::log('request: ', $request);
    if ($request) {
        $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];
        /* $picturesArray = explode(",",$request['pictures']); */

        // Validate & sanitize
        $name          = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
        $type          = filter_var($request['type'], FILTER_SANITIZE_STRING); // Se aceptarán perro, gato, otros
        $breed         = filter_var($request['breed'], FILTER_SANITIZE_STRING); // Raza.
        $gender        = filter_var($request['gender'], FILTER_SANITIZE_STRING);
        $size        = filter_var($request['size'], FILTER_SANITIZE_STRING); // Se aceptarán M y H (macho / hembra)
        $birth_date    = filter_var($request['birthDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        $entrance_date = filter_var($request['entranceDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        $adoption_date = filter_var($request['adoptionDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Si no existe, será 1/1/1970
        $status        = in_array(filter_var($request['status'], FILTER_SANITIZE_STRING), $vStatus) ? $request['status'] : ''; // Adoptado, pre-adoptado, en adopción
        $description   = filter_var($request['description'], FILTER_SANITIZE_SPECIAL_CHARS);
        $pictures      = $request['pictures']; // String provisionalmente
        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '' || $type != '' || $breed != '' || $gender != '' || $size != '' || $birth_date != '' || $entrance_date != '' || $adoption_date != '' || $status != '' || $description != '') {

            $birth_date    = new DateTime("@$birth_date");
            $birth_date    = $birth_date->format("Y-m-d H:i:s");
            $entrance_date = new DateTime("@$entrance_date");
            $entrance_date = $entrance_date->format("Y-m-d H:i:s");

            $animal = new Animal();
            $animal->createAnimal($name, $type, $breed, $gender, $size, $birth_date, $entrance_date, $adoption_date, $status, $description, $pictures);

            $animal->insertAnimal();

            if ($animal != '') {
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
        }
    }
} catch (Exception $e) {
    $error = 'Error al registrar animal: ' . $e->getMessage();
    $logger->error("No se ha podido insertar el animal");
}


