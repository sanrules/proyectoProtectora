<?php
/**
 * Inserta un tipo de animal
 */
require_once 'classes/AnimalType.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$error = '';

$logger = new Logger('animalTypeInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        // Validate & sanitize
        $name = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '') {
            $animalType = new AnimalType();
            $animalType->createAnimalType($name);
            try {
                $animalType->animalTypeExist();
                
            } catch (Exception $e) {
                $error .= 'el tipo que ha introducido ya existe en la bbdd. ';
                $logger->error($error);
                throw $e;
            }

            
            $animalType->insertAnimalType();
        }
    }
} catch (Exception $e) {
    echo 'Error al registrar animalType: ' . $e->getMessage();
}

echo json_encode(array("status" => "ok", "data" => $animalType), JSON_FORCE_OBJECT);
