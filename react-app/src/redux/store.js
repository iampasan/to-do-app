import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

export default createStore(rootReducer, applyMiddleware(thunk, logger));
