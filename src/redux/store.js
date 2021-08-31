import { createStore } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import rootReducer from "./rootReducer";


/* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store;
/* eslint-enable */