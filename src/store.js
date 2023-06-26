import {combineReducers, configureStore} from "@reduxjs/toolkit";
import settingReducer from "./scenes/global/store/settingReducer";
import userReducer from "./scenes/login-signup/store/settingReducer";
import storage from 'redux-persist/lib/storage'
import {persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    users: userReducer,
    settings: settingReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store