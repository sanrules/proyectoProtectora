<?php
require_once '../../vendor/autoload.php';
require_once 'classes/User.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('userUpdate');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $id         = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $username   = filter_var($request['username'], FILTER_SANITIZE_STRING);
        $password   = isset($request['password']) ? filter_var($request['password'], FILTER_SANITIZE_STRING) : '';
        $email      = filter_var($request['email'], FILTER_SANITIZE_STRING);
        $name       = filter_var($request['name'], FILTER_SANITIZE_STRING);
        $surname    = filter_var($request['surname'], FILTER_SANITIZE_STRING);
        $dni        = filter_var($request['dni'], FILTER_SANITIZE_STRING);
        $phone      = filter_var($request['phone'], FILTER_SANITIZE_NUMBER_INT);
        $birthDate  = filter_var($request['birth_date'], FILTER_SANITIZE_NUMBER_INT) / 1000;
        $street     = filter_var($request['street'], FILTER_SANITIZE_STRING);
        $number     = filter_var($request['number'], FILTER_SANITIZE_NUMBER_INT);
        $portal     = filter_var($request['portal'], FILTER_SANITIZE_STRING);
        $floor      = filter_var($request['floor'], FILTER_SANITIZE_NUMBER_INT);
        $door       = filter_var($request['door'], FILTER_SANITIZE_STRING);
        $province   = filter_var($request['province'], FILTER_SANITIZE_STRING);
        $city       = filter_var($request['city'], FILTER_SANITIZE_STRING);
        $postalCode = filter_var($request['postal_code'], FILTER_SANITIZE_NUMBER_INT);
        $userType   = filter_var($request['user_type'], FILTER_SANITIZE_STRING);
        $avatar     = filter_var($request['avatar'], FILTER_SANITIZE_STRING);

        if ($id != '' || $username != '' || $email != '' || $name != '' || $surname != '' || $dni != '' || $phone != '' || $birthDate != '' || $street != '' || $number != '' || $portal != '' || $floor != '' || $door != '' || $province != '' || $city != '' || $postalCode != '' || $userType != '') {
            $birthDate = new DateTime("@$birthDate");
            $birthDate->format("Y-m-d H:i:s");

            $updatedUser = new User();
            $updatedUser->createUser($username, $password, $email, $name, $surname, $dni, $phone, $birthDate, $province, $city, $postalCode, $street, $number, $portal, $floor, $door, $userType, $avatar);
            $updatedUser->setIdUser($id);

            $user_exists = R::findOne('user', 'id=?', [$updatedUser->getIdUser()]);

            if ($user_exists != null) {
                $user_error = R::findOne('user', 'email=? and id<>?', [$email, $id]);
                if ($user_error == null) {
                    if ($password != '') {
                        $updatedUser->setPassword(password_hash($password, PASSWORD_BCRYPT));
                    } else {
                        $updatedUser->setPassword($user_exists->password);
                    }
                    $updatedUser->updateUser();
                    $error = '';
                } else {
                    $error = 'El usuario que intentas modificar no coincide con el de la BBDD';
                    $logger->error($error);
                }
            } else {
                $error = 'El usuario no existe en la base de datos';
                $logger->error($error);
                throw new Exception();
            }
        }
    }
} catch (Exception $e) {
    // echo 'Error al registrar el usuario: ' . $e->getMessage();
    $error = 'Error al registrar el usuario';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $updatedUser->getIdUser(),
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

// header('Content-type:application/json;charset=utf-8');
echo json_encode($reply, JSON_UNESCAPED_UNICODE);

// echo json_encode(array("status" => "ok", "data" => $user), JSON_FORCE_OBJECT);
