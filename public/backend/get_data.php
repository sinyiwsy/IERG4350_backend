<?php

function get_category_list() {
    // DB manipulation
    global $db;
    $db = ierg4210_DB();

    $q = $db->prepare("SELECT * FROM categories LIMIT 100;");
    if ($q->execute())
        return array('success' => 1, 'values' => $q->fetchAll());
    return array('success'=> 0, 'message' => "SQL Query Fail");
}

function get_product_list() {
    global $db;
    $db = ierg4210_DB();

    $q = $db->prepare("SELECT * FROM products LIMIT 100;");
    if ($q->execute())
        return array('success' => 1, 'values' => $q->fetchAll());
    return array('success'=> 0, 'message' => "SQL Query Fail");
}

?>