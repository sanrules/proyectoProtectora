<?php

require_once 'AnimalBreed.php';
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('insertUser');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {

        /* $picturesArray = explode(",",$request['pictures']); */

        // Validate & sanitize
        $idtype = filter_var($request['idtipo'], FILTER_SANITIZE_NUMBER_INT);
        $name   = filter_var($request['nombre'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales

        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */

// Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '') {

            $animalBreed = new AnimalBreed();
            $animalBreed->createAnimalBreed($name, $idtype);

            $animalBreed->insertAnimalBreed();

            echo json_encode(array("status" => "ok", "data" => $animalBreed), JSON_FORCE_OBJECT);

        }
    }

} catch (Exception $e) {
    echo 'Error al registrar animalType: ' . $e->getMessage();
}
