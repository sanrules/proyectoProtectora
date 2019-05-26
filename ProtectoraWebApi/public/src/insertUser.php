<?php

require_once 'User.php';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $username  = filter_var($request['userName'], FILTER_SANITIZE_STRING);
        $password  = filter_var($request['password'], FILTER_SANITIZE_STRING);
        $email     = filter_var($request['email'], FILTER_SANITIZE_STRING);
        $name      = filter_var($request['name'], FILTER_SANITIZE_STRING);
        $surname   = filter_var($request['surname'], FILTER_SANITIZE_STRING);
        $phone     = filter_var($request['phone'], FILTER_SANITIZE_NUMBER_INT);
        $birthDate = filter_var($request['birthDate'], FILTER_SANITIZE_NUMBER_INT) / 1000;
        $street    = filter_var($request['street'], FILTER_SANITIZE_STRING);
        $number    = filter_var($request['number'], FILTER_SANITIZE_NUMBER_INT);
        $portal    = filter_var($request['portal'], FILTER_SANITIZE_STRING);
        $floor     = filter_var($request['floor'], FILTER_SANITIZE_NUMBER_INT);
        $door      = filter_var($request['door'], FILTER_SANITIZE_STRING); // String provisionalmente
        $userType  = filter_var($request['userType'], FILTER_SANITIZE_STRING); // String provisionalmente

        if($username != '' || $password != '' || $email != '' || $name != '' || $surname != '' || $phone != '' || $birthDate != '' || $street != '' || $number != '' || $portal != '' || $floor!= '' || $door != '' || $userType != '') {

            $birthDate = new DateTime("@$birthDate");
            $birthDate->format("Y-m-d H:i:s");
            $password = password_hash($password, PASSWORD_BCRYPT);

            $user = new User();
            $user->createUser($username, $password, $email, $name, $surname, $phone, $birthDate, $street, $number, $portal, $floor, $door, $userType);
            $user->insertUser();

            echo json_encode(array("status" => "ok", "data" => $user), JSON_FORCE_OBJECT);

        }

    }

} catch(Exception $e) {
    echo 'Error al registrar el usuario: ' . $e->getMessage();
}

