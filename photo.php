<?php

//Register user
$CN = mysqli_connect("lisbongo.crrr4pirsxzp.us-east-2.rds.amazonaws.com", "admin", "LisbonGo123");
$DB = mysqli_select_db($CN,"LisbonGo");

$EncodedData=file_get_contents('php://input');

$DecodedData=json_decode($EncodedData,true);


$photo = $DecodedData['photo'];
$email = $DecodedData['email'];


$IQ = "UPDATE Users SET photo='$photo' WHERE email='$email'";

$R = mysqli_query($CN,$IQ);

if ($R) {
    $message = "New photo!";
} else {
    $message = "Server error... Please try latter";
}


$Response[] = array("Message"=> $message);
echo json_encode($Response);

?>