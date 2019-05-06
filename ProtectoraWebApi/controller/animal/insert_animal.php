<?php
require_once '../../lib/connection.php';
// header("Access-Control-Allow-Origin");
// header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// header('Content-type: application/json');

ChromePhp::log('Entra en insert_animal');

$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
ChromePhp::log('insert_animal $postdata: ', $postdata);
ChromePhp::log('insert_animal $request: ', $request);

if ($request) {
    $animal  = new Animal();
    $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];

// FIXME comprobar si sanitize comprueba si está vacío
    // Validate & sanitize
    $name          = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
    $type          = filter_var($request['type'], FILTER_SANITIZE_STRING); // Se aceptarán perro, gato, otros
    $breed         = filter_var($request['breed'], FILTER_SANITIZE_STRING); // Raza.
    $gender        = filter_var($request['gender'], FILTER_SANITIZE_STRING); // Se aceptarán M y H (macho / hembra)
    $birth_date    = validate_date($request['birth_date']) ? $request['birth_date'] : ''; // Formato j/m/Y
    $entrance_date = validate_date($request['entrance_date']) ? $request['entrance_date'] : ''; // Formato j/m/Y
    $adoption_date = validate_date($request['adoption_date']) ? $request['adoption_date'] : ''; // Si no existe, será 1/1/1970
    $status        = in_array(filter_var($request['status'], FILTER_SANITIZE_STRING), $vStatus) ? $request['status'] : ''; // Adoptado, pre-adoptado, en adopción
    $description   = filter_var($request['description'], FILTER_SANITIZE_SPECIAL_CHARS);
    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array

// Comprobamos que todo viene con datos. Si no, se devolverá al formulario
    if ($name != '' || $type != '' || $breed != '' || $gender != '' || $birth_date != '' || $entrance_date != '' || $adoption_date != '' || $status != '' || $description != '' || $pictures != '') {
        $animal->name          = $name;
        $animal->type          = $type;
        $animal->breed         = $breed;
        $animal->gender        = $gender;
        $animal->birth_date    = $birth_date;
        $animal->entrance_date = $entrance_date;
        $animal->adoption_date = $adoption_date;
        $animal->status        = $status;
        $animal->description   = $description;
        $animal->pictures      = $pictures;

        // TODO comprobar si recibimos ok o error y mostrar en función
        $answer = insert_animal($animal) ? 'Insertado' : 'Error en la inserción';
    } else {
        // Devolver al formulario
        $answer = 'Datos no válidos';
    }
}
