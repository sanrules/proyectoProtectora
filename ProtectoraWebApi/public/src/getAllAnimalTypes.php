<?php
require_once 'AnimalType.php';

$animaltype  = new AnimalType();
$animaltypes = $animaltype->retrieveAnimalTypesAll();

echo json_encode($animaltypes, JSON_UNESCAPED_UNICODE);
// echo json_encode($animals);
// header('Content-Type: application/json');
