<?php
require_once 'lib/RedBean/rb.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto',
    'root', 'root');

// ! configuración para xampp
// R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

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

    public function __construct()
    {

    }

    public function createAnimal($name, $type, $breed, $gender, $birth_date, $entrance_date, $adoption_date = null, $status, $description, $pictures)
    {
        $this->$name          = $name;
        $this->$type          = $type;
        $this->$breed         = $breed;
        $this->$gender        = $gender;
        $this->$birth_date    = $birth_date;
        $this->$entrance_date = $entrance_date;
        $this->$adoption_date = $adoption_date;
        $this->$status        = $status;
        $this->$description   = $description;
        $this->$pictures      = $pictures;
    }

    public function insertAnimal()
    {
        $animal = R::dispense('animal');

        $animal->name          = $this->name;
        $animal->type          = $this->type;
        $animal->breed         = $this->breed;
        $animal->gender        = $this->gender;
        $animal->birth_date    = $this->birth_date;
        $animal->entrance_date = $this->entrance_date;
        $animal->adoption_date = $this->adoption_date;
        $animal->status        = $this->status;
        $animal->description   = $this->description;
        $animal->pictures      = $this->pictures;

        $id = R::store($animal);
    }

/**
 * Obtiene un animal de la base de datos en base a su id
 * @param int $id ID del animal
 * @return Animal $animal animal recogido de la base de datos
 */
    public function retrieveAnimal($id)
    {
        $animal = R::load('animal', $id);

        return $animal;
    }

/**
 * Obtiene todos los animales de la base de datos
 * @return Array $animals array de Animal multidimensional recogido de la base de datos
 */
    public function retrieveAnimalAll()
    {
        $animals = R::getAll('select * from animal');

        return $animals;
    }

/**
 * Obtiene todos los animales de la base de datos en función a los parámetros pasados
 * @param array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
 * @return Array $animals array de Animal multidimensional recogido de la base de datos
 */
    public function retrieveAnimalParams($params)
    {
        $num = $count($paramS);
        $sql = "SELECT * FROM animal WHERE ";

        foreach ($params as $field->$value) {
            --$num;
            $sql .= " $field = $value ";
            $sql .= $num != 0 ? ' AND ' : ' ;';
        }

        $animals = R::find($sql);

        return $animals;
    }

/**
 * Actualiza un animal de la base de datos
 * @param int $id ID del animal
 * @param Animal $updated_animal animal con los datos actualizados
 */
    public function updateAnimal($id, $updated_animal)
    {
        $old_animal = R::load('animal', $id);
        $old_animal = $updated_animal;

        R::store($old_animal);
    }

/**
 * Borra un animal de la base de datos
 * @param Animal $animal animal a borrar
 */
    public function deleteAnimal($animal)
    {
        R::trash($animal);
    }

}
