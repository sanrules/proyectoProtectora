<?php
require 'lib/RedBean/rb.php';
require_once 'User.php';

// ! configuración para mamp
// R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class User
{
    private $_idUser    = ''; //  idUser
    private $_username  = ''; //  userName
    private $_password  = ''; //  password
    private $_email     = ''; //  email
    private $_name      = ''; // name
    private $_surname   = ''; // surname
    private $_phone     = ''; // phone
    private $_birthDate = ''; // birthDate
    private $_street    = ''; // street
    private $_number    = ''; // number
    private $_portal    = ''; // portal
    private $_floor     = ''; // floor
    private $_door      = ''; // door
    private $_userType  = ''; // userType
    private $_token     = ''; // token

    public function __construct()
    {

    }

    public function createUser($_username, $_password, $_email, $_name, $_surname, $_phone, $_birthDate, $_street, $_number, $_portal, $_floor, $_door, $_userType)
    {
        $this->_username  = $_username;
        $this->_password  = $_password;
        $this->_email     = $_email;
        $this->_name      = $_name;
        $this->_surname   = $_surname;
        $this->_phone     = $_phone;
        $this->_birthDate = $_birthDate;
        $this->_street    = $_street;
        $this->_number    = $_number;
        $this->_portal    = $_portal;
        $this->_floor     = $_floor;
        $this->_door      = $_door;
        $this->_userType  = $_userType;
    }

    /**
     * Inserta un usuario en la base de datos
     */
    public function insertUser()
    {
        $bbddUser = R::dispense('user');

        $bbddUser->username  = $this->_username;
        $bbddUser->password  = $this->_password;
        $bbddUser->email     = $this->_email;
        $bbddUser->name      = $this->_name;
        $bbddUser->surname   = $this->_surname;
        $bbddUser->phone     = $this->_phone;
        $bbddUser->birthDate = $this->_birthDate;
        $bbddUser->street    = $this->_street;
        $bbddUser->number    = $this->_number;
        $bbddUser->portal    = $this->_portal;
        $bbddUser->floor     = $this->_floor;
        $bbddUser->door      = $this->_door;
        $bbddUser->userType  = $this->_userType;

        $id = R::store($bbddUser);

        $this->_id = $id;

        // TODO ALMACENAR PASSWORD SEGURA

    }

    /**
     * Obtiene un usuario de la base de datos en base a su email
     * @param int $email MAIL del usuario
     * @return User $user usuario recogido de la base de datos
     */
    public function retrieveUserEmail($email)
    {
        $user = R::findOne('user', 'email=?', [$email]);

        return $user;

    }

    /**
     * Obtiene un usuario de la base de datos en base a su id
     * @param int $id ID del usuario
     * @return User $user usuario recogido de la base de datos
     */
    public function retrieveUser($id)
    {
        $user = R::load('user', $id);
        return $user;
    }

    /**
     * Obtiene todos los usuarios de la base de datos
     * @return Array $users array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveUserAll()
    {
        $users = R::getAll('select * from user');

        return $users;
    }

    /**
     * Actualiza un usuario de la base de datos
     * @param int $id ID del usuario
     * @param User $updated_user usuario con los datos actualizados
     */
    public function updateUser($id, $username, $password, $email, $name, $surname, $phone, $birthDate, $street, $number, $portal, $floor, $door, $userType)
    {

        $user = R::load('user', $id);

        $user->username   = $username;
        $user->password   = $password;
        $user->email      = $email;
        $user->name       = $name;
        $user->surname    = $surname;
        $user->phone      = $phone;
        $user->birth_date = $birthDate;
        $user->street     = $street;
        $user->number     = $number;
        $user->portal     = $portal;
        $user->floor      = $floor;
        $user->door       = $door;
        $user->user_type  = $userType;

        R::store($user);
    }

    /**
     * Borra un usuario de la base de datos
     * @param User $user usuario a borrar
     */
    public function deleteUser($user)
    {
        R::setup('mysql:host=localhost;dbname=proyecto',
            'root', '');
        R::trash($user);
    }

    /**
     * Obtiene todos los usuarios de la base de datos en función a unos parámetros.
     * @param array $params array asociativo con todos los parámetros a tener en cuenta. Formato campo => valor.
     * @return array $users array de user obtenido de la bbdd
     */
    public function getSpecificUser($params)
    {

    }

    /*
     *** GETTERS Y SETTERS
     */

    /**
     * Get the value of _idUser
     */
    public function get_idUser()
    {
        return $this->_idUser;
    }

    /**
     * Set the value of _idUser
     *
     * @return  self
     */
    public function set_idUser($_idUser)
    {
        $this->_idUser = $_idUser;

        return $this;
    }

    /**
     * Get the value of _username
     */
    public function get_username()
    {
        return $this->_username;
    }

    /**
     * Set the value of _username
     *
     * @return  self
     */
    public function set_username($_username)
    {
        $this->_username = $_username;

        return $this;
    }

    /**
     * Get the value of _email
     */
    public function get_email()
    {
        return $this->_email;
    }

    /**
     * Set the value of _email
     *
     * @return  self
     */
    public function set_email($_email)
    {
        $this->_email = $_email;

        return $this;
    }

    /**
     * Get the value of _password
     */
    public function get_password()
    {
        return $this->_password;
    }

    /**
     * Set the value of _password
     *
     * @return  self
     */
    public function set_password($_password)
    {
        $this->_password = $_password;

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
     * Get the value of _surname
     */
    public function get_surname()
    {
        return $this->_surname;
    }

    /**
     * Set the value of _surname
     *
     * @return  self
     */
    public function set_surname($_surname)
    {
        $this->_surname = $_surname;

        return $this;
    }

    /**
     * Get the value of _phone
     */
    public function get_phone()
    {
        return $this->_phone;
    }

    /**
     * Set the value of _phone
     *
     * @return  self
     */
    public function set_phone($_phone)
    {
        $this->_phone = $_phone;

        return $this;
    }

    /**
     * Get the value of _birthDate
     */
    public function get_birthDate()
    {
        return $this->_birthDate;
    }

    /**
     * Set the value of _birthDate
     *
     * @return  self
     */
    public function set_birthDate($_birthDate)
    {
        $this->_birthDate = $_birthDate;

        return $this;
    }

    /**
     * Get the value of _street
     */
    public function get_street()
    {
        return $this->_street;
    }

    /**
     * Set the value of _street
     *
     * @return  self
     */
    public function set_street($_street)
    {
        $this->_street = $_street;

        return $this;
    }

    /**
     * Get the value of _number
     */
    public function get_number()
    {
        return $this->_number;
    }

    /**
     * Set the value of _number
     *
     * @return  self
     */
    public function set_number($_number)
    {
        $this->_number = $_number;

        return $this;
    }

    /**
     * Get the value of _portal
     */
    public function get_portal()
    {
        return $this->_portal;
    }

    /**
     * Set the value of _portal
     *
     * @return  self
     */
    public function set_portal($_portal)
    {
        $this->_portal = $_portal;

        return $this;
    }

    /**
     * Get the value of _floor
     */
    public function get_floor()
    {
        return $this->_floor;
    }

    /**
     * Set the value of _floor
     *
     * @return  self
     */
    public function set_floor($_floor)
    {
        $this->_floor = $_floor;

        return $this;
    }

    /**
     * Get the value of _door
     */
    public function get_door()
    {
        return $this->_door;
    }

    /**
     * Set the value of _door
     *
     * @return  self
     */
    public function set_door($_door)
    {
        $this->_door = $_door;

        return $this;
    }

    /**
     * Get the value of _userType
     */
    public function get_userType()
    {
        return $this->_userType;
    }

    /**
     * Set the value of _userType
     *
     * @return  self
     */
    public function set_userType($_userType)
    {
        $this->_userType = $_userType;

        return $this;
    }

    /**
     * Get the value of _token
     */
    public function get_token()
    {
        return $this->_token;
    }

    /**
     * Set the value of _token
     *
     * @return  self
     */
    public function set_token($_token)
    {
        $this->_token = $_token;

        return $this;
    }
}
