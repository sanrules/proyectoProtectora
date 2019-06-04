<?php
require_once '../../vendor/autoload.php';
require_once 'classes/Animal.php';


use PHPMailer\PHPMailer\Exception;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('updateAnimal');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $id        = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $Images    = filter_var($request['avatar']);


        if ($id != '' ) {

            $animal = new Animal();
            $animal->updateImages($id, $Images);


            $reply = array(
                'status'   => 'OK',
                'response' => $avatar,
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
