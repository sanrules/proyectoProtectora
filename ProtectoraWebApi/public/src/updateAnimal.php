<?php
require_once 'Animal.php';
require_once 'lib/RedBean/rb.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('updateAnimal');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

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
        if ($name != '' || $type != '' || $breed != '' || $gender != '' || $birth_date != '' || $entrance_date != '' || $adoption_date != '' || $status != '' || $description != '' || $pictures != '') {

            $birth_date    = new DateTime("@$birth_date");
            $birth_date    = $birth_date->format("Y-m-d H:i:s");
            $entrance_date = new DateTime("@$entrance_date");
            $entrance_date = $entrance_date->format("Y-m-d H:i:s");

            $updated_animal = R::load('animal', $id);

            $animal->updateAnimal($id, $updated_animal);
        }
    }

    $animal  = new Animal();
    $animals = $animal->retrieveAnimalAll();

} catch (Exception $e) {
    $logger->error('Error al recoger todos los animales');
}

if ($animals != '') {
    $reply = array(
        'status'   => 'Getted',
        'response' => $animals,
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
