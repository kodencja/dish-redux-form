import React, { useRef, useEffect, useCallback } from "react";
import PropTypes, { exact } from "prop-types";
import { connect } from "react-redux";
import {
  setOutputStyle,
  setTypeSet,
  setFinalResponse,
  setTypeChange,
  resetAll,
  setImgSrc,
  checkIfAnyChangeMade,
  setWelcomeTxt,
} from "../../redux/dishActions";
import { appearInput } from "../../functions/appearing";
import { set_Output_Style } from "../../functions/setOutputStyle";
import DishForm, { defaultOption } from "../Form/DishForm";

export const DishContext = React.createContext();

const Main = (props) => {
  const {
    dishState,
    dishFormRdx,
    setOutputLeft,
    setType,
    ifTypeChanged,
    setImgSrc,
    setFinalResp,
    setWelcome,
    resetDishState,
    checkIfAnyChangeMade,
  } = props;

  const { formRdx } = dishFormRdx;

  // main title ref
  const titleRef = useRef();
  // refs to particular divs
  const answerRef = useRef();
  const dishesRef = useRef();

  // ref to submit btn
  const btnRef = useRef();

  // reply (with finalResponse) ref
  const welcomeRef = useRef();

  // array of inputs' wrapper div refs
  const inputDivRef = useRef([]);

  // useEffect(()=>{
  //   console.log(dishFormRdx);
  // },[])

  // listener for window resize
  useEffect(() => {
    window.addEventListener("resize", callOutputStyle);
    return () => {
      window.removeEventListener("resize", callOutputStyle);
    }
  }, [])

  useEffect(() => {
    if (dishState.ifTypeWasSetFirstTime && formRdx.values.type !== undefined) {
      setTimeout(() => {
        setImgSrc(formRdx.values.type);
      }, 500);
    }
  }, [dishState.typeChanged]);

  // handle input appearing animation
  useEffect(() => {
    if (inputDivRef.current !== undefined && btnRef.current !== undefined) {
      appearInput(inputDivRef.current, btnRef.current);
    }
  }, [dishState.typeChanged]);

  const dependForLeftStyle =
    dishState.ifTypeWasSetFirstTime && formRdx.values.type === "soup"
      ? formRdx.values.spiciness_scale
      : dishState.typeChanged;

  useEffect(() => {
    // call a function that calls another function to set a left distance of bubble with the default value - dedicated to "range" type input
    callOutputStyle();
  }, [dishState.typeChanged, dependForLeftStyle]);

  // handle main title appearing and "Hungry?" welcome question
  useEffect(() => {
    if (titleRef.current !== undefined && titleRef.current !== null) {
      setTimeout(() => {
        titleRef.current.classList.add("drop-fast");
        titleRef.current.classList.remove("hide-upper");
      }, 1500);
    }

    if (welcomeRef.current !== undefined && welcomeRef.current !== null) {
      welcomeRef.current.classList.add("hello");
    }
  }, []);

  const callOutputStyle = () => {
        // call a function to set a left distance of bubble with the default value - dedicated to "range" type input
        if (inputDivRef.current !== undefined && inputDivRef.current !== null) {
          inputDivRef.current.forEach((el) => {
            const elemInput = el.children[0].children[1];
            const elType = elemInput.getAttribute("type");
    
            if (elType === "range") {
              const elVal = elemInput.getAttribute("value");
    
              // set dynamically the bubble's 'left' attribute
              if (elVal !== undefined && elVal !== "") {
                set_Output_Style(elVal, elemInput, "%", setOutputLeft);
              }
            }
          });
        }
  };

  // input's array refs
  const addToInputDivRef = useCallback(
    (el) => {
      // add inputDivs at the beginning
      if (!dishState.typeChanged && !dishState.ifTypeWasSetFirstTime) {
        if (el && !inputDivRef.current.includes(el)) {
          inputDivRef.current.push(el);
        }
      }
      // add additional inputDivs on every 'type' change
      else if (dishState.typeChanged) {
        // console.log(inputDivRef.current);
        if (el && !inputDivRef.current.includes(el)) {
          inputDivRef.current.push(el);
        }
      }

      // if all inputDivs are added restore dish.'typeChanged' to false
      if (inputDivRef.current.length >= 4) {
        setTimeout(() => {
          ifTypeChanged(false);
        }, 1050);
      }
    },
    [dishState.typeChanged]
  );

  const photo = (
    <img
      alt={
        dishState.ifTypeWasSetFirstTime && !dishState.typeChanged
          ? formRdx.values.type
          : ""
      }
      className={`photo ${!dishState.typeChanged ? "hanging" : "hide-photo"} `}
      src={
        dishState.ifTypeWasSetFirstTime &&
        dishState.imgSrc !== "" &&
        formRdx.values.type !== undefined
          ? require(`../img/${dishState.imgSrc}.jpg`).default
          : ""
      }
    />
  );

  const welcome = (
    <p className="welcome" ref={welcomeRef}>
      {dishState.welcomeTxt}
    </p>
  );

  return (
    <div className="container">
      <h2 className="title hide-upper" ref={titleRef}>
        {dishState.mainTitle}
      </h2>
      <div className="dishes flex justify-center align-center" ref={dishesRef}>
        <DishContext.Provider
          value={{
            dishState,
            formRdx,
            setOutputLeft,
            setType,
            ifTypeChanged,
            setFinalResp,
            resetDishState,
            setWelcome,
            checkIfAnyChangeMade,
            addToInputDivRef,
            inputDivRef,
            btnRef,
          }}
        >
          <DishForm />
        </DishContext.Provider>
        <div className="image mrg-x-auto">
          <div className="answer" ref={answerRef}>
            {dishState.ifTypeWasSetFirstTime &&
            formRdx.values.type !== defaultOption
              ? photo
              : welcome}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dishState: state.dishes,
    dishFormRdx: state.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOutputLeft: (value) => dispatch(setOutputStyle(value)),
    setType: (value) => dispatch(setTypeSet(value)),
    ifTypeChanged: (value) => dispatch(setTypeChange(value)),
    setImgSrc: (value) => dispatch(setImgSrc(value)),
    setFinalResp: (value) => dispatch(setFinalResponse(value)),
    setWelcome: (value) => dispatch(setWelcomeTxt(value)),
    resetDishState: () => dispatch(resetAll()),
    checkIfAnyChangeMade: (value) => dispatch(checkIfAnyChangeMade(value)),
  };
};



Main.propTypes = {
  DishForm: PropTypes.element,
  photo: PropTypes.node,
  welcome: PropTypes.number,
  welcomeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  defaultOption: PropTypes.number,
  set_Output_Style: PropTypes.func,
  setOutputLeft: PropTypes.func,
  setType: PropTypes.func,
  ifTypeChanged: PropTypes.func,
  setImgSrc: PropTypes.func,
  setFinalResp: PropTypes.func,
  setWelcome: PropTypes.func,
  resetDishState: PropTypes.func,
  checkIfAnyChangeMade: PropTypes.func,
  dishState: PropTypes.shape({
    url: PropTypes.string.isRequired,
    outputStyle: exact({ left: PropTypes.string }).isRequired,
    finalResponse: PropTypes.string.isRequired,
    welcomeTxt: PropTypes.string.isRequired,
    anyChangeMade: PropTypes.bool.isRequired,
    ifTypeWasSetFirstTime: PropTypes.bool.isRequired,
    typeChanged: PropTypes.bool.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }),
  formRdx: PropTypes.shape({
    anyTouched: PropTypes.bool,
    fields: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool)),
    initial: PropTypes.shape({
      name: PropTypes.string,
      preparation_time: PropTypes.string,
      type: PropTypes.string,
    }),
    registeredFields: PropTypes.shape({
      name: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
      preparation_time: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
      type: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
      no_of_slices: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
      diameter: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
      spiciness_scale: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
      slices_of_bread: PropTypes.exact({
        name: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number,
      }),
    }),
    values: PropTypes.shape({
      name: PropTypes.string,
      preparation_time: PropTypes.string,
      type: PropTypes.string,
      no_of_slices: PropTypes.number,
      diameter: PropTypes.number,
      spiciness_scale: PropTypes.number,
      slices_of_bread: PropTypes.number,
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
