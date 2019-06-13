<?php
/**
 * Fichero con FUNCIONES AUXILIARES, VALIDACIONES, COMPROBACIONES, CONVERSIONES
 * que tratan datos genéricos y son susceptibles de ser usadas en más de una ocasión
 */

/**
 * Comprueba si una fecha está en un formato válido y además existe en el calendario
 *
 * @param  date $date fecha en formato j/m/Y
 * @return boolean $valid true si el formato es válido y existe, false si no
 */
function validate_date($date)
{
    $valid      = false;
    $valid_hour = false;
    ChromePhp::log('PHP: Entra en validate_date() $postdata:');
    ChromePhp::log('PHP: validate_date() $date: ', $date);
    // Comprobamos que el formato sea el correcto (j/m/Y)
    if (strpos($date, '-') !== false) {
        if (strpos($date, ' ') !== false) {
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
    ChromePhp::log('PHP: validate_date() $valid: ', $valid);
    return $valid;
}

function generateToken()
{
    $result = uniqid();
    return $result;
}
