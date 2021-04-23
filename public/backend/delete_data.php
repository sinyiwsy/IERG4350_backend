<?php

function delete_category(){
    global $db;
    $db = ierg4210_DB();

    $catid = Input::int($_GET["catid"]);

    $q = $db->prepare("DELETE FROM products WHERE catid = :catid;");
    $q->bindParam(':catid', $catid, PDO::PARAM_INT);

    if ($q->execute()){
        $q = $db->prepare("DELETE FROM categories WHERE catid = :catid;");
        $q->bindParam(':catid', $catid, PDO::PARAM_INT);
        return $q->execute() ? true : false;
    }
    return false;
}

function delete_product(){
    global $db;
    $db = ierg4210_DB();

    $pid = Input::int($_GET["pid"]);

    $q = $db->prepare("DELETE FROM products WHERE pid = :pid;");
    $q->bindParam(':pid', $pid, PDO::PARAM_INT);
    return $q->execute() ? true : false; 
}

?>
