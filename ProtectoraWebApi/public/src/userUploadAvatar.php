<?php
require_once '../../vendor/autoload.php';
require_once 'classes/User.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('userUploadAvatar');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

$error = '';

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $id     = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $avatar = filter_var($request['avatar'], FILTER_SANITIZE_STRING);

        if ($id != '' || $avatar != '') {
            $user = new User();
            $user->updateAvatar($id, $avatar);
        } else {
            throw new Exception();
        }
    }
} catch (Exception $error) {
    $error = 'Error al registrar el usuario';
    $logger->error($error);
}

if ($error == '') {
    $reply = array(
        'status'   => 'OK',
        'response' => $avatar,
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
