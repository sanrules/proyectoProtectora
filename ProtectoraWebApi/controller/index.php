<?php
//header("Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');
include '../model/user_model.php';

// $postdata = file_get_contents("php://input");
// $request  = json_decode($postdata);

$data    = $_REQUEST['data'];
$decoded = json_decode($data);

print_r($decoded);

$fp = fopen("../lib/fichero.txt", "a+");
fputs($fp, "$data son los datos y $decoded->username es el usuario");
fclose($fp);

echo $request;
//prueba($request->userName);
