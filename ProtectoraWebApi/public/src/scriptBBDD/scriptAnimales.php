<?php
require_once '../Animal.php';

$animales = array(
    array(
        'name'         => 'Lula',
        'type'         => 'perro',
        'breed'        => 'Pastor Alemán',
        'gender'       => 'hembra',
        'birthDate'    => '10/03/2012',
        'entranceDate' => '06/09/2017',
        'adoptionDate' => 'null',
        'status'       => 'non adopted',
        'description'  => 'Pastor Alemán de nombre Lula',
        'pictures'     => 'lula01.jpg, lula02.jpg',
    ),
    array(
        'name'         => 'Hodor',
        'type'         => 'gato',
        'breed'        => 'Común europeo',
        'gender'       => 'macho',
        'birthDate'    => '02/10/2016',
        'entranceDate' => '09/12/2016',
        'adoptionDate' => '07/01/2017',
        'status'       => 'adopted',
        'description'  => 'Gato muy bueno, un poco bizco pero muy adorable',
        'pictures'     => 'hodor01.jpg, hodor02.jpg',
    ),
    array(
        'name'         => 'Kobi',
        'type'         => 'otro',
        'breed'        => 'Conejo',
        'gender'       => 'macho',
        'birthDate'    => '02/11/2012',
        'entranceDate' => '04/12/2013',
        'adoptionDate' => '15/05/2014',
        'status'       => 'adopted',
        'description'  => 'Conejo cabeza de león, muy simpático pero no se deja coger',
        'pictures'     => 'kobi01.jpg, kobi02.jpg',
    ),
    array(
        'name'         => 'Lucho',
        'type'         => 'perro',
        'breed'        => 'mestizo',
        'gender'       => 'macho',
        'birthDate'    => '17/01/2008',
        'entranceDate' => '13/02/2013',
        'status'       => 'non adopted',
        'description'  => 'Perro muy juguetón, un poco mayor y muy cariñoso',
        'pictures'     => 'lucho01.jpg, luchos02.jpg',
    ),
);

foreach ($animales as $animal) {
    $newAnimal = new Animal();
    $newAnimal->setName($animal['name']);
    $newAnimal->setType($animal['type']);
    $newAnimal->setBreed($animal['breed']);
    $newAnimal->setGender($animal['gender']);
    $newAnimal->setBirthDate(date("Y-m-d H:i:s", strtotime($animal['birthDate'])));
    $newAnimal->setEntranceDate(date("Y-m-d H:i:s", strtotime($animal['entranceDate'])));
    if (isset($animal['adoptionDate'])) {
        $newAnimal->setAdoptionDate(date("Y-m-d H:i:s", strtotime($animal['adoptionDate'])));
    }
    $newAnimal->setStatus($animal['status']);
    $newAnimal->setDescription($animal['description']);
    $newAnimal->setPictures($animal['pictures']);

    $newAnimal->insertAnimal();
}
;
