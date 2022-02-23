<?php
Header('Access-Control-Allow-Origin: *');
Header('Access-Control-Allow-Headers: *');
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Bangkok');

$hostname = "localhost";
$database  = "rrs";
$username = "root";
$password = "";

define('LINE_API', "https://notify-api.line.me/api/notify");
define('webUrl', "https://404-notfound-dev.com/mrs/");
$token = "x0UK5hTkQCkQ57d32vxpIl0h2sTYpoiD4FSUg4TpN5Z";
