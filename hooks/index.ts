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

import { useState } from "react";

const useHome = () => {
  const [birthdayDay, setBirthdayDay] = useState(0);
  const [errorBirthdayDay, setErrorBirthdayDay] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState(0);
  const [errorBirthdayMonth, setErrorBirthdayMonth] = useState("");
  const [birthdayYear, setBirthdayYear] = useState(0);
  const [errorBirthdayYear, setErrorBirthdayYear] = useState("");

  const [age, setAge] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);

  /*Validación de edad del usuario*/
  const submit = () => {
    //El siguiente fragmento de codigo lo uso para igualar la fecha de nacimiento con la fecha de hoy del usuario
    let d = new Date(),
      month = 0 + (d.getMonth() + 1),
      day = 0 + d.getDate(),
      year = d.getFullYear();

    const today = new Date(year, month, day);
    const birthday = new Date(birthdayYear, birthdayMonth, birthdayDay);
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

    setAge(age);
    setMonths(months);
    setDays(days);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let today = new Date();
    let birthDate = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);
    let valid = true;

    // Validar campos vacíos
    if (birthdayDay === 0 || birthdayMonth === 0 || birthdayYear === 0) {
      setErrorBirthdayDay("This field is required");
      setErrorBirthdayMonth("This field is required");
      setErrorBirthdayYear("This field is required");
      valid = false;
    }

    // Validar que la fecha sea válida
    if (birthdayDay !== birthDate.getDate() && birthdayDay !== 0) {
      setErrorBirthdayDay("Must be a valid date.");
      valid = false;
    }

    // Validar rango de días
    if (birthdayDay > 31) {
      setErrorBirthdayDay("Must be a valid day.");
      valid = false;
    }

    // Validar rango de meses
    if (birthdayMonth !== 0 && (birthdayMonth < 1 || birthdayMonth > 12)) {
      setErrorBirthdayMonth("Must be a valid month.");
      valid = false;
    }

    // Validar que el año no sea mayor al actual
    if (birthdayYear > today.getFullYear()) {
      setErrorBirthdayYear("Must be in the past.");
      valid = false;
    }

    // Si todo es válido, enviar formulario
    if (valid) {
      setErrorBirthdayDay("");
      setErrorBirthdayMonth("");
      setErrorBirthdayYear("");
      submit();
    }
  };

  return {
    handleSubmit,
    errorBirthdayDay,
    errorBirthdayMonth,
    errorBirthdayYear,
    submit,
    birthdayDay,
    setBirthdayDay,
    birthdayMonth,
    setBirthdayMonth,
    birthdayYear,
    setBirthdayYear,
    age,
    months,
    days,
  };
};

export default useHome;
