<?php
require_once 'lib/RedBean/rb.php';
require 'lib/ChromePhp.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class News
{
    private $_id      = '';
    private $_name    = '';
    private $_content = '';
    private $_date    = '';

    public function __construct()
    {

    }

    /**
     * Crea una noticia.
     *
     * @param  mixed $_name
     * @param  mixed $_idtype
     * @return void
     */
    public function createNews($name, $content, $date)
    {
        $this->_name    = $name;
        $this->_content = $content;
        $this->_date    = $date;
    }

    /**
     * Inserta en base de datos una noticia.
     *
     * @return void
     */
    public function insertNew()
    {
        $news = R::dispense('news');

        $news->name    = $this->_name;
        $news->content = $this->_content;
        $news->date    = $this->_date;

        $id = R::store($news);

        $this->_id = $id;
    }

    /**
     * Obtiene una raza de la base de datos en base a su id.
     *
     * @param  int $id ID del animal
     * @return Animal $animal animal recogido de la base de datos
     */
    public function retrieveNew($id)
    {
        $news = R::load('news', $id);

        return $news;
    }

    /**
     * Obtiene todas las razas de la base de datos.
     *
     * @return Array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveAllNews()
    {
        $news = R::getAll('select * from news');

        return $news;
    }

    /**
     * Obtiene todos las razas de la base de datos en función a los parámetros pasados.
     *
     * @param  array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
     * @return Array $animals array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveNewParams($params)
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
    public function updateNew()
    {
        $oldNew = R::load('news', $this->get_id());

        $oldNew->name          = $this->get_name();
        $oldNew->content       = $this->get_content();
        $oldNew->date          = $this->get_date();
       

        

        R::store($oldNew);
    }

    /**
     * Borra un animal de la base de datos
     *
     * @param Animal $animal animal a borrar
     */
    public function deleteNew($id)
    {
        $new = R::load('news', $id);
        R::trash($new);
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

    /**
     * Get the value of _name
     */
    public function get_content()
    {
        return $this->_content;
    }

    /**
     * Set the value of _name
     *
     * @return self
     */
    public function set_content($_content)
    {
        $this->_content = $_content;

        return $this;
    }

    /**
     * Get the value of _name
     */
    public function get_date()
    {
        return $this->_date;
    }

    /**
     * Set the value of _name
     *
     * @return self
     */
    public function set_date($_date)
    {
        $this->_date = $_date;

        return $this;
    }

}