<?php

function add_category(){
    global $db;
    $db = ierg4210_DB();

    $name = Input::str($_POST["name"]);
    $sql="INSERT INTO categories (name) VALUES (:name);";
    $q = $db->prepare($sql);
    $q->bindParam(':name', $name, PDO::PARAM_STR);

    return $q->execute() ? true : false;
}

function add_product(){
    if (!image_validated())
        exit(json_encode(array('success'=>0, 'message' => "Image Fail")));
    
    global $db;
    $db = ierg4210_DB();

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

    $sql="INSERT INTO products (catid, name, price, description, extension) VALUES (:catid, :name, :price, :description, :extension);";
    $q = $db->prepare($sql);
    $q->bindParam(':catid', $catid, PDO::PARAM_INT);
    $q->bindParam(':name', $name, PDO::PARAM_STR);
    $q->bindParam(':price', $price);
    $q->bindParam(':description', $description, PDO::PARAM_STR);
    $q->bindParam(':extension', $extension, PDO::PARAM_STR, 3);

    if ($q->execute()){
        $lastId = $db->lastInsertId();
        move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/html/images/" . $lastId . "." . $extension);
        return true;
    }
    return false;
}

?>