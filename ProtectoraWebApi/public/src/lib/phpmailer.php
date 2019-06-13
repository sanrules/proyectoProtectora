<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once '../../vendor/autoload.php';
require_once 'classes/User.php';

function sendMail($user)
{
    // Variables usuario
    $name     = $user->getName();
    $username = $user->getUsername();
    $receiver = $user->getEmail();
    $url      = "http://protectoraweb.com";
    $message  = <<<EMAIL
    <!DOCTYPE html>
    <html lang="es">
    <head>
    </head>
    <body>
        <div style='margin: 1em; width: 50em;'>
        <img style='float:right; width: 50px; height:50px' src='https://i.gifer.com/embedded/download/19wY.gif'>
            <h1 align='center'> Bienvenido a Protectora Web </h1>
            <div class='head' align='center' style="border:1px solid black; margin-bottom: 0.2em; font-weight: bold; font-size: 20px;"> Hola $name </div>
            <div class='main' style="padding: 0.5em; text-align: justify;">
                Muchas gracias por registrarte en nuestra protectora y con ello, empezar a formar parte de esta gran familia de amantes de los animales.
                <br><br>
                Aquí tienes el nombre de usuario con el que te registraste: <b> $username </b>
                <h4> Enamórate un poquito de alguno de nosotros: $url </h4>
                <h3 align='center'> PROTECTORA WEB </h3>
                <img align=center style='width:800px; height:300px;' src='https://cdn.designcrowd.com/blog/2015/October/catty-designs/GR_NationalCatDay_Banner_828x300.png'>
            </div>
        </div>
    </body>
EMAIL;
    // PHPMAILER
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->SMTPDebug  = 0;
    $mail->WordWrap   = 50;
    $mail->Host       = 'smtp.gmail.com';
    $mail->Port       = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'protectoraweb@gmail.com';
    $mail->Password   = '@ReyFernando';
    $mail->setFrom('protectoraweb@gmail.com', 'Protectora web');
    $mail->addReplyTo('protectoraweb@gmail.com', 'Protectora Web');
    $mail->addAddress($receiver, 'Receiver Name');
    $mail->Subject = 'Bienvenido a Protectora Web';
    $mail->msgHTML($message);
    // $mail->AltBody($alt);

    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }

}
