<?php

//Register user
$CN = mysqli_connect("lisbongo.crrr4pirsxzp.us-east-2.rds.amazonaws.com", "admin", "LisbonGo123");
$DB = mysqli_select_db($CN,"LisbonGo");

$EncodedData=file_get_contents('php://input');

$DecodedData=json_decode($EncodedData,true);


$first_name = $DecodedData['first_name'];
$last_name = $DecodedData['last_name'];
$email = $DecodedData['email'];
$password = $DecodedData['password'];
$phone = $DecodedData['phone'];
$birthday = $DecodedData['birthday'];


$password_encrypt= md5($password);
$IQ = "insert into Users(first_name,last_name, email, pass, birthday, phone) values('$first_name','$last_name','$email', '$password_encrypt', '$birthday', '$phone')";

$R = mysqli_query($CN,$IQ);

if ($R) {
    $message = "User has been registered successfully";
    $SQ1 = "select * from Users where email='$email'";
    $Table = mysqli_query($CN, $SQ1);
    //var_dump($CN);
    if(mysqli_num_rows($Table)>0) {
        $Row = mysqli_fetch_assoc($Table);
        $id = $Row["id"];
        $first_name = $Row["first_name"];
        $last_name = $Row["last_name"];
        $photo = $Row["photo"];
        $qr = $Row["qr"];
        $birthday = $Row["birthday"];
        $phone = $Row["phone"];
        $passe = $Row["passe"];
        
    }else{
       $id = ""; 
       $first_name = ""; 
       $last_name = ""; 
       $photo = ""; 
       $qr = ""; 
       $birthday = ""; 
       $phone = ""; 
       $passe = "";
    }
}else {
    $message = "Server error... Please try latter";
}


$Response[] = array("Message"=> $message, "id" => $id, "first_name"=>$first_name, "last_name"=>$last_name, "email"=>$email, "photo"=>$photo, "qr"=>$qr, "birthday" => $birthday, "phone" => $phone,"passe" => $passe);
echo json_encode($Response);

?>
