<?php
function login($email, $password){
    global $db;
    $db = ierg4210_DB();

    $email = Input::email($email);
    $password = Input::str($password);
    
    $sql="SELECT COUNT(userid) FROM users WHERE email = :email AND password = :password";
    $q = $db->prepare($sql);
    $salt = get_salt();
    $hashed = hash_hmac('sha512', $password, $salt);
    $q->bindParam(':email', $email, PDO::PARAM_STR);
    $q->bindParam(':password', $hashed, PDO::PARAM_STR);

    if ($q->execute()){
        return array(
            'success' => $q->fetchColumn(),
            'hashed' => $hashed,
            'salt' => $salt
        );
    }
}


function change_password(){

    if (login($_POST["email"], $_POST["old_password"])["success"] == 1){
        global $db;
        $db = ierg4210_DB();

        $salt = random_int(PHP_INT_MIN, PHP_INT_MAX);
        $hashed = hash_hmac('sha512', Input::str($_POST["new_password"]), $salt);
        
        $sql="UPDATE users SET password = :password, salt = :salt WHERE email = :email";
        $q = $db->prepare($sql);
        $q->bindParam(':email', $_POST["email"], PDO::PARAM_STR);
        $q->bindParam(':password', $hashed, PDO::PARAM_STR);
        $q->bindParam(':salt', $salt);
        if ($q->execute()){
            return "ok";
        }
    }
    return "fail";
}

function get_salt(){
    global $db;
    $db = ierg4210_DB();
    $sql="SELECT salt from users WHERE email = :email";
    $q = $db->prepare($sql);
    $q->bindParam(':email', Input::email($_POST["email"]), PDO::PARAM_STR);
    if ($q->execute()){
        return $q->fetchColumn();
    }
    return "fail";
}

/*function format_validate($type, $value){
    if ($type == "email"){
        $email = test_input($value);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return FALSE;
        }
    }
    return TRUE;
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}*/


?>