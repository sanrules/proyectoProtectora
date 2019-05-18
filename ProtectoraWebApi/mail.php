<?php
require_once 'class/User.php';
require_once 'class/Token.php';

sendMail();

function sendMail(User $user = null)
{
    //TODO PARA PRUEBAS borrar
    if ($user == null) {
        $user = new User();
    }
    // Variables usuario
    $username = $user->get_username();
    $receiver = $user->get_email();

    // Token único
    // $token    = new Token();
    // $tokenNum = $token->get_token();
    // $user->set_token($token);

    $tokenNum = generateToken();

    $url = "protectoraweb.com/nuevoUsuario?=$tokenNum";

    // Mail
    $to      = 'sankiry93@gmail.com';
    $subject = "Protectora Web - Bienvenido";

    $headers = "From: ekiekitapan@gmail.com\r\n";
    $headers .= 'Content-Type: text/plain; charset=utf-8';

    $message = <<<EMAIL
    <h1> Bienvenido a Protectora Web </h1>
    <h4> Gracias por crear una cuenta en Protectora Web </h4>
    <p> Su usuario es $username. Haz click en el siguiente enlace para validar su usuario y así acceder a su área personal <br>
    $url</p>
    <br>
    <br>
    <p> PROTECTORA WEB </p>
EMAIL;

    // mail($to, $subject, $message, $headers);

    echo $message;
}

function generateToken()
{
    $result = uniqid();
    return $result;
}
