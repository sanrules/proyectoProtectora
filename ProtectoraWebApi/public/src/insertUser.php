<?php
require_once '../../vendor/autoload.php';
require_once 'User.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('insertUser');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

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
        $city = filter_var($request['city'], FILTER_SANITIZE_STRING);
        $postalCode = $request['postalCode'];
        $avatar = $request['avatar'];
        $dni = $request['dni'];

        // TODO VALIDACIÓN DE LOS ÚLTIMOS CAMPOS

        if ($username != '' || $password != '' || $email != '' || $name != '' || $surname != '' || $phone != '' || $birthDate != '' || $street != '' || $number != '' || $portal != '' || $floor != '' || $door != '' || $userType != '') {

            $birthDate = new DateTime("@$birthDate");
            $birthDate->format("Y-m-d H:i:s");
            $password = password_hash($password, PASSWORD_BCRYPT);

            $user = new User();
            $user->createUser($username, $password, $email, $name, $surname, $dni, $phone, $birthDate, $province, $city, $postalCode, $street, $number, $portal, $floor, $door, $userType, $avatar);

            // Validamos que el email no exista
            if (($user->getSpecificUser(array('key' => 'email', 'value' => $email)) == null) && ($user->getSpecificUser(array('key' => 'username', 'value' => $username)) == null)) {
                $user->insertUser();
                $error = '';
            } else {
                $error = 'El email o el usuario ya existen en la base de datos';
                $logger->error($error);
                // throw new Exception();
            }

            if ($error == '') {
                $reply = array(
                    'status'   => 'OK',
                    'response' => $user,
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
        }
    }
} catch (Exception $e) {
    // echo 'Error al registrar el usuario: ' . $e->getMessage();
    $error = 'Error al registrar el usuario';
    $logger->error($error);
}

// echo json_encode(array("status" => "ok", "data" => $user), JSON_FORCE_OBJECT);
