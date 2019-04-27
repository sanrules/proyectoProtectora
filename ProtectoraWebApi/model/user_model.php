<?php

require '../lib/RedBeanPHP5_3/rb.php';
R::setup('mysql:host=localhost;dbname=test',
    'root', '');

function register_user()
{
    $user = R::dispense('user');
    $user->user_name = $this->user_name;
    // $user->password = $this->password;
    $user->name = $this->name;
    $user->surname = $this->surname;
    $user->adress = $this->adress;
    $user->email = $this->email;
    $user->phone = $this->phone;
    $user->birth_date = $this->birth_date;
    $user->->type $this->type;
    $user->photo = $this->photo;

    $id = R::store($user);
    $this->id = $id;
}

function get_user()
{

}