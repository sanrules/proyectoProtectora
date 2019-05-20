<?php
require_once 'Animal.php';

$postdata = file_get_contents("php://input");
$request  = json_decode($postdata, true);

if ($request) {

  $animal  = new Animal();
  $animalGet = $animal->retrieveAnimal($request);
  echo json_encode($animalGet, JSON_UNESCAPED_UNICODE);

}
// echo json_encode($animals);