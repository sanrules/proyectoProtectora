<?php
require_once 'lib/RedBean/rb.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Images
{
    private $_id       = 0;
    private $_url      = '';
    private $_animalId = 0;

    public function __construct()
    {
    }

    /**
     * Inserta una imagen
     *
     * @param int $animalId id del animal sobre el que se hace el comentario
     * @param int $idUsuario id del usuario que hace el comentario
     * @param string $text cuerpo del comentario
     */

    /*     public function createComment($animalId, $userId, $date ,$text)
    {
    $this->_animalId = $animalId;
    $this->_userId = $userId;
    $this->_date = $date;
    $this->_text = $text;
    } */

    public function insertImage()
    {
        $image = R::dispense('image');

        $image->animal = R::load('animal', $this->getAnimalId());
        $image->url    = $this->getUrl();

        $id = R::store($image);

        $this->setId($id);
    }

    /**
     * Devuelve todas las imagenes de un animal en concreto
     *
     * @param  int $animalId id del animal
     * @return array $images todas las imágenes para un animal en concreto
     */
    public function retrieveAnimalImages($animalId)
    {
        $images = R::getAll("select * from images where animal_id = $animalId");
        return $images;
    }

    /**
     * Borra una imagen de la base de datos
     *
     * @param int $id id de la imagen a borrar
     */
    public function deleteImage($id)
    {
        $image = R::load('images', $id);
        R::trash($image);
    }

    /*
     *** GETTERS Y SETTERS
     */

    /**
     * Get the value of _id
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
     * Get the value of _id
     */
    public function getUrl()
    {
        return $this->_url;
    }

    /**
     * Set the value of _url
     *
     * @return self
     */
    public function setUrl($url)
    {
        $this->_url = $url;

        return $this;
    }

    /**
     * Get the value of _id
     */
    public function getAnimalId()
    {
        return $this->_animalId;
    }

    /**
     * Set the value of _id
     *
     * @return self
     */
    public function setAnimalId($animalId)
    {
        $this->_animalId = $animalId;

        return $this;
    }

}
