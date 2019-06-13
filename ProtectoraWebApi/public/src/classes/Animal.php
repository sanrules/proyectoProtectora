<?php
require_once 'lib/RedBean/rb.php';
require 'lib/ChromePhp.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Animal
{
    private $_id     = 0;
    private $_name   = '';
    private $_type   = '';
    private $_breed  = ''; // Raza
    private $_gender = '';
    private $_size   = '';

    private $_birthDate    = '';
    private $_entranceDate = '';
    private $_adoptionDate = ''; // Permite nulos

    private $_status      = ''; // Adoptado, sin adoptar
    private $_description = '';

    public function __construct()
    {
    }

    /**
     * Crea todas las propiedades de un animal y les da valores.
     *
     * @param  string      $name
     * @param  AnimalType  $type
     * @param  AnimalBreed $breed
     * @param  string      $gender
     * @param  string      $size
     * @param  date        $birthDate
     * @param  date        $entranceDate
     * @param  date        $adoptionDate
     * @param  bool        $status
     * @param  string      $description
     * @return void
     */

    public function createAnimal($name, $type, $breed, $gender, $size, $birthDate, $entranceDate, $adoptionDate = null, $status, $description)
    {
        $this->_name         = $name;
        $this->_type         = $type;
        $this->_breed        = $breed;
        $this->_gender       = $gender;
        $this->_size         = $size;
        $this->_birthDate    = $birthDate;
        $this->_entranceDate = $entranceDate;
        $this->_adoptionDate = $adoptionDate;
        $this->_status       = $status;
        $this->_description  = $description;
    }

    /**
     * Inserta un animal en la base de datos.
     */
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
     * Obtiene un animal de la base de datos en base a su id.
     *
     * @return Animal $animal animal recogido de la base de datos
     */
    public function retrieveAnimal()
    {
        $animal = R::load('animal', $this->getId());

        return $animal;
    }

    /**
     * Obtiene todos los animales de la base de datos.
     *
     * @return array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveAnimalAll()
    {
        $animals = R::getAll('select * from animal');

        return $animals;
    }

    /**
     * Obtiene todos los animales según su tipo.
     *
     * @return array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveAnimalByType()
    {
        $animals = R::getAll( 'SELECT * FROM animal WHERE type = :type',
        [':type' => $this->getType()]);

        return $animals;
    }

    /**
     * Obtiene todos los animales según su estado de adopición.
     *
     * @return array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveAnimalByStatus()
    {
        $animals = R::getAll( 'SELECT * FROM animal WHERE status = :status',
        [':status' => $this->getStatus()]);
        return $animals;
    }

    /**
     * Obtiene todos los animales adoptados por un usuario en concreto
     *
     * @return array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveAnimalByUser()
    {
        $animals = R::getAll( 'SELECT * FROM animal WHERE user_id = :user_id',
        [':user_id' => $this->getUserId()]);

        return $animals;
    }

    /**
     * Obtiene todos los animales de la base de datos en función a los parámetros pasados.
     *
     * @param  array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
     * @return array $animals array de Animal multidimensional recogido de la base de datos
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
     * Actualiza un animal de la base de datos.
     *
     * @param int    $id             ID del animal
     * @param Animal $updated_animal animal con los datos actualizados
     */
    public function updateAnimal($adopta)
    {
        $oldAnimal = R::load('animal', $this->getId());

        $oldAnimal->name          = $this->getName();
        $oldAnimal->type          = $this->getType();
        $oldAnimal->breed         = $this->getBreed();
        $oldAnimal->gender        = $this->getGender();
        $oldAnimal->size          = $this->getSize();
        $oldAnimal->birth_date    = $this->getBirthDate();
        $oldAnimal->entrance_date = $this->getEntranceDate();
        $oldAnimal->adoption_date = $this->getAdoptionDate();
        $oldAnimal->status        = $this->getStatus();
        $oldAnimal->description   = $this->getDescription();

        if ($adopta) {
            $oldAnimal->user = R::load('user', $this->getUserId());
        }

        R::store($oldAnimal);
    }

    public function updateImages($id, $animalImage)
    {
        $animal = R::load('animal', $id);

        $images        = R::dispense('images');
        $images->image = $animalImage;

        $animal->ownImagesList[] = $images;

        R::store($animal);
    }

    /**
     * Borra un animal de la base de datos.
     */
    public function deleteAnimal()
    {
        R::trash($this);
    }

    /**
     * Obtiene todos los animales de la base de datos en función a unos parámetros.
     *
     * @param  array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
     * @return array $users array de user obtenido de la bbdd
     */
    public function getSpecificAnimal($params)
    {
    }

    /**
     * Marca un animal como adoptado y le asigna un usuario.
     *
     * @param User $user usuario adoptante
     */
    public function adoptAnimal($user)
    {
        $animal         = R::findOne('animal', 'id=?', $this->getId());
        $animal->idUser = $user->getId();
        $animal->status = 'adopted';

        R:store($animal);
    }

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
     * @return self
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
     * @return self
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
     * @return self
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
     * @return self
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
     * @return self
     */
    public function setGender($gender)
    {
        $this->_gender = $gender;

        return $this;
    }

    /**
     * Get the value of _gender
     */
    public function getSize()
    {
        return $this->_size;
    }

    /**
     * Set the value of _gender
     *
     * @return self
     */
    public function setSize($size)
    {
        $this->_size = $size;

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
     * @return self
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
     * @return self
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
     * @return self
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
     * @return self
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
     * @return self
     */
    public function setDescription($description)
    {
        $this->_description = $description;

        return $this;
    }

    /**
     * Get the value of _idUser
     */
    public function getUserId()
    {
        return $this->_userId;
    }

    /**
     * Set the value of _id
     *
     * @return self
     */
    public function setUserId($userId)
    {
        $this->_userId = $userId;

        return $this;
    }
}
