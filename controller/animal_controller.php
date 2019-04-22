<?php
require_once '../class/animal.php';
require_once '../model/animal_model.php';

if (isset($_POST['animal'])) {
    $animal = new Animal();
    $animal->name = $_POST['name'];
    $animal->type = $_POST['type'];
    $animal->breed = $_POST['breed'];
    $animal->gender = $_POST['gender'];
    $animal->birth_date = $_POST['birth_date'];
    $animal->entrance_date = $_POST['entrance_date'];
    $animal->adoption_date = $_POST['adoption_date'];
    $animal->status = $_POST['status'];
    $animal->description = $_POST['description'];
    $animal->pictures = $_POST['pictures'];

    insert_animal($animal);
}
