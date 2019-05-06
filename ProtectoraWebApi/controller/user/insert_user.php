<?php

require_once '../../lib/connection.php';
// header("Access-Control-Allow-Origin");
// header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// header('Content-type: application/json');

ChromePhp::log('Entra en insert_user');

$incomingContentType = $_SERVER['CONTENT_TYPE'];

if($incomingContentType != 'application/json') {
    header($_SERVER['SERVER_PROTOCOL']. '500 Internal Server Error');
    exit();
}

$postdata = file_get_contents("php://input");
$request  = json_decode($postdata,true);
ChromePhp::log('insert_user $postdata: ', $postdata);
ChromePhp::log('insert_user $request: ', $request);

if ($request) {
    // Validamos los datos y los filtramos
    $username   = filter_var($request['userName'], FILTER_SANITIZE_STRING);
    $email      = filter_var($request['email'], FILTER_VALIDATE_EMAIL) ? $request['email'] : '';
    $password   = filter_var($request['password'], FILTER_SANITIZE_STRING);
    $name       = filter_var($request['name'], FILTER_SANITIZE_STRING);
    $surname    = filter_var($request['surname'], FILTER_SANITIZE_STRING);
    $phone      = filter_var($request['phone'], FILTER_SANITIZE_NUMBER_INT);
    $birth_date = validate_date($request['birthDate']) ? $request['birth_date'] : '';
    //$birth_date = filter_var($request['birthDate']) ? $request['birthDate'] : '';
    $street     = filter_var($request['street'], FILTER_SANITIZE_STRING);
    $number     = filter_var($request['number'], FILTER_SANITIZE_NUMBER_INT);
    $portal     = filter_var($request['street'], FILTER_SANITIZE_STRING);
    $floor      = filter_var($request['floor'], FILTER_SANITIZE_NUMBER_INT);
    $door       = filter_var($request['door'], FILTER_SANITIZE_STRING);
    $user_type  = filter_var($request['userType'], FILTER_SANITIZE_STRING);

    // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
    if ($username != '' || $email != '' || $password != '' || $name != '' || $surname != '' || $phone != '' || $birth_date != '' || $street != '' || $user_type != '') {

        $user = R::dispense('user');

        $user->username   = $username;
        $user->email      = $email;
        $user->password   = $password;
        $user->name       = $name;
        $user->surname    = $surname;
        $user->phone      = $phone;
        $user->birth_date = $birth_date;
        $user->street     = $street;
        $user->number     = $number;
        $user->portal     = $portal;
        $user->floor      = $floor;
        $user->door       = $door;
        $user->user_type  = $user_type;

        $id = R::store($user);
        ChromePhp::log('insert_user $user: ', $user);
        ChromePhp::log('sale de insert_user');
        return json_encode(array("data" => $user));
    }

}
