import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { defaultOption } from "./DishForm";
import { createInputTag } from "./inputTag";

const Input = createInputTag((input, meta, custom) => {
  const options = useMemo(() => {
    if (custom.dishes_opt && custom.dishes_opt !== undefined) {
      return custom.dishes_opt.map((name, ind) => {
        if (name === "default") {
          return (
            <option defaultValue hidden key={ind}>
              {defaultOption}
            </option>
          );
        } else {
          return (
            <option value={name} key={ind}>
              {name}
            </option>
          );
        }
      });
    }
  }, []);

  if (custom.tagtype === "select") {
    return (
      <custom.tagtype {...input} {...custom}>
        {custom.dishes_opt ? options : null}
      </custom.tagtype>
    );
  } else if (custom.tagtype === "input" && custom.type === "range") {
    return (
      <>
        <custom.tagtype {...input} {...custom} />
        <output
          className="bubble"
          style={custom.left_styling}
          htmlFor={input.name}
        >
          {input.value}
        </output>
      </>
    );
  } else {
    return <custom.tagtype {...input} {...custom} />;
  }
});

Input.propTypes = {
  defaultOption: PropTypes.string,
  options: PropTypes.node,
  createInputTag: PropTypes.func,
};

export default Input;
