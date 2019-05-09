<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require_once '../class/animal.php';
require_once '../model/animal_model.php';
require_once '../lib/aux.php';

/**
 * Recibe los parámetros del animal de Angular en formato json
 * y llama al modelo para su posterior inserción en base de datos
 * @return String $answer con error de creación o confirmación de creación
 */
function create_animal()
{
    // Get the posted data.
    $postdata = file_get_contents("php://input");
    $answer   = '';

    if (isset($postdata) && !empty($postdata)) {
        $animal  = new Animal();
        $vStatus = ['adoptado', 'pre-adoptado', 'en adopción'];

        // Extract the data.
        $request = json_decode($postdata);

        // Validate.
        if (trim($request->number) === '' || (float) $request->amount < 0) {
            return http_response_code(400);
        }

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

    return $answer;
}

/**
 * Obtiene un animal de la base de datos, da formato y valida el mismo y lo devuelve
 * @param int $id ID del animal a buscar
 * @return Animal $animal obtenido de la base de datos
 */
function get_animal($id)
{
    $animal = retrieve_animal($id);

    return $animal;

}

/**
 * Obtiene todos los animales de la base de datos, da formato y valida el mismo y los devuelve
 * @return array $animals array de Animal obtenido de la bbdd
 */
function get_animal_all()
{
    $animals = retrieve_animal_all();

    return $animals;
}

/**
 * Obtiene todos los animales de la base de datos en función a unos parámetros.
 * @param array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
 * @return array $animals array de Animal obtenido de la bbdd
 */
function get_animal_params($params)
{
    $animals = retrieve_animal_params($params);

    return $animals;
}
