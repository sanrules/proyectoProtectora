<?php

require_once '../../lib/connection.php';

ChromePhp::log('Entra en insert_user');

$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
ChromePhp::log('insert_user $postdata: ', $postdata);
ChromePhp::log('insert_user $request: ', $request);

if ($request) {
    //$data = $_REQUEST['createuser'];
    //$dates      = explode(',', $data);
    //$new  = json_decode($data);
    $user = R::dispense('user');

    $user->username   = $new->username;
    $user->password   = $new->password;
    $user->name       = $new->name;
    $user->surname    = $new->surname;
    $user->address    = $new->address;
    $user->email      = $new->email;
    $user->phone      = $new->phone;
    $user->birth_date = $new->birth_date;
    $user->user_type  = $new->user_type;

    $id = R::store($user);
    ChromePhp::log('insert_user $user: ', $user);
    ChromePhp::log('insert_user $id: ', $id);
    ChromePhp::log('sale de insert_user');
}
