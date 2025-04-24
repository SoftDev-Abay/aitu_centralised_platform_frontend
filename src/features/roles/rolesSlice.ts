import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Role } from "./types";
import { RootState } from "@/app/store";

const rolesAdapter = createEntityAdapter<Role, number>({
  selectId: (role) => role.id,
});

const initialState = rolesAdapter.getInitialState();

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      rolesAdapter.upsertMany(state, action.payload);
    },
    addRoles: (state, action: PayloadAction<Role[]>) => {
      rolesAdapter.addMany(state, action.payload);
    },
    upsertRole: (state, action: PayloadAction<Role>) => {
      rolesAdapter.upsertOne(state, action.payload);
    },
    removeRole: (state, action: PayloadAction<number>) => {
      delete state.entities[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { setRoles, addRoles, upsertRole, removeRole } =
  rolesSlice.actions;

export default rolesSlice.reducer;

export const {
  selectAll: selectAllRoles,
  selectById: selectRoleById,
  selectIds: selectRoleIds,
  selectEntities: selectRoleEntities,
} = rolesAdapter.getSelectors((state: RootState) => state.roles);
