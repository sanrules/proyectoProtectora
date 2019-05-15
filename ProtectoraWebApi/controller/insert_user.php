<?php

//header("Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');

require_once '../lib/RedBeanPHP5_3/rb.php';
R::setup('mysql:host=localhost;dbname=proyecto',
    'root', '');

// $postdata = file_get_contents("php://input");
// $request  = json_decode($postdata);
if ($_REQUEST['createuser']) {
    $data = $_REQUEST['createuser'];
    // $dates      = explode(',', $data);
    $new  = json_decode($data);
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
}
