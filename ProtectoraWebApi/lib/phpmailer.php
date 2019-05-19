<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../vendor/autoload.php';
require_once 'lib_aux.php';
require_once '../class/User.php';

sendMail();

function sendMail(User $user = null)
{
    // Params for mail

    //TODO PARA PRUEBAS borrar
    if ($user == null) {
        $user = new User();
    }
// Variables usuario
    $username = $user->get_username();
    $receiver = $user->get_email();

    $tokenNum = generateToken();

    $url = "protectoraweb.com/nuevoUsuario?=$tokenNum";

    $message = <<<EMAIL
    <!DOCTYPE html>
    <head></head>
    <body>
    <h1> Bienvenido a Protectora Web </h1>
    <h4> Gracias por crear una cuenta en Protectora Web </h4>
    <p> Su usuario es $username. Haz click en el siguiente enlace para validar su usuario y así acceder a su área personal <br>
    $url</p>
    <br>
    <br>
    <p> PROTECTORA WEB </p>
    </body>
    </html>
EMAIL;

// PHPMAILER

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug  = 2;
    $mail->Host       = 'smtp.gmail.com';
    $mail->Port       = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'protectoraweb@gmail.com';
    $mail->Password   = '#Ubuntu5';
    $mail->setFrom('protectoraweb@gmail.com', 'Protectora web');
    $mail->addReplyTo('protectoraweb@gmail.com', 'Protectora Web');
    $mail->addAddress('sankiry93@gmail.com', 'Receiver Name');
    $mail->Subject = 'PHPMailer SMTP message';
    $mail->msgHTML("$message");
    // $mail->AltBody = 'This is a plain text message body';
    // $mail->addAttachment('test.txt');

    $mail->send();

}
