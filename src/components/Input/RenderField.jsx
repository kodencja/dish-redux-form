import React, { useContext } from "react";
import { DishContext } from "../Main/Main";
import { Field } from "redux-form";

const RenderField = ({ no_of_inputs, add_class, ...rest_props }) => {
  const dishContext = useContext(DishContext);

  const { addToInputDivRef } = dishContext;

  return no_of_inputs === 1 ? (
    <div className="mrg-x-auto narrow">
      <div className="input-cont">
        <div className={"trans " + add_class} ref={addToInputDivRef}>
          <Field {...rest_props} />
        </div>
      </div>
    </div>
  ) : (
    <Field {...rest_props} />
  );
};

export default RenderField;
