import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";

const middleware = [thunk];

function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}

const store = configureStore(window.__initialState);

export default store;
