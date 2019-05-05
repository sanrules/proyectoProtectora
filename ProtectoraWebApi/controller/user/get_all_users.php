<?php

/**
 * Obtiene todos los useres de la base de datos, da formato y valida el mismo y los devuelve
 * @return array $users array de user obtenido de la bbdd
 */

    require_once '../../lib/connection.php';
    require_once '../../model/user_model.php';

    ChromePhp::log('get_user_all()');

    $users = retrieve_user_all();
    ChromePhp::log($users);

    echo json_encode($users);
    header('Content-Type: application/json');
