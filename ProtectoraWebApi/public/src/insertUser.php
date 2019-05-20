<?php
require_once '../../class/User.php';

$error    = array();
$response = '';

if ($_REQUEST['createuser']) {
    $jsonData = $_REQUEST['createuser'];
    $userData = json_decode($data);

    // Sanitize & validate
    isset($userData->username) ? $username   = $userData->username : $error['username']   = 'not set';
    isset($userData->email) ? $email         = $userData->email : $error['email']         = 'not set';
    isset($userData->name) ? $name           = $userData->name : $error['name']           = 'not set';
    isset($userData->surname) ? $surname     = $userData->surname : $error['surname']     = 'not set';
    isset($userData->phone) ? $phone         = $userData->phone : $error['phone']         = 'not set';
    isset($userData->birthDate) ? $birthDate = $userData->birthDate : $error['birthDate'] = 'not set';
    isset($userData->street) ? $street       = $userData->street : $error['street']       = 'not set';
    isset($userData->number) ? $number       = $userData->number : $error['number']       = 'not set';
    isset($userData->portal) ? $portal       = $userData->portal : $error['portal']       = 'not set';
    isset($userData->door) ? $door           = $userData->door : $error['door']           = 'not set';
    isset($userData->userType) ? $userType   = $userData->userType : $error['userType']   = 'not set';

    // Si no hay errores se crea el usuario
    if (count($error) == 0) {
        $user = new User();
        $user->createUser($username, $email, $name, $surname, $phone, $birthDate, $street, $number, $portal, $door, $userType);

        $user->insertUser();

        $response = 'usuario insertado correctamente';
    } else {
        $response = $error;
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    header('Content-Type: application/json');

}
