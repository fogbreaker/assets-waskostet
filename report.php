<?php


header('Access-Control-Allow-Origin: *');


$error = $_POST['error'];
$report = $_POST['report'];
if ($error != ""){
    $mails = ["webmaster@was-kostet.at", "f.marcher@gmx.at", "mario.meglitsch@gmx.at"];
    foreach ($mails as $mail){
        mail($mail,"[WAKO] Error-Reporting", $error);
    }
}

if ($report != ""){
    $mails = ["webmaster@was-kostet.at"];
    foreach ($mails as $mail){
        mail($mail,"[WAKO] Click-Reporting", $report);
    }
}
