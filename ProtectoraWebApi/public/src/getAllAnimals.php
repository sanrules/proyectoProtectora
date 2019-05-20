<?php
require_once 'Animal.php';

$animal  = new Animal();
$animals = $animal->retrieveAnimalAll();

echo '<pre>';
var_dump($animals);

// echo json_encode($animals);
// header('Content-Type: application/json');
