import {createStore, combineReducers} from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

const roodReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

const store = createStore(roodReducer);

export default store;