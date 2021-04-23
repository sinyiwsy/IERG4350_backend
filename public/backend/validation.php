<?php

function image_validated(){
    return $_FILES["image"]["error"] == 0
        && ($_FILES["image"]["type"] == "image/jpeg"
            || $_FILES["image"]["type"] == "image/png"
            || $_FILES["image"]["type"] == "image/gif")
        && (mime_content_type($_FILES["image"]["tmp_name"]) == "image/jpeg"
            || mime_content_type($_FILES["image"]["tmp_name"]) == "image/png"
            || mime_content_type($_FILES["image"]["tmp_name"]) == "image/gif")
        && $_FILES["image"]["size"] < 10000000;
}

function is_admin(){
    return isset($_COOKIE["auth"]) && 
        isset($_SESSION["auth"]) && 
        $_COOKIE["auth"] == $_SESSION["auth"] && 
        $_SESSION["isAdmin"] == 1 &&
        $_SESSION["exp"] >= time() &&
        $_COOKIE['PHPSESSID'] == session_id();
}

function is_user(){
    return isset($_COOKIE["auth"]) && 
        isset($_SESSION["auth"]) &&
        $_COOKIE["auth"] == $_SESSION["auth"] &&
        $_SESSION["exp"] >= time() &&
        $_COOKIE['PHPSESSID'] == session_id();
}
    
    
    
function nonce_validated(){
    return $_POST["nonce"] == $_SESSION["nonce"];
}

?>