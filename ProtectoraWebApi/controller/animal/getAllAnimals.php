<?php
require_once '../../class/Animal.php';

$animal  = new Animal();
$animals = $animal->retrieveAnimalAll();

echo json_encode($animals);
header('Content-Type: application/json');
