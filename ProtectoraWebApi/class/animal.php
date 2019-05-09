<?php

require '../lib/RedBeanPHP5_3/rb.php';

class Animal
{
    public $id     = '';
    public $name   = '';
    public $type   = '';
    public $breed  = ''; // Raza
    public $gender = '';

    public $birth_date    = '';
    public $entrance_date = '';
    public $adoption_date = ''; // Permite nulos

    public $status      = ''; // Adoptado, sin adoptar
    public $description = '';
    public $pictures    = '';

    // public function __construct($name, $type, $breed, $gender, $birth_date, $entrance_date, $adoption_date = null, $status, $description, $pictures)
    // {
    //     $this->$name = $name;
    //     $this->$type = $type;
    //     $this->$breed = $breed;
    //     $this->$gender = $gender;
    //     $this->$birth_date = $birth_date;
    //     $this->$entrance_date = $entrance_date;
    //     $this->$adoption_date = $adoption_date;
    //     $this->$status = $status;
    //     $this->$description = $description;
    //     $this->$pictures = $pictures;
    // }

    // public function __destruct()
    // {}

}
