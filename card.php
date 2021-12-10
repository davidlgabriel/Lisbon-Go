<?php

//Register user
$CN = mysqli_connect("lisbongo.crrr4pirsxzp.us-east-2.rds.amazonaws.com", "admin", "LisbonGo123");
$DB = mysqli_select_db($CN,"LisbonGo");

$EncodedData=file_get_contents('php://input');

$DecodedData=json_decode($EncodedData,true);


$id = $DecodedData['id'];
$cc = $DecodedData['cc'];
$passe = $DecodedData['passe'];

$query = "Select * from fakeCP where cc='$cc' and passe='$passe'";
$result = mysqli_query($CN,$query);

$passe_new= "";
$qr_new="";
$message="";
if ($result) {
    if(mysqli_num_rows($result)>0) {
        $IQ = "UPDATE Users SET qr='https://i.ibb.co/2NGSpMk/qrcode-5863786.png' and passe=true WHERE id='$id'";
        $R = mysqli_query($CN,$IQ);
        if ($R) {
            $query1 = "Select * from Users where id='$id'";
            $result1 = mysqli_query($CN,$query);
            if(mysqli_num_rows($result1)>0) {
                $Row = mysqli_fetch_assoc($result1);
                $passe_new = $Row['passe'];
                $qr_new = $Row['qr'];
                $message = "200";
            }
        } else {
            $message = "Server error... Please try latter";
        }


        }
} else {
    $message = "Server error... Please try latter";
}



$Response[] = array("Message"=> $message,"qr" => $qr_new, "passe" => $passe_new);
echo json_encode($Response);

?>