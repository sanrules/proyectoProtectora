<?php
require_once 'lib/RedBean/rb.php';
require_once 'lib/ChromePhp.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class Comments
{
    private $_id       = 0;
    private $_animalId = 0;
    private $_userId   = 0;
    private $_date     = '';
    private $_text     = '';

    public function __construct()
    {
    }

    /**
     * Crea un comentario nuevo
     *
     * @param int    $animalId  id del animal sobre el que se hace el comentario
     * @param int    $idUsuario id del usuario que hace el comentario
     * @param string $text      cuerpo del comentario
     */

    public function createComment($animalId, $userId, $date, $text)
    {
        $this->_animalId = $animalId;
        $this->_userId   = $userId;
        $this->_date     = $date;
        $this->_text     = $text;
    }

    public function insertComment()
    {
        $comment = R::dispense('comments');

        $comment->animal = R::load('animal', $this->getAnimalId());
        $comment->user   = R::load('user', $this->getUserId());
        $comment->date   = $this->getDate();
        $comment->text   = $this->getText();

        $id = R::store($comment);

        $this->setId($id);
    }

    /**
     * Devuelve todos los comentarios que ha hecho un usuario
     *
     * @param  int $userId id del usuario
     * @return array $comments todos los comentarios para un usuario en concreto
     */
    public function retrieveUserComments($userId)
    {
        $comments = R::getAll("select * from comments where user_id = $userId");

        return $comments;
    }

    /**
     * Devuelve todos los comentarios de un animal en concreto
     *
     * @param  int $animalId id del animal
     * @return array $comments todos los comentarios para un animal en concreto
     */
    public function retrieveAnimalComments($animalId)
    {
        $comments = R::getAll("select * from comments where animal_id = $animalId");
        return $comments;
    }

    /**
     * Obtiene un comentario de la base de datos en base a su id.
     *
     * @param  int $id ID del usuario
     * @return User $user usuario recogido de la base de datos
     */
    public function retrieveComment($id)
    {
        $comment = R::load('comments', $id);
        return $comment;
    }

    /**
     * Actualiza el texto de un comentario de la base de datos
     *
     * @param int    $id   ID del comentario
     * @param string $text con el nuevo texto
     */
    public function updateComment($id, $text)
    {
        $comment       = R::load('comments', $id);
        $comment->text = $text;

        R::store($comment);
    }

    /**
     * Borra un comentario de la base de datos
     *
     * @param int $id id del comentario a borrar
     */
    public function deleteComment($id)
    {
        $comment = R::load('comment', $id);
        R::trash($comment);
    }

    /**
     * Get the value of _text
     */
    public function getText()
    {
        return $this->_text;
    }

    /**
     * Set the value of _text
     *
     * @return self
     */
    public function setText($text)
    {
        $this->_text = $text;

        return $this;
    }

    /**
     * Get the value of _userId
     */
    public function getUserId()
    {
        return $this->_userId;
    }

    /**
     * Set the value of _userId
     *
     * @return self
     */
    public function setUserId($userId)
    {
        $this->_userId = $userId;

        return $this;
    }

    /**
     * Get the value of _animalId
     */
    public function getAnimalId()
    {
        return $this->_animalId;
    }

    /**
     * Set the value of _animalId
     *
     * @return self
     */
    public function setAnimalId($animalId)
    {
        $this->_animalId = $animalId;

        return $this;
    }

    /**
     * Get the value of _date
     */
    public function getDate()
    {
        return $this->_date;
    }

    /**
     * Set the value of _date
     *
     * @return self
     */
    public function setDate($date)
    {
        $this->_date = $date;

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
     * @return self
     */
    public function setId($id)
    {
        $this->_id = $id;

        return $this;
    }
}
