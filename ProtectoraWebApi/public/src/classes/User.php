<?php
use PHPMailer\PHPMailer\Exception;

require_once 'lib/RedBean/rb.php';

// ! configuración para mamp
R::setup('mysql:host=localhost;dbname=proyecto', 'root', 'root');

// ! configuración para xampp
//R::setup('mysql:host=localhost;dbname=proyecto', 'root', '');

class User
{
    private $_idUser     = ''; //  idUser
    private $_username   = ''; //  userName
    private $_password   = ''; //  password
    private $_email      = ''; //  email
    private $_name       = ''; // name
    private $_surname    = ''; // surname
    private $_phone      = ''; // phone
    private $_dni        = '';
    private $_birthDate  = ''; // birthDate
    private $_province   = '';
    private $_city       = '';
    private $_postalCode = '';
    private $_street     = ''; // street
    private $_number     = ''; // number
    private $_portal     = ''; // portal
    private $_floor      = ''; // floor
    private $_door       = ''; // door
    private $_userType   = ''; // userType
    private $_token      = ''; // token
    private $_avatar     = ''; // avatar

    public function __construct()
    {
    }

    /**
     * Establece todos los valores de un usuario.
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $name
     * @param string $surname
     * @param string $dni
     * @param string $phone
     * @param date   $bithdate
     * @param string $province
     * @param string $city
     * @param int    $postalcode
     * @param string $street
     * @param int    $number
     * @param string $portal
     * @param string $floor
     * @param string $door
     * @param string $userType
     * @param string $avatar
     */
    public function createUser($username, $password, $email, $name, $surname, $dni, $phone, $birthDate, $province, $city, $postalCode, $street, $number, $portal, $floor, $door, $userType, $avatar)
    {
        $this->setUsername($username);
        $this->setPassword($password);
        $this->setEmail($email);
        $this->setName($name);
        $this->setSurname($surname);
        $this->setPhone($phone);
        $this->setBirthDate($birthDate);
        $this->setStreet($street);
        $this->setNumber($number);
        $this->setPortal($portal);
        $this->setFloor($floor);
        $this->setDoor($door);
        $this->setUserType($userType);
        $this->setProvince($province);
        $this->setCity($city);
        $this->setPostalCode($postalCode);
        $this->setAvatar($avatar);
        $this->setDni($dni);
    }

    /**
     * Inserta un usuario en la base de datos.
     */
    public function insertUser()
    {
        $bbddUser = R::dispense('user');

        $bbddUser->username   = $this->getUsername();
        $bbddUser->password   = $this->getPassword();
        $bbddUser->email      = $this->getEmail();
        $bbddUser->name       = $this->getName();
        $bbddUser->surname    = $this->getSurname();
        $bbddUser->dni        = $this->getDni();
        $bbddUser->phone      = $this->getPhone();
        $bbddUser->birthDate  = $this->getBirthDate();
        $bbddUser->street     = $this->getStreet();
        $bbddUser->number     = $this->getNumber();
        $bbddUser->portal     = $this->getPortal();
        $bbddUser->floor      = $this->getFloor();
        $bbddUser->door       = $this->getDoor();
        $bbddUser->userType   = $this->getUserType();
        $bbddUser->province   = $this->getProvince();
        $bbddUser->city       = $this->getCity();
        $bbddUser->postalCode = $this->getPostalCode();
        $bbddUser->avatar     = $this->getAvatar();

        $id = R::store($bbddUser);

        $this->setIdUser($id);

        // TODO ALMACENAR PASSWORD SEGURA
    }

    /**
     * Obtiene un usuario de la base de datos en base a su email.
     *
     * @param  int $email MAIL del usuario
     * @return User $user usuario recogido de la base de datos
     */
    public function retrieveUserEmail($email)
    {
        $user = R::findOne('user', 'email=?', [$email]);

        return $user;
    }

    /**
     * Obtiene un usuario de la base de datos en base a su id.
     *
     * @param  int $id ID del usuario
     * @return User $user usuario recogido de la base de datos
     */
    public function retrieveUser($id)
    {
        $user = R::load('user', $id);
        return $user;
    }

    /**
     * Obtiene todos los usuarios de la base de datos.
     *
     * @return Array $users array de Animal multidimensional recogido de la base de datos
     */
    public function retrieveUserAll()
    {
        $users = R::getAll('select * from user');

        return $users;
    }

    /**
     * Actualiza un usuario de la base de datos.
     *
     * @param User $updated_user usuario con los datos actualizados
     */
    public function updateUser()
    {
        $oldUser = R::load('user', $this->getIdUser());

        $oldUser->username    = $this->getUsername();
        $oldUser->password    = $this->getPassword();
        $oldUser->email       = $this->getEmail();
        $oldUser->name        = $this->getName();
        $oldUser->surname     = $this->getSurname();
        $oldUser->dni         = $this->getDni();
        $oldUser->phone       = $this->getPhone();
        $oldUser->birth_date  = $this->getBirthDate();
        $oldUser->street      = $this->getStreet();
        $oldUser->number      = $this->getNumber();
        $oldUser->portal      = $this->getPortal();
        $oldUser->floor       = $this->getFloor();
        $oldUser->door        = $this->getDoor();
        $oldUser->province    = $this->getProvince();
        $oldUser->city        = $this->getCity();
        $oldUser->postal_code = $this->getPostalCode();
        $oldUser->user_type   = $this->getUserType();
        $oldUser->avatar      = $this->getAvatar();

        R::store($oldUser);
    }

    /**
     * Actualiza el avatar del usuario para guardarlo en la base de datos.
     *
     * @param User   $user   usuario a actualizar avatar
     * @param string $avatar URL de la imagen del avatar
     */
    public function updateAvatar($id, $avatar)
    {
        $user         = R::findOne('user', 'id=?', [$id]);
        $user->avatar = $avatar;
        R::store($user);
    }

    /**
     * Borra un usuario de la base de datos.
     *
     * @param User $user usuario a borrar
     */
    public function deleteUser($id)
    {
        $user = R::load('user',$id);
        R::trash($user);
    }

    /**
     * Obtiene todos los usuarios de la base de datos en función a unos parámetros.
     *
     * @param  array $params array formato 'key' => nombreDelCampo, 'value' => 'filtro'
     * @return array $users array de user obtenido de la bbdd
     */
    public function getSpecificUser($params)
    {
        $users = R::findOne('user', $params['key'], [$params['value']]);

        return $users;
    }

    public function dniExist()
    {
        try {
            if (R::findOne('user', 'dni=?', [$this->getDni()]) != null) {
                throw new Exception();
            }
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function usernameExist()
    {
        try {
            if (R::findOne('user', 'username=?', [$this->getUsername()]) != null) {
                throw new Exception();
            }
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function emailExist()
    {
        try {
            if (R::findOne('user', 'email=?', [$this->getEmail()]) != null) {
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
     * Get the value of _idUser.
     */
    public function getIdUser()
    {
        return $this->_idUser;
    }

    /**
     * Set the value of _idUser.
     *
     * @return self
     */
    public function setIdUser($_idUser)
    {
        $this->_idUser = $_idUser;

        return $this;
    }

    /**
     * Get the value of _username.
     */
    public function getUsername()
    {
        return $this->_username;
    }

    /**
     * Set the value of _username.
     *
     * @return self
     */
    public function setUsername($_username)
    {
        $this->_username = $_username;

        return $this;
    }

    /**
     * Get the value of _email.
     */
    public function getEmail()
    {
        return $this->_email;
    }

    /**
     * Set the value of _email.
     *
     * @return self
     */
    public function setEmail($email)
    {
        $this->_email = $email;

        return $this;
    }

    /**
     * Get the value of _password.
     */
    public function getPassword()
    {
        return $this->_password;
    }

    /**
     * Set the value of _password.
     *
     * @return self
     */
    public function setPassword($_password)
    {
        $this->_password = $_password;

        return $this;
    }

    /**
     * Get the value of _name.
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * Set the value of _name.
     *
     * @return self
     */
    public function setName($_name)
    {
        $this->_name = $_name;

        return $this;
    }

    /**
     * Get the value of _surname.
     */
    public function getSurname()
    {
        return $this->_surname;
    }

    /**
     * Set the value of _surname.
     *
     * @return self
     */
    public function setSurname($_surname)
    {
        $this->_surname = $_surname;

        return $this;
    }

    /**
     * Get the value of _phone.
     */
    public function getPhone()
    {
        return $this->_phone;
    }

    /**
     * Set the value of _phone.
     *
     * @return self
     */
    public function setPhone($_phone)
    {
        $this->_phone = $_phone;

        return $this;
    }

    /**
     * Get the value of _birthDate.
     */
    public function getBirthDate()
    {
        return $this->_birthDate;
    }

    /**
     * Set the value of _birthDate.
     *
     * @return self
     */
    public function setBirthDate($_birthDate)
    {
        $this->_birthDate = $_birthDate;

        return $this;
    }

    /**
     * Get the value of _street.
     */
    public function getStreet()
    {
        return $this->_street;
    }

    /**
     * Set the value of _street.
     *
     * @return self
     */
    public function setStreet($_street)
    {
        $this->_street = $_street;

        return $this;
    }

    /**
     * Get the value of _number
     */
    public function getNumber()
    {
        return $this->_number;
    }

    /**
     * Set the value of _number
     *
     * @return self
     */
    public function setNumber($_number)
    {
        $this->_number = $_number;

        return $this;
    }

    /**
     * Get the value of _portal
     */
    public function getPortal()
    {
        return $this->_portal;
    }

    /**
     * Set the value of _portal
     *
     * @return self
     */
    public function setPortal($_portal)
    {
        $this->_portal = $_portal;

        return $this;
    }

    /**
     * Get the value of _floor
     */
    public function getFloor()
    {
        return $this->_floor;
    }

    /**
     * Set the value of _floor
     *
     * @return self
     */
    public function setFloor($_floor)
    {
        $this->_floor = $_floor;

        return $this;
    }

    /**
     * Get the value of _door
     */
    public function getDoor()
    {
        return $this->_door;
    }

    /**
     * Set the value of _door
     *
     * @return self
     */
    public function setDoor($_door)
    {
        $this->_door = $_door;

        return $this;
    }

    /**
     * Get the value of _userType
     */
    public function getUserType()
    {
        return $this->_userType;
    }

    /**
     * Set the value of _userType
     *
     * @return self
     */
    public function setUserType($_userType)
    {
        $this->_userType = $_userType;

        return $this;
    }

    /**
     * Get the value of _token
     */
    public function getToken()
    {
        return $this->_token;
    }

    /**
     * Set the value of _token
     *
     * @return self
     */
    public function setToken($_token)
    {
        $this->_token = $_token;

        return $this;
    }

    /**
     * Get the value of _dni
     */
    public function getDni()
    {
        return $this->_dni;
    }

    /**
     * Set the value of _dni
     *
     * @return self
     */
    public function setDni($_dni)
    {
        $this->_dni = $_dni;

        return $this;
    }

    /**
     * Get the value of _province
     */
    public function getProvince()
    {
        return $this->_province;
    }

    /**
     * Set the value of _province
     *
     * @return self
     */
    public function setProvince($_province)
    {
        $this->_province = $_province;

        return $this;
    }

    /**
     * Get the value of _city
     */
    public function getCity()
    {
        return $this->_city;
    }

    /**
     * Set the value of _city
     *
     * @return self
     */
    public function setCity($_city)
    {
        $this->_city = $_city;

        return $this;
    }

    /**
     * Get the value of _postalCode
     */
    public function getPostalCode()
    {
        return $this->_postalCode;
    }

    /**
     * Set the value of _postalCode
     *
     * @return self
     */
    public function setPostalCode($_postalCode)
    {
        $this->_postalCode = $_postalCode;

        return $this;
    }

    /**
     * Get the value of _avatar
     */
    public function getAvatar()
    {
        return $this->_avatar;
    }

    /**
     * Set the value of _avatar
     *
     * @return self
     */
    public function setAvatar($_avatar)
    {
        $this->_avatar = $_avatar;

        return $this;
    }
}
