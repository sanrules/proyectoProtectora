<?php

require_once 'classes/News.php';
require_once '../../vendor/autoload.php';

use PHPMailer\PHPMailer\Exception;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('insertNews');
$logger->pushHandler(new StreamHandler('lib/app.log', Logger::DEBUG));

try {
    $postdata = file_get_contents("php://input");
    $request  = json_decode($postdata, true);
    ChromePhp::log('request: ', $request);
    if ($request) {
        
        /* $picturesArray = explode(",",$request['pictures']); */

        // Validate & sanitize
        $name          = filter_var($request['name'], FILTER_SANITIZE_STRING); // Cualquier nombre sin caracteres especiales
        $content         = filter_var($request['content'], FILTER_SANITIZE_STRING);
        $date           = filter_var($request['publicationDate'], FILTER_SANITIZE_NUMBER_INT) / 1000; // Formato j/m/Y
        /*    $pictures      = filter_var($request['pictures'], FILTER_REQUIRE_ARRAY) ? $request['pictures'] : ''; // Las imágenes tendrán que venir en un array */

        // Comprobamos que todo viene con datos. Si no, se devolverá al formulario
        if ($name != '' || $content != '' || $date != '' ) {

            $date    = new DateTime("@$date");
            $date    = $date->format("Y-m-d H:i:s");
            

            $news = new News();
            $news->createNews($name, $content, $date);

            $news->insertNews();

            if ($news != '') {
                $reply = array(
                    'status'   => 'Created',
                    'response' => $news->get_id(),
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
    $error = 'Error al registrar animal: ' . $e->getMessage();
    $logger->error("No se ha podido insertar el animal");
}
