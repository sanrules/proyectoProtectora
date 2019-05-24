<?php

require_once 'AnimalType.php';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {

        /* $picturesArray = explode(",",$request['pictures']); */

        // Validate & sanitize
        $name = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
       
        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */

// Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '' ) {

    

            $animalType = new AnimalType();
            $animalType->createAnimalType($name);

            $animalType->insertAnimalType();

            echo json_encode(array("status" => "ok", "data" => $animalType), JSON_FORCE_OBJECT);

        }
    }

} catch (Exception $e) {
    echo 'Error al registrar animalType: ' . $e->getMessage();
}
