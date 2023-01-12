import {
    configureStore,
    combineReducers,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import tableReducer from "./reducer/tableReducer";

const reducers = {
    table: tableReducer
}

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

const rootReducer = combineReducers(reducers);

const store = configureStore({
    reducer: rootReducer,
    middleware
});

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof rootReducer>;

export default store