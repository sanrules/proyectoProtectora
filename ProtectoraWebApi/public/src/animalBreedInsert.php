<?php
/**
 * Inserta una raza de animal
 */

require_once 'classes/AnimalBreed.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalBreedInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        // Validate & sanitize
        $idtype = filter_var($request['idType'], FILTER_SANITIZE_NUMBER_INT);
        $name   = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '') {

            $animalBreed = new AnimalBreed();
            $animalBreed->createAnimalBreed($name, $idtype);
                try {
                    $animalBreed->animalBreedExist();
                    
                } catch (Exception $e) {
                    $error .= 'la raza que ha introducido ya existe en la bbdd. ';
                    $logger->error($error);
                    throw $e;
                }
            $animalBreed->createAnimalBreed($name, $idtype);

            $animalBreed->insertAnimalBreed();
        }
    }
} catch (Exception $e) {
    echo 'Error al registrar animalType: ' . $e->getMessage();
}

echo json_encode(array("status" => "ok", "data" => $animalBreed), JSON_FORCE_OBJECT);
