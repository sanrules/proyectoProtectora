<?php

/**
 * Obtiene todos los usuarios de la base de datos, da formato y valida el mismo y los devuelve
 * @return array $users array de user obtenido de la bbdd
 */

require_once '../../lib/connection.php';
require_once '../../model/animal_model.php';

ChromePhp::log('PHP:get_animal_all()');

$animals = retrieve_animal_all();
ChromePhp::log('PHP: retrieve_animal_all() response', $animals);

echo json_encode($animals);
header('Content-Type: application/json');