import { defaultOption } from "../components/Form/DishForm";

// check time format
// 3 groups of 2 character separated by : each character must be a digit contained in that specific ranges
const isValidTime = (time) => {
  let error = "";

  if (time.length < 8) {
    time = time + ":00";
  }

  if (time < "00:15:00") {
    error = "We need at least 15 min to prepare the dish!";
  }
  const regexpAll = new RegExp(
    /^([0-9]|0[0-9]|1[0-9]|2[0-3]):((([0-5][0-9]):([0-5][0-9]))|([0-5][0-9]))$/
  );

  return { test: regexpAll.test(time), errorTime: error };
};


export const validate = (value, rest) => {
  // console.log("validate Fn");
  // console.log(value);
  const {
    name = "",
    preparation_time = "",
    type = "",
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
      // console.log(eachProp);
      // console.log(value[eachProp]);
      if(value[eachProp] === undefined && eachProp !== "name" && eachProp !== "preparation_time" && eachProp !== "type" ){
        errors[eachProp] = `This field is required`;
      } else if (value[eachProp] !== undefined && value[eachProp] !== "") {
        let valueWithoutSpaces;
        valueWithoutSpaces = value[eachProp].toString().split(" ").join("");
        // console.log(valueWithoutSpaces);

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
          if (valueWithoutSpaces.length > 10) {
            errors[eachProp] = `The number is too big!`;
          } else if (valueWithoutSpaces === "0" || value[eachProp] <= 0) {
            errors[eachProp] = "The number must exceed 0";
          } else {
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
                // console.log(ifHasNumbers);
                if (ifHasNumbers) {
                  errors[eachProp] = `Use only integer no`;
                }
              }
            }
          }


        }
      }
    }
  }

  return errors;
};
