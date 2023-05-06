/*
Sus usuarios deben poder: 

- Ver una edad en años, meses y días tras introducir una fecha válida a través de 
el formulario
- Recibir errores de validación si:
  - Cualquier campo está vacío al enviar el formulario
  - El número del día no está entre 1-31
  - El número del mes no está entre 1-12
  - El año está en el futuro
  - La fecha no es válida, por ejemplo, 31/04/1991 (abril tiene 30 días).
- Ver el diseño óptimo de la interfaz en función del tamaño de la pantalla del 
dispositivo.
- Ver los estados "hover" y "focus" de todos los elementos interactivos de la página
- **Bonus**: Ver los números de edad animados a su número final cuando el formulario 
se envía

Traducción realizada con la versión gratuita del traductor www.DeepL.com/Translator
*/

import { useEffect, useState } from "react";

const useHome = () => {
  /*Validación de edad del usuario*/
  const submit = (
    birthYear: number,
    birthMonth: number,
    birthdayDay: number
  ) => {
    //El siguiente fragmento de codigo lo uso para igualar la fecha de nacimiento con la fecha de hoy del usuario
    let d = new Date(),
      month = 0 + (d.getMonth() + 1),
      day = 0 + d.getDate(),
      year = d.getFullYear();

    const today = new Date(year, month, day);
    const birthday = new Date(birthYear, birthMonth, birthdayDay);
    //Calculamos años
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    // calculamos los meses
    let months = 0;
    if (today.getMonth() > birthday.getMonth()) {
      months = today.getMonth() - birthday.getMonth();
    } else if (today.getMonth() < birthday.getMonth()) {
      months = 12 - (birthday.getMonth() - today.getMonth());
    } else if (
      today.getMonth() == birthday.getMonth() &&
      today.getDate() > birthday.getDate()
    ) {
      if (today.getMonth() - birthday.getMonth() == 0) {
        months = 0;
      } else {
        months = 11;
      }
    }
    // Obtener días: día actual - día de cumpleaños
    let days = today.getDate() - birthday.getDate();
    if (days < 0) {
      // Si días es negativo, día actual es mayor al de cumpleaños,
      // hay que restar 1 mes, si resulta menor que cero, poner en 11
      months = months - 1 < 0 ? 11 : months - 1;
      // Y obtener días faltantes
      days = 30 + days;
    }

    console.log(birthYear, birthMonth, birthdayDay);
    console.log(year, month, day);
    console.log(age);
    console.log(months);
    console.log(days);
  };

  return {
    submit,
  };
};

export default useHome;
