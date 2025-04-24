import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Permission } from "./types";
import { RootState } from "@/app/store";

const permissionsAdapter = createEntityAdapter<Permission, number>({
  selectId: (permission) => permission.id,
});

const initialState = permissionsAdapter.getInitialState();

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      permissionsAdapter.upsertMany(state, action.payload);
    },
    addPermissions: (state, action: PayloadAction<Permission[]>) => {
      permissionsAdapter.addMany(state, action.payload);
    },
    upsertPermission: (state, action: PayloadAction<Permission>) => {
      permissionsAdapter.upsertOne(state, action.payload);
    },
    removePermission: (state, action: PayloadAction<number>) => {
      delete state.entities[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { setPermissions, addPermissions, upsertPermission, removePermission } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;


export const {
    selectAll: selectAllPermissions,
    selectById: selectPermissionById,
    selectIds: selectPermissionIds,
    selectEntities: selectPermissionEntities,
} = permissionsAdapter.getSelectors((state: RootState) => state.permissions)