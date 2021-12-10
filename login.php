<?php

//Register user
$CN = mysqli_connect("lisbongo.crrr4pirsxzp.us-east-2.rds.amazonaws.com", "admin", "LisbonGo123");
$DB = mysqli_select_db($CN,"LisbonGo");

$EncodedData=file_get_contents('php://input');

$DecodedData=json_decode($EncodedData,true);


$email = $DecodedData['email'];
$password = $DecodedData['password'];


$password_encrypt= md5($password);

$IQ = "select * from Users where email='$email' and pass='$password_encrypt'";

$pass = ""; 
$id = "";
$first_name ="";
$last_name = "";
$photo = "";
$birthday="";
$qr ="";
$phone ="";
$message="500";
$passe="";

$Table = mysqli_query($CN, $IQ);
if ($Table) {
    if(mysqli_num_rows($Table)>0) {
        $Row = mysqli_fetch_assoc($Table);
        $pass = $Row["pass"];
        $id = $Row["id"];
        $first_name =$Row["first_name"];
        $last_name = $Row["last_name"];
        $photo = $Row['photo'];
        $birthday = $Row['birthday'];
        $qr = $Row['qr'];
        $phone = $Row['phone'];
        $passe = $Row['passe'];
        $message="200";
        }
    }
else {
    $message="Server Error";
}
$Response[]= array("Message"=> $message, "id" => $id, "first_name" => $first_name, "last_name" => $last_name, "photo"=> $photo, "birthday"=>$birthday, "qr" => $qr, "phone" => $phone, "email" => $email, "passe" => $passe);
echo json_encode($Response);

?>

