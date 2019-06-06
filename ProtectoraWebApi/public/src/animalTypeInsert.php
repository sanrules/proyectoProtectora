<?php
/**
 * Inserta un tipo de animal
 */
require_once 'classes/AnimalType.php';
require_once '../../vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('animalTypeInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {

        /* $picturesArray = explode(",",$request['pictures']); */

        // Validate & sanitize
        $name = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales

        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '') {

            $animalType = new AnimalType();
            $animalType->createAnimalType($name);

            $animalType->insertAnimalType();

            echo json_encode(array("status" => "ok", "data" => $animalType), JSON_FORCE_OBJECT);
        }
    }
} catch (Exception $e) {
    echo 'Error al registrar animalType: ' . $e->getMessage();
}