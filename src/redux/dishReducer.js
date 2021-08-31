import {
  any_change_made,
  final_response,
  imgName,
  output_Style,
  reset,
  setMaxVal,
  setMinVal,
  typeChange,
  typeSet,
} from "./dishTypes";

const initState = {
  url: "https://jsonplaceholder.typicode.com/posts",
  outputStyle: { left: "0" },
  finalResponse: "",
  anyChangeMade: false,
  ifTypeWasSetFirstTime: false,
  typeChanged: false,
  imgSrc: "",
};

const dishReducer = (state = initState, action) => {
  switch (action.type) {
    // to set left value of the "bubble" output
    case output_Style:
      return {
        ...state,
        outputStyle: { ...state.outputStyle, left: action.payload },
      };
    case final_response:
      return { ...state, finalResponse: action.payload };

    case typeSet:
      return { ...state, ifTypeWasSetFirstTime: action.payload };

    case typeChange:
      return { ...state, typeChanged: action.payload };

    case reset:
      return initState;

    case imgName:
      return {
        ...state,
        imgSrc: action.payload,
      };

    case any_change_made:
      return {
        ...state,
        anyChangeMade: action.payload,
      };

    default:
      return state;
  }
};

export default dishReducer;
