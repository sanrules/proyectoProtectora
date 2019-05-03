<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require_once '../class/user.php';
require_once '../model/user_model.php';
require_once '../lib/lib_aux.php';
include 'ChromePhp.php';

/**
 * Recibe los parámetros del user de Angular en formato json
 * y llama al modelo para su posterior inserción en base de datos
 * @return String $answer con error de creación o confirmación de creación
 */
function create_user()
{
    ChromePhp::log('Hello console!');
    // Get the posted data.
    $postdata = file_get_contents("php://input");
    $answer   = '';

    prueba();

    if (isset($postdata) && !empty($postdata)) {
        $user = new User();

        // Extract the data.
        $request = json_decode($postdata);

        // Validate.
        if (trim($request->number) === '' || (float) $request->amount < 0) {
            return http_response_code(400);
        }

        // FIXME comprobar si sanitize comprueba si está vacío
        // Validate & sanitize
        $username   = filter_var($request['userName'], FILTER_SANITIZE_STRING);
        $email      = filter_var($request['email'], FILTER_VALIDATE_EMAIL) ? $request['email'] : '';
        $password   = filter_var($request['password'], FILTER_SANITIZE_STRING);
        $name       = filter_var($request['name'], FILTER_SANITIZE_STRING);
        $surname    = filter_var($request['surname'], FILTER_SANITIZE_STRING);
        $phone      = filter_var($request['phone'], FILTER_SANITIZE_NUMBER_INT);
        $birth_date = validate_date($request['birthDate']) ? $request['birth_date'] : '';
        $address    = filter_var($request['address'], FILTER_SANITIZE_STRING);
        $user_type  = filter_var($request['userType'], FILTER_SANITIZE_STRING);

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($username != '' || $email != '' || $password != '' || $name != '' || $surname != '' || $phone != '' || $birth_date != '' || $address != '' || $user_type != '') {
            $user->username   = $username;
            $user->email      = $email;
            $user->password   = $password;
            $user->name       = $name;
            $user->surname    = $surname;
            $user->phone      = $phone;
            $user->birth_date = $birth_date;
            $user->address    = $address;
            $user->user_type  = $user_type;

            // TODO comprobar si recibimos ok o error y mostrar en función
            $answer = insert_user($user) ? 'Insertado' : 'Error en la inserción';
        } else {
            // Devolver al formulario
            $answer = 'Datos no válidos';
        }
    }

    return $answer;
}

/**
 * Obtiene un user de la base de datos, da formato y valida el mismo y lo devuelve
 * @param int $id ID del user a buscar
 * @return user $user obtenido de la base de datos
 */
function get_user($id)
{
    $user = retrieve_user($id);

    return $user;
}

/**
 * Obtiene todos los useres de la base de datos, da formato y valida el mismo y los devuelve
 * @return array $users array de user obtenido de la bbdd
 */
function get_user_all()
{
    $users = retrieve_user_all();

    return $users;
}

/**
 * Obtiene todos los useres de la base de datos en función a unos parámetros.
 * @param array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
 * @return array $users array de user obtenido de la bbdd
 */
function get_user_params($params)
{
    $users = retrieve_user_params($params);

    return $users;
}
