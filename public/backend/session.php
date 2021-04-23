<?php

function set_cookies($token){
    $exp = time() + 3600 * 24 * 3;
    setcookie("auth", $token, $exp, "/", "", true, true);
}

function set_session($token, $nonce){
    $_SESSION["auth"] = $token;
    $_SESSION["isAdmin"] = get_flag();
    $_SESSION["exp"] = time() + 3600 * 24 * 3;
    $_SESSION["email"] = $_POST["email"];
    $_SESSION["nonce"] = $nonce;
}

function clear_session(){
    unset($_SESSION["auth"]);
    unset($_SESSION["isAdmin"]);
    unset($_SESSION["email"]);
    unset($_SESSION["exp"]);
    unset($_SESSION["nonce"]);
}

?>