<?php

require '../lib/RedBeanPHP5_3/rb.php';
R::setup('mysql:host=localhost;dbname=test',
    'root', '');

function insert_animal()
{
    $animal = R::dispense('animal');
    $animal->name = $this->name;
    $animal->type = $this->type;
    $animal->breed = $this->breed;
    $animal->gender = $this->gender;
    $animal->birth_date = $this->birth_date;
    $animal->entrance_date = $this->entrance_date;
    $animal->adoption_date = $this->adoption_date;
    $animal->status = $this->status;
    $animal->description = $this->description;
    $animal->pictures = $this->pictures;

    $id = R::store($animal);
    $this->id = $id;
}

function get_animal()
{

}
