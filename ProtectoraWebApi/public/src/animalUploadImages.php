<?php
require_once '../../vendor/autoload.php';
require_once 'classes/Animal.php';


use PHPMailer\PHPMailer\Exception;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('animalUploadImages');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    ChromePhp::log("request",$request);
    if ($request) {
        
        $id        = filter_var($request['id'], FILTER_SANITIZE_NUMBER_INT);
        $images    = $request['images'];

        if ($id != '' ) {

            $animal = new Animal();
            foreach ($images as $image) {
                $animal->updateImages($id, $image);
            }

            $reply = array(
                'status'   => 'OK',
                'response' => $images,
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
