<?php

include_once("./get_data.php");
include_once("./delete_data.php");
include_once("./add_data.php");
include_once("./update_data.php");
include_once("./model.php");
include_once("./auth-process.php");
include_once("./validation.php");
include_once("./session.php");
include_once("./input.php");

function ierg4210_DB() {
	// connect to the database
	// Warning: NEVER put your db in a publicly accessible location
	$db = new PDO('sqlite:/var/www/cart.db');

	// enable foreign key support
	$db->query('PRAGMA foreign_keys = ON;');

	// FETCH_ASSOC:
	// Specifies that the fetch method shall return each row as an
	// array indexed by column name as returned in the corresponding
	// result set. If the result set contains multiple columns with
	// the same name, PDO::FETCH_ASSOC returns only a single value
	// per column name.
	$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

	return $db;
}

function get_flag(){
    global $db;
    $db = ierg4210_DB();
    $sql="SELECT isAdmin from users WHERE email = :email";
    $q = $db->prepare($sql);
    $q->bindParam(':email', Input::email($_POST["email"]), PDO::PARAM_STR);
    return $q->execute() ? $q->fetchColumn() : "fail";
}

function get_token($hashed, $salt){
    $token = hash_hmac('sha512', $hashed, $salt);
    $token = hash_hmac('sha512', $token, random_int(PHP_INT_MIN, PHP_INT_MAX));
    return Input::str($token);
}


header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

session_start();


if ($_SERVER["REQUEST_METHOD"]==="POST"){
    
    if ($_GET["action"] == "login"){
        $res = login($_POST["email"], $_POST["password"]);
        $nonce = random_int(-10000000000, 10000000000);
        $token = get_token($res["hashed"], $res["salt"]);

        $obj = new LoginMessage();
        $obj->set(
            $res["success"],
            get_flag(),
            $_POST["email"],
            $nonce
        );

        if ($res["success"] == 1){
            session_regenerate_id();
            set_cookies($token);
            set_session($token, $nonce);

            exit(json_encode($obj));
        }
        exit(json_encode(array('success'=> 0)));

    }elseif ($_GET["action"] == "forgot"){
        $res = change_password();
        clear_session();
        echo $res;

    }elseif ($_GET["action"] == "cart"){
        echo json_decode($_POST["order"]);
    }elseif ($_GET["action"] == ('add_category' || "add_product" || 
                                "update_category" || "update_product" || 
                                'delete_category' || "delete_product")){
        if (!is_admin() || !nonce_validated()) 
            exit(json_encode(array('success'=> 0, 'message' => "Admin Auth Fail")));

        if ($_GET["action"] == 'add_category' && !add_category() ||
            $_GET["action"] == 'add_product' && !add_product() ||
            $_GET["action"] == "update_category" && !update_category() ||
            $_GET["action"] == "update_product" && !update_product() ||
            $_GET["action"] == 'delete_category' && !delete_category() ||
            $_GET["action"] == "delete_product" && !delete_product())
            exit(json_encode(array('success'=> 0, 'message' => "SQL query Fail")));

        $nonce = random_int(-10000000000, 10000000000);
        $_SESSION["nonce"] = $nonce;
        exit(json_encode(array('success'=> 1, 'message' => $nonce)));

    }
}
elseif ($_SERVER["REQUEST_METHOD"]==="GET"){
    if ($_GET["action"] == "category"){
        $res = get_category_list();
        $a = array();
        foreach ($res["values"] as $value){
            $obj = new Category();
            $obj->set(
                Input::int($value["catid"]), 
                $value["name"]
            );
            array_push($a, $obj);
        }
        $res["values"] = $a;
        exit(json_encode($res));
    }
    elseif($_GET["action"] == "product"){
        $res = get_product_list();
        $a = array();
        foreach($res["values"] as $value){
            $obj = new Product();
            $obj->set(
                Input::int($value["pid"]), 
                Input::int($value["catid"]), 
                Input::str($value["name"]), 
                Input::float($value["price"]),
                Input::str($value["description"]),
                Input::str($value["extension"])
            );
            array_push($a, $obj);
        }
        $res["values"] = $a;
        exit(json_encode($res));
    }
    elseif ($_GET["action"] == "logout"){
        clear_session();
    } 
    elseif ($_GET["action"] == "auth_admin"){
        exit(is_admin() ? "1" : "0") ;
    }
    elseif ($_GET["action"] == "auth"){
        if (is_user()){
            $obj = new LoginMessage();
            $obj->set(
                1,
                $_SESSION["isAdmin"],
                $_SESSION["email"],
                $_SESSION["nonce"]
            );
            exit(json_encode($obj));
        }
        
        exit(json_encode(array('success'=> 0)));
    }
}
?>