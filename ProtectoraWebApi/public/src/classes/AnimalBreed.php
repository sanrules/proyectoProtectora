<?php
require_once 'lib/RedBean/rb.php';
include 'lib/ChromePhp.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class AnimalBreed
{
    private $idBreed    = '';
    private $idType = '';
    private $name   = '';

    public function __construct()
    {

    }

    /**
     * Crea una raza de animal.
     *  
     * @param mixed $_name
     * @param mixed $_idtype
     * @return void
     */
    public function createAnimalBreed($_name, $_idtype)
    {
        $this->name   = $_name;
        $this->idType = $_idtype;
    }

    /**
     * Inserta en base de datos una raza de animal.
     *
     * @return void
     */
    public function insertAnimalBreed()
    {
        $animalBreed = R::dispense('animalbreed');

        $animalBreed->name   = $this->_name;
        $animalBreed->idType = $this->_idtype;

        $id        = R::store($animalBreed);
        $this->_id = $id;
    }

/**
 * Obtiene una raza de la base de datos en base a su id.
 *
 * @param int $id ID del animal
 * @return Animal $animal animal recogido de la base de datos
 */
    public function retrieveAnimalBreedsByIdType($idtype)
    {
        $animalBreeds = R::getAll("select * from animalBreed where idtype = $idtype");
        return $animalBreeds;
    }

/**
 * Obtiene todas las razas de la base de datos.
 *
 * @return Array $animals array de Animal multidimensional recogido de la base de datos
 */
    public function retrieveAnimalBreedsAll()
    {
        $animalBreeds = R::getAll('select * from animalbreed');

        return $animalBreeds;
    }

/**
 * Obtiene todos las razas de la base de datos en función a los parámetros pasados.
 *
 * @param array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
 * @return Array $animals array de Animal multidimensional recogido de la base de datos
 */
    public function retrieveAnimalTypeParams($params)
    {
        $num = count($params);
        $sql = "SELECT * FROM animal WHERE ";

        foreach ($params as $field => $value) {
            --$num;
            $sql .= " $field = $value ";
            $sql .= $num != 0 ? ' AND ' : ' ;';
        }

        $animalTypes = R::find($sql);

        return $animalTypes;
    }

/**
 * Actualiza un animal de la base de datos
 * @param int $id ID del animal
 * @param Animal $updated_animal animal con los datos actualizados
 */
    public function updateAnimalBreed($id, $updated_animalBreed)
    {
        $old_animalBreed = R::load('animalbreed', $id);
        $old_animalBreed = $updated_animalBreed;

        R::store($old_animalBreed);
    }

/**
 * Borra un animal de la base de datos
 * @param Animal $animal animal a borrar
 */
    public function deleteAnimalBreed($animalBreed)
    {
        R::trash($animalBreed);
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
        return $this->idBreed;
    }

    /**
     * Set the value of _id
     *
     * @return  self
     */
    public function set_id($_idBreed)
    {
        $this->$idBreed = $_idBreed;

        return $this;
    }

    /**
     * Get the value of _idUser
     */
    public function get_idType()
    {
        return $this->idType;
    }

    /**
     * Set the value of _id
     *
     * @return  self
     */
    public function set_idType($_idType)
    {
        $this->idType = $_idType;

        return $this;
    }

    /**
     * Get the value of _name
     */
    public function get_name()
    {
        return $this->name;
    }

    /**
     * Set the value of _name
     *
     * @return  self
     */
    public function set_name($_name)
    {
        $this->name = $_name;

        return $this;
    }

}
