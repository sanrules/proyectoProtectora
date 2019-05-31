<?php
//Chrome php: Muestra logs de php en la consola del navegador
// include 'ChromePhp.php';
include 'Animal.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('application/json, text/plain, */*');

$animal  = new Animal();
$animals = $animal->retrieveAnimalAll();

echo json_encode($animals, JSON_UNESCAPED_UNICODE);
// echo json_encode($animals);
header('Content-Type: application/json');
