<?php
//Chrome php: Muestra logs de php en la consola del navegador
require 'ChromePhp.php';

//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('application/json, text/plain, */*');

// Archivos de RedBeanPHP
require_once 'RedBean/rb.php';
//Configuracióm
R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

//Funciones auxiliares
require_once 'lib_aux.php';
