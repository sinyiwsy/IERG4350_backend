<?php

function update_category(){
    global $db;
    $db = ierg4210_DB();

    $catid = Input::int($_GET["catid"]);
    $name = Input::str($_POST["name"]);

    $sql="UPDATE categories SET name = (:name) WHERE catid = :catid;";
    $q = $db->prepare($sql);
    $q->bindParam(':name', $name);
    $q->bindParam(':catid', $catid);

    return $q->execute() ? true : false; 
}

function update_product(){
    if (!image_validated())
        exit(json_encode(array('success'=>0, 'message' => "Image Fail")));
    
    global $db;
    $db = ierg4210_DB();

    $pid = Input::int($_GET["pid"]);
    $catid = Input::int($_POST["catid"]);
    $name = Input::str($_POST["name"]);
    $price = Input::float($_POST["price"]);
    $description = Input::str($_POST["description"]);
    if ($_FILES["image"]["type"] == "image/jpeg"){
        $extension = "jpg";
    }elseif($_FILES["image"]["type"] == "image/png"){
        $extension = "png";
    }else{
        $extension = "gif";
    }

    $sql="UPDATE products SET catid = (:catid), name = (:name), price = (:price), description = (:description), extension = (:extension) WHERE pid = :pid;";
    $q = $db->prepare($sql);
    $q->bindParam(':catid', $catid, PDO::PARAM_INT);
    $q->bindParam(':name', $name, PDO::PARAM_STR);
    $q->bindParam(':price', $price);
    $q->bindParam(':description', $description, PDO::PARAM_STR);
    $q->bindParam(':extension', $extension, PDO::PARAM_STR, 3);
    $q->bindParam(':pid', $pid, PDO::PARAM_INT); 

    if ($q->execute()){
        move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/html/images/" . $pid . "." . $extension);
        return true;
    }
    return false;
}

?>