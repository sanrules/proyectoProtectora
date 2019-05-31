<?php
require_once 'lib/RedBean/rb.php';
include 'lib/ChromePhp.php';

// ! configuración para mamp
// R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Animal
{
    public $_id     = '';
    public $_name   = '';
    public $_type   = '';
    public $_breed  = ''; // Raza
    public $_gender = '';

    public $_birth_date    = '';
    public $_entrance_date = '';
    public $_adoption_date = ''; // Permite nulos

    public $_status      = ''; // Adoptado, sin adoptar
    public $_description = '';
    public $_pictures    = '';

    public function __construct()
    {

    }

    public function createAnimal($_name, $_type, $_breed, $_gender, $_birth_date, $_entrance_date, $_adoption_date = null, $_status, $_description, $_pictures)
    {
        $this->_name          = $_name;
        $this->_type          = $_type;
        $this->_breed         = $_breed;
        $this->_gender        = $_gender;
        $this->_birth_date    = $_birth_date;
        $this->_entrance_date = $_entrance_date;
        $this->_adoption_date = $_adoption_date;
        $this->_status        = $_status;
        $this->_description   = $_description;
        $this->_pictures      = $_pictures;
    }

    public function insertAnimal()
    {
        $animal = R::dispense('animal');

        $animal->name          = $this->_name;
        $animal->type          = $this->_type;
        $animal->breed         = $this->_breed;
        $animal->gender        = $this->_gender;
        $animal->birth_date    = $this->_birth_date;
        $animal->entrance_date = $this->_entrance_date;
        $animal->adoption_date = $this->_adoption_date;
        $animal->status        = $this->_status;
        $animal->description   = $this->_description;
        $animal->pictures      = $this->_pictures;

        $id = R::store($animal);

        $this->_id = $id;
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

    /**
     * Obtiene todos los animales de la base de datos en función a unos parámetros.
     * @param array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
     * @return array $users array de user obtenido de la bbdd
     */
    public function getSpecificAnimal($params)
    {

    }

    /*
     *** GETTERS Y SETTERS
     */

    /**
     * Get the value of _idUser
     */
    public function get_id()
    {
        return $this->_id;
    }

    /**
     * Set the value of _id
     *
     * @return  self
     */
    public function set_id($_id)
    {
        $this->_id = $_id;

        return $this;
    }

    /**
     * Get the value of _name
     */
    public function get_name()
    {
        return $this->_name;
    }

    /**
     * Set the value of _name
     *
     * @return  self
     */
    public function set_name($_name)
    {
        $this->_name = $_name;

        return $this;
    }

    /**
     * Get the value of _type
     */
    public function get_type()
    {
        return $this->_type;
    }

    /**
     * Set the value of _type
     *
     * @return  self
     */
    public function set_type($_type)
    {
        $this->_type = $_type;

        return $this;
    }

    /**
     * Get the value of _breed
     */
    public function get_breed()
    {
        return $this->_breed;
    }

    /**
     * Set the value of _breed
     *
     * @return  self
     */
    public function set_breed($_breed)
    {
        $this->_breed = $_breed;

        return $this;
    }

    /**
     * Get the value of _gender
     */
    public function get_gender()
    {
        return $this->_gender;
    }

    /**
     * Set the value of _gender
     *
     * @return  self
     */
    public function set_gender($_gender)
    {
        $this->_gender = $_gender;

        return $this;
    }

    /**
     * Get the value of _birth_date
     */
    public function get_birth_date()
    {
        return $this->_birth_date;
    }

    /**
     * Set the value of _birth_date
     *
     * @return  self
     */
    public function set_birth_date($_birth_date)
    {
        $this->_birth_date = $_birth_date;

        return $this;
    }

    /**
     * Get the value of _entrance_date
     */
    public function get_entrance_date()
    {
        return $this->_entrance_date;
    }

    /**
     * Set the value of _entrance_date
     *
     * @return  self
     */
    public function set_entrance_date($_entrance_date)
    {
        $this->_entrance_date = $_entrance_date;

        return $this;
    }

    /**
     * Get the value of _adoption_date
     */
    public function get_adoption_date()
    {
        return $this->_adoption_date;
    }

    /**
     * Set the value of _adoption_date
     *
     * @return  self
     */
    public function set_adoption_date($_adoption_date)
    {
        $this->_adoption_date = $_adoption_date;

        return $this;
    }

    /**
     * Get the value of _status
     */
    public function get_status()
    {
        return $this->_status;
    }

    /**
     * Set the value of _status
     *
     * @return  self
     */
    public function set_status($_status)
    {
        $this->_status = $_status;

        return $this;
    }

    /**
     * Get the value of _description
     */
    public function get_description()
    {
        return $this->_description;
    }

    /**
     * Set the value of _description
     *
     * @return  self
     */
    public function set_description($_description)
    {
        $this->_description = $_description;

        return $this;
    }

    /**
     * Get the value of _pictures
     */
    public function get_pictures()
    {
        return $this->_pictures;
    }

    /**
     * Set the value of _pictures
     *
     * @return  self
     */
    public function set_pictures($_pictures)
    {
        $this->_pictures = $_pictures;

        return $this;
    }

}
