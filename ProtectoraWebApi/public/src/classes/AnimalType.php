<?php
require_once 'lib/RedBean/rb.php';
require 'lib/ChromePhp.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class AnimalType
{
    private $_id   = '';
    private $_name = '';

    public function __construct()
    {

    }

    public function createAnimalType($_name)
    {
        $this->_name = $_name;

    }

    public function insertAnimalType()
    {
        $animalType = R::dispense('animaltype');

        $animalType->name = $this->_name;

        $id = R::store($animalType);

        $this->_id = $id;
    }

    /**
     * Obtiene un animal de la base de datos en base a su id
     *
     * @param  int $id ID del animal
     * @return Animal $animal animal recogido de la base de datos
     */
    public function retrieveAnimalType()
    {
        $type = R::load('animaltype', $this->get_id());

        return $type;
    }

    /**
     * Obtiene todos los animales de la base de datos
     *
     * @return Array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveAnimalTypesAll()
    {
        $animalTypes = R::getAll('select * from animaltype');

        return $animalTypes;
    }

    /**
     * Obtiene todos los animales de la base de datos en función a los parámetros pasados
     *
     * @param  array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
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
     *
     * @param int    $id             ID del animal
     * @param Animal $updated_animal animal con los datos actualizados
     */
    public function updateAnimalType()
    {

            $old_animalType = R::load('animaltype', $this->get_id());
    
            $old_animalType->name          = $this->get_name();
        
    
            R::store($old_animalType);
        
    }

    /**
     * Borra un animal de la base de datos
     *
     * @param Animal $animal animal a borrar
     */
    public function deleteAnimalType($animalType)
    {
        R::trash($animalType);
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

    public function animalTypeExist()
    {
        try {
            if (R::findOne('animaltype', 'name=?', [$this->get_name()]) != null) {
                throw new Exception();
            }
        } catch (Exception $e) {
            throw $e;
        }
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
     * @return self
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
     * @return self
     */
    public function set_name($_name)
    {
        $this->_name = $_name;

        return $this;
    }

}
