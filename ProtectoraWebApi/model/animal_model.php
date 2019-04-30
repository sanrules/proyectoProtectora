<?php

require '../lib/RedBeanPHP5_3/rb.php';
R::setup('mysql:host=localhost;dbname=test',
    'root', '');

/**
 * Inserta un animal en la base de datos
 * y devuelve true o false en función de si se inserta o no
 * @param Animal $new_animal Nuevo animal a insertar en la base de datos
 * @return boolean $inserted true si se ha insertado correctamente, false si ha habido errores
 */
function insert_animal($new_animal)
{
    $animal   = R::dispense('animal');
    $inserted = false;
    // FIXME comprobar si funciona esta inserción o si tiene que ser parámetro a parámetro
    $animal = $new_animal;

    // $animal->name = $this->name;
    // $animal->type = $this->type;
    // $animal->breed = $this->breed;
    // $animal->gender = $this->gender;
    // $animal->birth_date = $this->birth_date;
    // $animal->entrance_date = $this->entrance_date;
    // $animal->adoption_date = $this->adoption_date;
    // $animal->status = $this->status;
    // $animal->description = $this->description;
    // $animal->pictures = $this->pictures;

    // TODO validaciones si existe el animal ?
    // FIXME comprobar si esto funciona
    try {
        $id       = R::store($animal);
        $inserted = true;
    } catch (Exception $e) {
        $inserted = false;
    }

    return $inserted;
}

/**
 * Obtiene un animal de la base de datos en base a su id
 * @param int $id ID del animal
 * @return Animal $animal animal recogido de la base de datos
 */
function retrieve_animal($id)
{
    $animal = R::load('animal', $id);

    return $animal;
}

/**
 * Actualiza un animal de la base de datos
 * @param int $id ID del animal
 * @param Animal $updated_animal animal con los datos actualizados
 */
function update_animal($id, $updated_animal)
{
    $old_animal = R::load('animal', $id);
    $old_animal = $updated_animal;

    R::store($old_animal);
}

/**
 * Borra un animal de la base de datos
 * @param Animal $animal animal a borrar
 */
function delete_animal($animal)
{
    R::trash($animal);
}
