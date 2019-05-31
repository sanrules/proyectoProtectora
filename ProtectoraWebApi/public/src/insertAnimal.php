<?php
header("Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');
try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {

        $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];
        /* $picturesArray = explode(",",$request['pictures']); */

        // Validate & sanitize
        $name          = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
        $type          = filter_var($request['type'], FILTER_SANITIZE_STRING); // Se aceptarán perro, gato, otros
        $breed         = filter_var($request['breed'], FILTER_SANITIZE_STRING); // Raza.
        $gender        = filter_var($request['gender'], FILTER_SANITIZE_STRING); // Se aceptarán M y H (macho / hembra)
        $birth_date    = filter_var($request['birthDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        $entrance_date = filter_var($request['entranceDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        $adoption_date = filter_var($request['adoptionDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Si no existe, será 1/1/1970
        $status        = in_array(filter_var($request['status'], FILTER_SANITIZE_STRING), $vStatus) ? $request['status'] : ''; // Adoptado, pre-adoptado, en adopción
        $description   = filter_var($request['description'], FILTER_SANITIZE_SPECIAL_CHARS);
        $pictures      = filter_var($request['pictures'], FILTER_SANITIZE_STRING); // String provisionalmente
        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */

// Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '' || $type != '' || $breed != '' || $gender != '' || $birth_date != '' || $entrance_date != '' || $adoption_date != '' || $status != '' || $description != '' || $pictures != '') {

            $birth_date = new DateTime("@$birth_date");
            $birth_date->format("Y-m-d H:i:s");
            $entrance_date = new DateTime("@$entrance_date");
            $entrance_date->format("Y-m-d H:i:s");
            /* $adoption_date = new DateTime($request['adoptionDate']); */

            $animal = new Animal();
            $animal->createAnimal($name, $type, $breed, $gender, $birth_date, $entrance_date, $adoption_date, $status, $description, $pictures);

            $animal->insertAnimal();

            echo json_encode(array("status" => "ok", "data" => $animal), JSON_FORCE_OBJECT);

        }
    }

} catch (Exception $e) {
    echo 'Error al registrar animal: ' . $e->getMessage();
}
