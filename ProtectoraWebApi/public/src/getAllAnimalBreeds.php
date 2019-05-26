<?php
require_once 'AnimalBreed.php';

$animalbreed  = new AnimalBreed();
$animalbreed = $animalbreed->retrieveAnimalBreedsAll();

echo json_encode($animaltypes, JSON_UNESCAPED_UNICODE);
// echo json_encode($animals);
// header('Content-Type: application/json');
