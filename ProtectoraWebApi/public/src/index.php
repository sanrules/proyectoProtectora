<?php
require_once 'lib/RedBean/rb.php';
R::setup('mysql:host=localhost;dbname=proyecto',
    'root', 'root');

// $dsn = "mysql:host=localhost;dbname=pruebas";
// $pdo = new PDO($dsn, 'root', 'root');

$animal = R::dispense('animal');

$animal->name          = 'prueba';
$animal->type          = 'tipo';
$animal->breed         = 'raza';
$animal->gender        = 'genero';
$animal->birth_date    = '12/02/2014';
$animal->entrance_date = '12/02/2014';
$animal->adoption_date = '12/02/2014';
$animal->status        = 'estado';
$animal->description   = 'descripcion';
$animal->pictures      = 'fotos';

$id = R::store($animal);
