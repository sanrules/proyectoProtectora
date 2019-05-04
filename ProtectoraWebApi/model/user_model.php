<?php

require '../lib/RedBeanPHP5_3/rb.php';
include '../lib/ChromePhp.php';

R::setup('mysql:host=localhost;dbname=test',
    'root', '');
/**
 * Inserta un usuario en la base de datos
 * @param User $new_user Usuario
 */
function insert_user($new_user)
{
    $user = R::dispense('user');
    // TODO comprobar si funciona esta inserción o si tiene que ser parámetro a parámetro
    $user = $new_user;
    // $user->user_name = $new_user->user_name;
    // $user->password = $this->password;
    // $user->name = $new_user->name;
    // $user->surname = $new_user->surname;
    // $user->adress = $new_user->adress;
    // $user->email = $new_user->email;
    // $user->phone = $new_user->phone;
    // $user->birth_date = $new_user->birth_date;
    // $user->type = $new_user->type;
    // $user->photo = $new_user->photo;

    // TODO validaciones si existe el usuario ?
    $id = R::store($user);
}

// Comprueba la función
function prueba()
{
    $user       = R::dispense('user');
    $user->name = 'prueba';
    $id         = R::store($user);

}

/**
 * Obtiene un usuario de la base de datos en base a su id
 * @param int $id ID del usuario
 * @return User $user usuario recogido de la base de datos
 */
function retrieve_user($id)
{
    $user = R::load('user', $id);

    return $user;
}

/**
 * Actualiza un usuario de la base de datos
 * @param int $id ID del usuario
 * @param User $updated_user usuario con los datos actualizados
 */
function update_user($id, $updated_user)
{
    $old_user = R::load('user', $id);
    $old_user = $updated_user;

    R::store($old_user);
}

/**
 * Borra un usuario de la base de datos
 * @param User $user usuario a borrar
 */
function delete_user($user)
{
    R::trash($user);
}
