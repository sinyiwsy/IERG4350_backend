<?php

class Product {
    public $pid;
    public $catid;
    public $name;
    public $price;
    public $description;
    public $extension;
    
    function set($pid, $catid, $name, $price, $description, $extension){
        $this->pid = $pid;
        $this->catid = $catid;
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
        $this->extension = $extension;
    }
}

class Category{
    public $catid;
    public $name;

    function set($catid, $name){
        $this->catid = $catid;
        $this->name = $name;
    }
}

class LoginMessage{
    public $success;
    public $isAdmin;
    public $email;
    public $nonce;

    function set($success, $isAdmin, $email, $nonce){
        $this->success = $success;
        $this->isAdmin = $isAdmin;
        $this->email = $email;
        $this->nonce = $nonce;
    }
}


?>
