import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit"
import { playerReducer } from "./reducers/playerReducer"
import { trackReduser } from "./reducers/trackReduser"
import { thunk } from "redux-thunk"
import { albumReduser } from "./reducers/albumReduser"
const rootReduser = combineReducers({
    playerReducer,
    trackReduser,
    albumReduser
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReduser
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']