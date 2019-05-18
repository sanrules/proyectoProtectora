<?php
require_once '../../class/Animal.php';

$animal  = new Animal();
$animals = $animal->createAnimal('animal', 'tipo', 'raza', 'gen', '12/12/2012', '12/12/2019', 'adop', 'si', '', 'animalito');

$animal->insertAnimal();
