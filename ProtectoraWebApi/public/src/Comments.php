<?php
require_once 'lib/RedBean/rb.php';
include 'lib/ChromePhp.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
// R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Comment
{
    private $_id = 0;
    private $_idAnimal = 0;
    private $_idUsuario = 0;
    private $_text = '';

    public function __construct()
    { }

    /**
     * Crea un comentario nuevo
     * @param int $idAnimal id del animal sobre el que se hace el comentario
     * @param int $idUsuario id del usuario que hace el comentario
     * @param string $text cuerpo del comentario
     */

    public function createComment($idAnimal, $idUsuario, $text)
    {
        $this->_idAnimal = $idAnimal;
        $this->_idUsuario = $idUsuario;
        $this->_text = $text;
    }

    public function insertComment()
    {
        $comment = R::dispense('comment');

        $comment->idAnimal = $this->getIdAnimal();
        $comment->idUser = $this->getIdUser();
        $comment->text = $this->getText();

        $id = R::store($comment);
        $this->setId($id);
    }

    /**
     * Devuelve todos los comentarios que ha hecho un usuario
     * @param int $idUser id del usuario
     * @return array $comments todos los comentarios para un usuario en concreto
     */
    public function retrieveCommentsUser(
        $idUser
    ) {
        $comments = R::getAll("select * from comment where idUser = $idUser");

        return $comments;
    }

    /**
     * Devuelve todos los comentarios de un animal en concreto
     * @param int $idAnimal id del animal
     * @return array $comments todos los comentarios para un animal en concreto
     */
    public function retrieveCommentsAnimal(
        $idAnimal
    ) {
        $comments = R::getAll("select * from comment where idUser = $idAnimal");

        return $comments;
    }

    /**
     * Get the value of _text
     */
    public function getComment()
    {
        return $this->_text;
    }

    /**
     * Set the value of _text
     *
     * @return  self
     */
    public function setComment($text)
    {
        $this->_text = $text;

        return $this;
    }

    /**
     * Get the value of _idUsuario
     */
    public function getIdUsuario()
    {
        return $this->_idUsuario;
    }

    /**
     * Set the value of _idUsuario
     *
     * @return  self
     */
    public function setIdUsuario($idUsuario)
    {
        $this->_idUsuario = $idUsuario;

        return $this;
    }

    /**
     * Get the value of _idAnimal
     */
    public function getIdAnimal()
    {
        return $this->_idAnimal;
    }

    /**
     * Set the value of _idAnimal
     *
     * @return  self
     */
    public function setIdAnimal($idAnimal)
    {
        $this->_idAnimal = $idAnimal;

        return $this;
    }

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
     * @return  self
     */
    public function setId($id)
    {
        $this->_id = $id;

        return $this;
    }
}
