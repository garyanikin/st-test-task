import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { FETCH_START, FETCH_SUCCESS } from "./actions";

const reducer = (state, action) => {
  if (action.type === FETCH_START) {
    return { ...state, input: action.payload };
  }

  // Сохраняем в store ответ от API
  if (action.type === FETCH_SUCCESS) {
    return { ...state, results: action.payload };
  }

  return state;
};

const store = createStore(
  reducer,
  { input: "", results: [] },
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
