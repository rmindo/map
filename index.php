<?php


include 'Router.php';
include 'Controller.php';


define( 'MAIN', str_replace( '\\', '/', __DIR__ ) . '/' );
define( 'APP', str_replace( '\\', '/', realpath( __DIR__ .'/App') ) . '/' );




/* Router */
$router = new Router;


$router->run();