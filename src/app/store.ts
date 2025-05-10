import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
// import objectsReducer from "../features/objects/objectsSlice";
// import permissionsReducer from "../features/permissions/permissionsSlice";
// import rolesReducer from "../features/roles/rolesSlice";
// import usersReducer from "../features/users/usersSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // objects: objectsReducer, // ← add this
    // permissions: permissionsReducer,
    // roles: rolesReducer, // ← add this
    // users: usersReducer, // ← add this
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
