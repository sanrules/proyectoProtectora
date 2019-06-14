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
    $url      = "http://protectoramaskotak.com";
    $message  = <<<EMAIL
    <!DOCTYPE html>
    <html lang="es">
    <head>
    </head>
    <body>
        <div style='margin: 1em; width: 50em;'>
            <img style='float:right; width: 50px; height:50px' src='https://i.gifer.com/embedded/download/19wY.gif'>
            <h1 align='center'> Bienvenido a Maskotak - Protectora de animales </h1>
            <div class='head' align='center'
                style="border:1px solid black; margin-bottom: 0.2em; font-weight: bold; font-size: 20px;"> Hola $name </div>
            <div class='main' style="padding: 0.5em; text-align: justify;">
                Muchas gracias por registrarte en nuestra protectora y con ello, empezar a formar parte de esta gran familia
                de amantes de los animales.
                <br><br>
                Aquí tienes el nombre de usuario con el que te registraste: <b> $username </b>
                <h4> Enamórate un poquito de alguno de nosotros: $url </h4>
                <h3 align='center'> PROTECTORA WEB </h3>
                <img align=center style='width:600px; height:300px;'
                    src='https://lh3.googleusercontent.com/tmsjvhOFPqb2kyMFf3k7lrUvUvrHmkkBxiAGn8RQZ0m1d9hOUiVDK64m8X4J2uA6u7HtJMvXYr6Xg1YcJlkJjMvfwNpixmtVaFIQiUACCL12xI5CJoxu6G9IingpID-JPoPklDdbo_LkP10znOhmw1HCYzpVVcsjt6mFMSv3LoaqOWnSPgRMZjYVDYSeu3SmtHNw8OpBKKrsfoSOXxGGozqjkddk5B5r81b5UsxQfg2M8bSUdGEI5w7AaqE8-Onri9bbQmeOpXP6gShbf3QLfvcbFCyWu0t13B0kmgzU1yBL704ds2WcV5yeoIfk8dzLao4Jt2ZCHfU3cfBYAze53uuMpep_sn3Ou9BeJDz12jN_gp1PXvhTIQuDbSwPFm-UdV640wTT64JHodZqpmt5-P7IVl8ToeLen-1ovXzSQ_6gNA_1UTFwbI9P0w_uAijK8AOSNwHMtgqYnTf0eaY-Gk9JjHERbWMz8t5vSN9Kc_mLbZtceIwtNri53NlgiOGCWySFe_tsKxeexPjGEgWxU2HF7h3X7f6ibgUP_yuTd98cexbJ1FWOZ79ErXj52gL1G9ytjoNF9RpEUr6wjp3xxQRftLhmTChb1BrP4wrrNkw5rvFWsxI26efxiaB_BYHlH_6EDXKS2nnEKTWhG1chgGE2lds3UAMP=w442-h249-no'>
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
