<?php
require_once '../../vendor/autoload.php';
require_once 'classes/Comments.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception;

$logger = new Logger('commentsInsert');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);

    if ($request) {
        $animalId = filter_var($request['animal_id'], FILTER_SANITIZE_NUMBER_INT);
        $userId   = filter_var($request['user_id'], FILTER_SANITIZE_NUMBER_INT);
        $date     = filter_var($request['date'], FILTER_SANITIZE_NUMBER_INT)/1000;
        $text     = filter_var($request['text'], FILTER_SANITIZE_STRING);
        
        if ($animalId != '' || $userId != '' || $date != '' || $text != '') {

            $date = new DateTime("@$date");
            $date->format("Y-m-d H:i:s");

            $comment = new Comments();
            $comment->createComment($animalId, $userId, $date, $text);

            $comment->insertComment();

            if ($comment != '') {
                
                $commentGet = new Comments();
                $commentGet = R::findOne('comments', 'id=?', [$comment->getId()]);

                $reply = array(
                    'status'   => 'Created',
                    'response' => $commentGet,
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

            echo json_encode($reply, JSON_UNESCAPED_UNICODE);
        }
    }
} catch (Exception $error) {
    // echo 'Error al registrar el usuario: ' . $e->getMessage();
    $error = 'Error al enviar comentario';
    $logger->error($error);
}
