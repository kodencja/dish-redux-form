import { defaultOption, getChangeProp } from "../components/DishForm";

// check time format
// 3 groups of 2 character separated by : each character must be a digit contained in that specific ranges
const isValidTime = (time) => {
  let error = "";

  if (time < "00:15:00") {
    error = "We need at least 15 min to prepare the dish!";
  }
  const regexpAll = new RegExp(
    /^([0-9]|0[0-9]|1[0-9]|2[0-3]):((([0-5][0-9]):([0-5][0-9]))|([0-5][0-9]))$/
  );

  return { test: regexpAll.test(time), errorTime: error };
};


export const validate = (value, rest) => {
  const {
    name = "",
    preparation_time = "",
    type = "",
    no_of_slices = "",
    diameter = "",
    spiciness_scale = "",
    slices_of_bread = "",
  } = value;

  const errors = {};
  if (name.trim() === "") {
    errors.name = "Dish name is required!";
  }
  if (preparation_time.trim() === "") {
    errors.preparation_time = "Preparation time is required!";
  }
  if (type.trim() === "" || type === defaultOption) {
    errors.type = "Type is required!";
  }

  // advanced validation - check type of the value (numbers or letters)
  if (rest.registeredFields && rest.registeredFields !== undefined) {
    for (let eachProp in rest.registeredFields) {
      if (value[eachProp] !== undefined && value[eachProp] !== "") {
        let valueWithoutSpaces;
        valueWithoutSpaces = value[eachProp].toString().split(" ").join("");
        if (valueWithoutSpaces === "") {
          errors[eachProp] = `${eachProp} is required`;
        }

        // for alpha characters values
        if (eachProp === "name" || eachProp === "type") {
          if (value[eachProp].length > 30) {
            errors[eachProp] = `Use max 30 characters!`;
          }
          const regLetters = /^[a-zA-Z]+$/gim;

          const ifHasNumbers = regLetters.test(valueWithoutSpaces);
          if (!ifHasNumbers) {
            errors[eachProp] = `Use only letters`;
          }
        }
        // for numeric values
        else {
          if (value[eachProp].length > 10) {
            errors[eachProp] = `The number is too big!`;
          } else if (valueWithoutSpaces === "0" || value[eachProp] <= 0) {
            errors[eachProp] = "The number must exceed 0";
          }

          if (eachProp === "preparation_time") {
            const { test, errorTime } = isValidTime(valueWithoutSpaces);

            if (!test) {
              errors.preparation_time = "Use only numbers in time format";
            }
            if (errorTime !== "") {
              errors.preparation_time = errorTime;
            }
          } else {
            let regNo = /\D/gim;

            if (eachProp === "diameter") {
              regNo = /^[+-]?([0-9]*[.])?[0-9]+$/;
              let ifHasNumbers = regNo.test(valueWithoutSpaces);
              if (!ifHasNumbers) {
                errors[eachProp] = `Use floating no`;
              }
            } else {
              let ifHasNumbers = regNo.test(valueWithoutSpaces);
              if (ifHasNumbers) {
                errors[eachProp] = `Use only integer no`;
              }
            }
          }
        }
      }
    }
  }

  return errors;
};
