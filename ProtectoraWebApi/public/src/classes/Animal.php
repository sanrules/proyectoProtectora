<?php
require_once 'lib/RedBean/rb.php';
include 'lib/ChromePhp.php';

// ! configuración para mamp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Animal
{
    private $_id     = '';
    private $_name   = '';
    private $_type   = '';
    private $_breed  = ''; // Raza
    private $_gender = '';
    private $_size = '';

    private $_birthDate    = '';
    private $_entranceDate = '';
    private $_adoptionDate = ''; // Permite nulos

    private $_status      = ''; // Adoptado, sin adoptar
    private $_description = '';
    private $_pictures    = '';

    public function __construct()
    { }

    public function createAnimal($name, $type, $breed, $gender, $size, $birthDate, $entranceDate, $adoptionDate = null, $status, $description, $pictures)
    {
        $this->_name          = $name;
        $this->_type          = $type;
        $this->_breed         = $breed;
        $this->_gender        = $gender;
        $this->_size          = $size;
        $this->_birthDate     = $birthDate;
        $this->_entranceDate  = $entranceDate;
        $this->_adoptionDate  = $adoptionDate;
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
        $animal->size          = $this->_size;
        $animal->birth_date    = $this->_birthDate;
        $animal->entrance_date = $this->_entranceDate;
        $animal->adoption_date = $this->_adoptionDate;
        $animal->status        = $this->_status;
        $animal->description   = $this->_description;

        $id = R::store($animal);

        $this->setId($id);
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
        $num = count($params);
        $sql = "SELECT * FROM animal WHERE ";

        foreach ($params as $field => $value) {
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
    public function updateAnimal()
    {
        $oldAnimal = R::load('animal', $this->getId());

        $oldAnimal->name          = $this->getName();
        $oldAnimal->type          = $this->getType();
        $oldAnimal->breed         = $this->getBreed();
        $oldAnimal->gender        = $this->getGender();
        $oldAnimal->birth_date    = $this->getBirthDate();
        $oldAnimal->entrance_date = $this->getEntranceDate();
        $oldAnimal->adoption_date = $this->getAdoptionDate();
        $oldAnimal->status        = $this->getStatus();
        $oldAnimal->description   = $this->getDescription();
        $oldAnimal->pictures      = $this->getPictures();

        R::store($oldAnimal);
    }

    public function updateImages($id, $animalImage)
    {
        $animal = R::load('animal', $id);

        $images = R::dispense('images');
        $images->image = $animalImage;
        
        $animal->ownImagesList[] = $images;
        

        R::store($animal);
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
    public function setId($id)
    {
        $this->_id = $id;

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
    public function setName($name)
    {
        $this->_name = $name;

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
    public function setType($type)
    {
        $this->_type = $type;

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
    public function setBreed($breed)
    {
        $this->_breed = $breed;

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
    public function setGender($gender)
    {
        $this->_gender = $gender;

        return $this;
    }

    /**
     * Get the value of _birthDate
     */
    public function getBirthDate()
    {
        return $this->_birthDate;
    }

    /**
     * Set the value of _birthDate
     *
     * @return  self
     */
    public function setBirthDate($birthDate)
    {
        $this->_birthDate = $birthDate;

        return $this;
    }

    /**
     * Get the value of _entranceDate
     */
    public function getEntranceDate()
    {
        return $this->_entranceDate;
    }

    /**
     * Set the value of _entranceDate
     *
     * @return  self
     */
    public function setEntranceDate($entranceDate)
    {
        $this->_entranceDate = $entranceDate;

        return $this;
    }

    /**
     * Get the value of _adoptionDate
     */
    public function getAdoptionDate()
    {
        return $this->_adoptionDate;
    }

    /**
     * Set the value of _adoptionDate
     *
     * @return  self
     */
    public function setAdoptionDate($adoptionDate)
    {
        $this->_adoptionDate = $adoptionDate;

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
    public function setStatus($status)
    {
        $this->_status = $status;

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
    public function setDescription($description)
    {
        $this->_description = $description;

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
    public function setPictures($pictures)
    {
        $this->_pictures = $pictures;

        return $this;
    }
}
