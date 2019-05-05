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

    $user->username   = $request->userName;
    $user->password   = $request->password;
    $user->name       = $request->name;
    $user->surname    = $request->surname;
    $user->email      = $request->email;
    $user->phone      = $request->phone;
    $user->birth_date = $request->birthDate;
    $user->street     = $request->street;
    $user->number     = $request->number;
    $user->floor     = $request->floor;
    $user->door     = $request->door;
    $user->user_type  = $request->userType;

    $id = R::store($user);
    ChromePhp::log('insert_user $user: ', $user);
    ChromePhp::log('insert_user $id: ', $id);
    ChromePhp::log('sale de insert_user');
}
