<?php
require_once 'lib/RedBean/rb.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Animal
{
    private $_id     = '';
    private $_name   = '';
    private $_type   = '';
    private $_breed  = ''; // Raza
    private $_gender = '';

    private $_birth_date    = '';
    private $_entrance_date = '';
    private $_adoption_date = ''; // Permite nulos

    private $_status      = ''; // Adoptado, sin adoptar
    private $_description = '';
    private $_pictures    = '';

    public function __construct()
    { }

    public function createAnimal($name, $type, $breed, $gender, $birth_date, $entrance_date, $adoption_date = null, $status, $description, $pictures)
    {
        $this->_name          = $name;
        $this->_type          = $type;
        $this->_breed         = $breed;
        $this->_gender        = $gender;
        $this->_birth_date    = $birth_date;
        $this->_entrance_date = $entrance_date;
        $this->_adoption_date = $adoption_date;
        $this->_status        = $status;
        $this->_description   = $description;
        $this->_pictures      = $pictures;
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
     * @return array $animals array de Animal multidimensional recogido de la base de datos
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
    { }

    /*
     *** GETTERS Y SETTERS
     */

    /**
     * Get the value of _idUser
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * Set the value of _id
     *
     * @return  self
     */
    public function setId($_id)
    {
        $this->_id = $_id;

        return $this;
    }

    /**
     * Get the value of _name
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * Set the value of _name
     *
     * @return  self
     */
    public function setName($_name)
    {
        $this->_name = $_name;

        return $this;
    }

    /**
     * Get the value of _type
     */
    public function getType()
    {
        return $this->_type;
    }

    /**
     * Set the value of _type
     *
     * @return  self
     */
    public function setType($_type)
    {
        $this->_type = $_type;

        return $this;
    }

    /**
     * Get the value of _breed
     */
    public function getBreed()
    {
        return $this->_breed;
    }

    /**
     * Set the value of _breed
     *
     * @return  self
     */
    public function setBreed($_breed)
    {
        $this->_breed = $_breed;

        return $this;
    }

    /**
     * Get the value of _gender
     */
    public function getGender()
    {
        return $this->_gender;
    }

    /**
     * Set the value of _gender
     *
     * @return  self
     */
    public function setGender($_gender)
    {
        $this->_gender = $_gender;

        return $this;
    }

    /**
     * Get the value of _birth_date
     */
    public function getBirthDate()
    {
        return $this->_birth_date;
    }

    /**
     * Set the value of _birth_date
     *
     * @return  self
     */
    public function setBirthDate($_birth_date)
    {
        $this->_birth_date = $_birth_date;

        return $this;
    }

    /**
     * Get the value of _entrance_date
     */
    public function getEntranceDate()
    {
        return $this->_entrance_date;
    }

    /**
     * Set the value of _entrance_date
     *
     * @return  self
     */
    public function setEntranceDate($_entrance_date)
    {
        $this->_entrance_date = $_entrance_date;

        return $this;
    }

    /**
     * Get the value of _adoption_date
     */
    public function getAdoptionDate()
    {
        return $this->_adoption_date;
    }

    /**
     * Set the value of _adoption_date
     *
     * @return  self
     */
    public function setAdoptionDate($_adoption_date)
    {
        $this->_adoption_date = $_adoption_date;

        return $this;
    }

    /**
     * Get the value of _status
     */
    public function getStatus()
    {
        return $this->_status;
    }

    /**
     * Set the value of _status
     *
     * @return  self
     */
    public function setStatus($_status)
    {
        $this->_status = $_status;

        return $this;
    }

    /**
     * Get the value of _description
     */
    public function getDescription()
    {
        return $this->_description;
    }

    /**
     * Set the value of _description
     *
     * @return  self
     */
    public function setDescription($_description)
    {
        $this->_description = $_description;

        return $this;
    }

    /**
     * Get the value of _pictures
     */
    public function getPictures()
    {
        return $this->_pictures;
    }

    /**
     * Set the value of _pictures
     *
     * @return  self
     */
    public function setPictures($_pictures)
    {
        $this->_pictures = $_pictures;

        return $this;
    }
}
