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
    $request    = json_decode($data);
    $user       = R::dispense('user');
    $user->data = $request['email'];
    $id         = R::store($user);

}
