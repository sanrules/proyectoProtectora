import { AbstractControl } from '@angular/forms';

export function ValidateDni(control: AbstractControl) {

  const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const regExp = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  const str = control.toString().toUpperCase();

  if (!regExp.test(str)) {
    return false;
  }

  const nie = str
  .replace(/^[X]/, '0')
  .replace(/^[Y]/, '1')
  .replace(/^[Z]/, '2');

  const letter = str.substr(-1);
  const charIndex = +nie.substr(0, 8) % 23;

  if (validChars.charAt(charIndex) === letter) {
    console.log('dniValidator: OK');
    return null;
  }

  return {validDni: true};

}
