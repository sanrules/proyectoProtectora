<?php
require_once 'Animal.php';

$animal  = new Animal();
$animals = $animal->retrieveAnimalAll();

echo json_encode($animals, JSON_UNESCAPED_UNICODE);
// echo json_encode($animals);
// header('Content-Type: application/json');
