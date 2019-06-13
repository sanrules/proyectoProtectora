<?php
require_once 'classes/User.php';
require_once '../../vendor/autoload.php';
require_once 'lib/jwt_config.php';
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use \Firebase\JWT\JWT;

$postdata = file_get_contents("php://input");
$request  = json_decode($postdata, true);

$logger = new Logger('userLogin');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

if ($request) {
    $email    = filter_var($request['email'], FILTER_SANITIZE_STRING);
    $password = filter_var($request['password'], FILTER_SANITIZE_STRING);
    //$password  = password_hash($password, PASSWORD_BCRYPT);
    $user = new User();

    $user = $user = R::findOne('user', 'email=?', [$email]);

    if ($user && password_verify($password, $user->password)) {
        $token = array(
            "aud"  => $aud,
            "data" => array(
                "id"       => $user->id,
                "userName" => $user->username,
                "email"    => $user->email,
                "type"     => $user->userType,
            ),
        );

        // set response code
        http_response_code(200);

        // generate jwt
        $jwt = JWT::encode($token, $key);
        echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt"     => $jwt,
            )
        );
    } else {
        // set response code
        http_response_code(401);

        // tell the user login failed
        echo json_encode(array("message" => "Usuario o contraseña inválidos."));
    }
}
