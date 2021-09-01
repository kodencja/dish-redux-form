import React, { useEffect, useContext } from "react";
import PropTypes, { exact } from "prop-types";
import { DishContext } from "./Main";
import { Field, reduxForm, SubmissionError, reset } from "redux-form";
import Input from "./Input";
import RenderField from "./RenderField";
import { validate } from "../functions/validation";
import { sendToServer } from "../functions/onSubmit";

export const defaultOption = "Select an option";

const startlValues = {
  name: undefined,
  preparation_time: "00:15:00",
  type: defaultOption,
};

export const getChangeProp = (change) => {
  return change;
};

const DishForm = (props) => {
  const dishContext = useContext(DishContext);
  const {
    dishState,
    formRdx,
    setType,
    ifTypeChanged,
    setFinalResp,
    resetDishState,
    setWelcome,
    checkIfAnyChangeMade,
    addToInputDivRef,
    inputDivRef,
    btnRef,
  } = dishContext;

  const {
    handleSubmit,
    initialize,
    submitting,
    submitFailed,
    submitSucceeded,
    initialValues,
  } = props;

  const { finalResponse } = dishState;

  useEffect(() => {
    initialize(startlValues);
  }, []);

  useEffect(() => {
    // console.log("formRdx");
    // console.log(formRdx);
    // console.log("submitting: ", submitting);
    // console.log("submitFailed: ", submitFailed);
    // console.log("submitSucceeded: ", submitSucceeded);
  });

  useEffect(() => {
    if (
      formRdx !== undefined &&
      formRdx.values !== undefined &&
      formRdx.values.type &&
      !dishState.ifTypeWasSetFirstTime
    ) {
      setType(true);
    }
  }, [dishState.anyChangeMade]);

  const finalTimeValidation = (time) => {
    if (time.length < 8) {
      time = time + ":00";
      return time;
    }
    return time;
  };

  const choosePropsToSend = (formData) => {
    return new Promise((resolve, reject) => {
      const timeChecked = finalTimeValidation(formData.preparation_time);

      const constProps = {
        name: formData.name,
        preparation_time: timeChecked,
        type: formData.type,
      };
      let dataToSend = {};
      if (formData.type === "pizza") {
        dataToSend = {
          ...constProps,
          diameter: formData.diameter,
          no_of_slices: formData.no_of_slices,
        };
      } else if (formData.type === "soup") {
        dataToSend = {
          ...constProps,
          spiciness_scale: formData.spiciness_scale,
        };
      } else {
        dataToSend = {
          ...constProps,
          slices_of_bread: formData.slices_of_bread,
        };
      }
      resolve(dataToSend);
    });
  };

  const sendData = (formData) => {
    return new Promise(async (resolve, reject) => {
      setFinalResp("Wait...");
      // console.log("formData");
      // console.log(formData);
      // console.log("formRdx");
      // console.log(formRdx);

      const reviseDataBeforeSend = await choosePropsToSend(formData);

      sendToServer(reviseDataBeforeSend, dishState.url)
        .then(
          (res) => {
            setFinalResp("Your order has been sent successfully!");
            setWelcome("Thank you!");
            console.log(res);
            // resetForm();
            // reset("formRdx");
            console.log("initialize startlValues");
            initialize(startlValues);
            checkIfAnyChangeMade(false);
            resolve();
          },
          (err) => {
            throw err;
          }
        )
        .catch((err) => {
          console.log(err);
          setFinalResp(err);
          reject(new SubmissionError(err));
        });
    });
  };

  const getReplyClasses = () => {
    let classes = "reply ";
    classes += submitting
      ? "wait"
      : !submitting && submitSucceeded
      ? "fine"
      : !submitting && submitFailed
      ? "bad"
      : "";
    return classes;
  };

  const typeOnChange = (e) => {
    watchForStartChangeMade();
    // create new inputDivRef array with three inputDivRefs as constant elements
    let inputsDivRef_copy = inputDivRef.current.slice(0, 3);
    inputDivRef.current = [];
    inputDivRef.current = inputsDivRef_copy;

    if (e.target.value === "soup" && !formRdx.values.spiciness_scale) {
      initialize({ ...formRdx.values, spiciness_scale: 1 });
    }
    setTimeout(() => {
      ifTypeChanged(true);
    }, 50);
  };

  const watchForStartChangeMade = () => {
    if (!dishState.anyChangeMade) {
      console.log("resetDishState");
      resetDishState();
      checkIfAnyChangeMade(true);
    }
  };

  const checkInteger = (val) => {
    if (!val || val === "0") {
      return val;
    } else {
      return Number(val);
    }
  };

  const checkFloat = (val, prevVal) => {
    if (!val || val === "0") {
      return val;
    } else {
      return parseFloat(val);
    }
  };

  return (
    <form id="dishes-form" onSubmit={handleSubmit(sendData)}>
      <div className="row center">
        <div className="input-cont">
          <div
            className="hide-left narrow-70 mrg-x-auto trans"
            ref={addToInputDivRef}
          >
            <Field
              name="name"
              label="Dish name"
              type="text"
              id="name"
              tagtype="input"
              aria-label="name"
              className="form-control"
              placeholder="Write dish name"
              component={Input}
              required={true}
              onChange={watchForStartChangeMade}
            />
          </div>
        </div>
        <div className="input-cont">
          <div
            className="trans hide-right narrow-70 mrg-x-auto"
            ref={addToInputDivRef}
          >
            <Field
              name="preparation_time"
              label="Preparation time"
              type="time"
              tagtype="input"
              id="preparation_time"
              className="form-control"
              step={1}
              aria-label="preparation_time"
              min="00:15:00"
              max="23:59:59"
              pattern={"[0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]"}
              component={Input}
              required={true}
              onChange={watchForStartChangeMade}
            />
          </div>
        </div>

        <div className="input-cont">
          <div
            className="hide-up narrow-70 mrg-x-auto trans"
            ref={addToInputDivRef}
          >
            <Field
              name="type"
              label="Type"
              tagtype="select"
              dishes_opt={["default", "pizza", "soup", "sandwich"]}
              component={Input}
              aria-label="type"
              id="type"
              className="form-control form-control-lg"
              required
              onChange={typeOnChange}
            />
          </div>
        </div>

        {formRdx !== undefined &&
        formRdx.values !== undefined &&
        formRdx.values.type ? (
          formRdx.values.type === "pizza" ? (
            <div className="mrg-x-auto">
              <div className="input-cont">
                <div
                  className="flex justify-center align-start hide-up trans"
                  ref={addToInputDivRef}
                >
                  <RenderField
                    tagtype="input"
                    label="No of slices"
                    name="no_of_slices"
                    type="number"
                    id="no_of_slices"
                    className="form-control"
                    aria-label="no_of_slices"
                    required={
                      dishState.ifTypeWasSetFirstTime &&
                      formRdx.values.type === "pizza"
                        ? true
                        : false
                    }
                    min={1}
                    max={30}
                    component={Input}
                    parse={checkInteger}
                  />
                  <RenderField
                    tagtype="input"
                    label="Diameter"
                    name="diameter"
                    type="number"
                    id="diameter"
                    className="form-control"
                    step={0.1}
                    aria-label="diameter"
                    required={
                      dishState.ifTypeWasSetFirstTime &&
                      formRdx.values.type === "pizza"
                        ? true
                        : false
                    }
                    min={0.1}
                    max={50}
                    parse={checkFloat}
                    component={Input}
                  />
                </div>
              </div>
            </div>
          ) : formRdx.values.type === "soup" ? (
            <RenderField
              tagtype="input"
              title="Spiciness scale"
              name="spiciness_scale"
              type="range"
              id="spiciness_scale"
              className="form-control form-control-range"
              add_class="range hide-left"
              parse={(value) => Number(value)}
              step={1}
              aria-label="spiciness_scale"
              data-sizing="px"
              min={1}
              max={10}
              component={Input}
              meta={{ inital: 1 }}
              required={
                dishState.ifTypeWasSetFirstTime &&
                formRdx.values.type === "soup"
                  ? true
                  : false
              }
              left_styling={dishState.outputStyle}
              no_of_inputs={1}
            />
          ) : formRdx.values.type === "sandwich" ? (
            <RenderField
              tagtype="input"
              label="No of slices"
              name="slices_of_bread"
              type="number"
              id="slices_of_bread"
              className="form-control"
              add_class="number-width hide-right"
              parse={(value) => Number(value)}
              step={1}
              min={1}
              aria-label="slices_of_bread"
              component={Input}
              required={
                dishState.ifTypeWasSetFirstTime &&
                formRdx.values.type === "sandwich"
                  ? true
                  : false
              }
              no_of_inputs={1}
            />
          ) : null
        ) : null}
      </div>
      <div className="row center">
        <div className="buttons col">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-check hide-down"
            ref={btnRef}
          >
            Submit
          </button>
        </div>
        <p name="reply" className={getReplyClasses()}>
          {finalResponse}
        </p>
      </div>
    </form>
  );
};

// reset form after sending data successfully
const afterSubmit = (result, dispatch) => dispatch(reset("formRdx"));

const DishesForm = reduxForm({
  form: "formRdx",
  validate,
  onSubmitSuccess: afterSubmit,
})(DishForm);

export default React.memo(DishesForm);
