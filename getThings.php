<?php

    $CN = mysqli_connect("lisbongo.crrr4pirsxzp.us-east-2.rds.amazonaws.com", "admin", "LisbonGo123");
    $DB = mysqli_select_db($CN, "LisbonGo");

    $Encoded = file_get_contents('php://input');

    $Decoded = json_decode($Encoded, true);

    $id = $Decoded["id"];

    $SQ = "select * from Users where id=$id";

    $Table = mysqli_query($CN, $SQ);

    if(mysqli_num_rows($Table)>0) {
        $Row = mysqli_fetch_assoc($Table);
        $first_name = $Row["first_name"];
        $last_name = $Row["last_name"];
        $photo = $Row["photo"];
        $qr = $Row["qr"];
    } else {
        $first_name = "";
        $last_name = "";
        $photo = "";
        $qr = "";
    }

    $Response[] = array("first_name"=>$first_name, "last_name"=>$last_name, "photo"=>$photo, "qr"=>$qr);
    echo json_encode($Response);
    

?>