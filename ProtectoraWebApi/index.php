<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug  = 2;
$mail->Host       = 'smtp.gmail.com';
$mail->Port       = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth   = true;
$mail->Username   = 'ekiekitapan@gmail.com';
$mail->Password   = '#Ubuntu5';
// $mail->setFrom('ekiekitapan@gmail.com', 'Protectora');
// $mail->addReplyTo('ekiekitapan@gmail.com', 'Your Name');
$mail->addAddress('sankiry93@gmail.com', 'Receiver Name');
$mail->Subject = 'PHPMailer SMTP message';
$mail->msgHTML("MENSAJE DE CORREO");
// $mail->AltBody = 'This is a plain text message body';
// $mail->addAttachment('test.txt');
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}
