
<?php

//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');


// Archivos de RedBeanPHP
require_once 'RedBeanPHP5_3/rb.php';
//Configuracióm
R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

//Funciones auxiliares
require_once 'lib_aux.php';

//Chrome php: Muestra logs de php en la consola del navegador
include 'ChromePhp.php';

?>