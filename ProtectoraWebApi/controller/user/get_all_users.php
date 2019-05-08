<?php

/**
 * Obtiene todos los usuarios de la base de datos, da formato y valida el mismo y los devuelve
 * @return array $users array de user obtenido de la bbdd
 */

require_once '../../lib/connection.php';
require_once '../../model/user_model.php';

ChromePhp::log('PHP:get_user_all()');

$users = retrieve_user_all();
ChromePhp::log('PHP: retrieve_user_all() response', $users);

echo json_encode($users);
header('Content-Type: application/json');
