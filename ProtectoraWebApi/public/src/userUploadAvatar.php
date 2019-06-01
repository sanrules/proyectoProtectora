<?php
require_once '../../vendor/autoload.php';
require_once 'User.php';

use PHPMailer\PHPMailer\Exception;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('updatetUser');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $id        = filter_var($request['idUser'], FILTER_SANITIZE_NUMBER_INT);
        $avatar    = filter_var($request['avatar'], FILTER_SANITIZE_STRING);
        

        if ($id != '' || $avatar != '') {

           $user = R::findOne('user', 'id=?', [$id]);

            $user->uploadUserAvatar($id, $avatar);
            
            $reply = array(
                'status'   => 'OK',
                'response' => $updated_user,
            );
            http_response_code(200); // 200 OK

            header('Content-type:application/json;charset=utf-8');
            echo json_encode($reply, JSON_UNESCAPED_UNICODE);
        }
    }
} catch (Exception $error) {
    $error = 'Error al registrar el usuario';
    $logger->error($error);
}



// echo json_encode(array("status" => "ok", "data" => $user), JSON_FORCE_OBJECT);
