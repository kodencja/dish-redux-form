import React, { useRef, useEffect, useCallback } from "react";
import PropTypes, { exact } from 'prop-types';
import { connect } from "react-redux";
import { setOutputStyle, setTypeSet, setFinalResponse, setMin, setMax, setTypeChange, resetAll, setImgSrc, checkIfAnyChangeMade } from "../redux/dishActions";
import { appearInput } from "../functions/appearing";
import { set_Output_Style } from "../functions/setOutputStyle";
import DishForm, { defaultOption } from "./DishForm";

export const DishContext = React.createContext();

const Main = (props) => {
  const { dishState, dishFormRdx, setOutputLeft, setType, ifTypeChanged, setImgSrc, setFinalResp, setMinValue, setMaxValue, resetDishState, checkIfAnyChangeMade } = props;

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


  useEffect(() => {
    if(dishState.ifTypeWasSetFirstTime && formRdx.values.type !== undefined){
      setTimeout(() => {
        setImgSrc(formRdx.values.type);
      }, 500);
    }
  }, [dishState.typeChanged])


  // handle input appearing animation
  useEffect(() => {
      if(inputDivRef.current !== undefined && btnRef.current !== undefined){
        appearInput(inputDivRef.current, btnRef.current);
      }
  },[dishState.typeChanged]);

const dependForLeftStyle = (dishState.ifTypeWasSetFirstTime && formRdx.values.type === "soup" ? formRdx.values.spiciness_scale : dishState.ifTypeWasSetFirstTime)

useEffect(() => {
  // call a function to set a left distance of bubble with the default value - dedicated to "range" type input
  if (inputDivRef.current !== undefined && inputDivRef.current !== null) {
    inputDivRef.current.forEach((el) => {
      const elemInput =  el.children[0].children[1];
      const elType = elemInput.getAttribute("type");

      if (elType === "range") {
        const elVal = elemInput.getAttribute("value");

        // set dynamically the bubble's 'left' attribute
        if(elVal !== undefined && elVal !== ''){
          set_Output_Style(elVal, elemInput, "%", setOutputLeft);
        }

      }
    });
  }

}, [dependForLeftStyle]);

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

  // input's array refs
  const addToInputDivRef = useCallback((el) => {
    // add inputDivs at the beginning
    if(!dishState.typeChanged && !dishState.ifTypeWasSetFirstTime){
      if (el && !inputDivRef.current.includes(el)) {
        inputDivRef.current.push(el); 
      }
    } 
    // add additional inputDivs on every 'type' change
    else if(dishState.typeChanged) {
      
      // console.log(inputDivRef.current);
      if (el && !inputDivRef.current.includes(el)) {
        inputDivRef.current.push(el); 
      }
    }

    // if all inputDivs are added restore dish.'typeChanged' to false
    if(inputDivRef.current.length >= 4){
      setTimeout(() => {
        ifTypeChanged(false);
      }, 1050);
    }
  },[dishState.typeChanged]);

  const photo = (
    <img
      alt={dishState.ifTypeWasSetFirstTime && !dishState.typeChanged ? formRdx.values.type : ""}
      className={`photo ${!dishState.typeChanged ? 'hanging' : 'hide-photo'} `}
      src={
        dishState.ifTypeWasSetFirstTime && dishState.imgSrc !== '' && formRdx.values.type !== undefined
          ? require(`../img/${dishState.imgSrc}.jpg`).default
          : ""
      }
    />
  );

  const welcome = (
    <p className="welcome" ref={welcomeRef}>Hungry?</p>
  )

  return (
    <div className="container">
      <h2 className="title hide-upper" ref={titleRef}>
        Let's have a delicious meal!
      </h2>
      <div className="dishes flex justify-center align-center" ref={dishesRef}>
        <DishContext.Provider
        value={{
          dishState,
          formRdx,
          setOutputLeft,
          setType,
          ifTypeChanged,
          setMaxValue,
          setMinValue,
          setFinalResp,
          resetDishState,
          checkIfAnyChangeMade,
          addToInputDivRef,
          inputDivRef,
          btnRef
        }}
        >
        <DishForm />
        </DishContext.Provider>
        <div className="image mrg-x-auto">
        <div className="answer" ref={answerRef}>
          {dishState.ifTypeWasSetFirstTime && formRdx.values.type !== defaultOption ? photo : welcome}
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
    setMinValue: (value) => dispatch(setMin(value)),
    setMaxValue: (value) => dispatch(setMax(value)),
    resetDishState: () => dispatch(resetAll()),
    checkIfAnyChangeMade: (value) => dispatch(checkIfAnyChangeMade(value))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
