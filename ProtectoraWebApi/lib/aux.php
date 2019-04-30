<?php

/**
 * FICHERO CON FUNCIONES AUXILIARES
 * VALIDACIONES
 * COMPROBACIONES
 * CONVERSIONES
 */

/** Comprueba si una fecha está en un formato válido y además existe en el calendario */
function validate_date($date)
{
    $valid      = false;
    $valid_hour = false;

    // Comprobamos que el formato sea el correcto (j/m/Y)
    if (sistr($date, '/')) {
        if (sistr($date, ' ')) {
            // Si tiene minutos y segundos se toma solo la parte del día
            $date  = explode(' ', $date)[0];
            $ahour = explode(':', $date[1]);

            // Validamos que haya hora y minutos y que estén en los valores correctos
            $valid_hour = (count($ahour == 2) && ($ahour[0] < 60 && $ahour[0] >= 0) && ($ahour[1] < 60 && $ahour[1] >= 0)) ? true : false;
        } else {
            // Si no existe hora, ponemos la validación de la misma a true
            $valid_hour = true;
        }
        $adate = explode('/', $date);

        // Comprobamos que existe en el calendario
        $valid = (count($adate) == 3 && checkdate($adate[1], $adate[0], $adate[2])) && valid_hour ? true : false;
    }

    return $valid;
}
