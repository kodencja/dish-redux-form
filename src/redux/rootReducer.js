import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";
import { reducer as formReducer} from 'redux-form';
import dishReducer from "./dishReducer";

const rootReducer = combineReducers({
    form: formReducer,
    dishes: dishReducer,
    // routing: routerReducer
});

export default rootReducer;