import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "./types";
import { RootState } from "@/app/store";
const usersAdapter = createEntityAdapter<User, number>({
  selectId: (user) => user.id,
});

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      usersAdapter.upsertMany(state, action.payload);
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      usersAdapter.addMany(state, action.payload);
    },
    upsertUser: (state, action: PayloadAction<User>) => {
      usersAdapter.upsertOne(state, action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      delete state.entities[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { setUsers, addUsers, upsertUser, removeUser } =
  usersSlice.actions;

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
} = usersAdapter.getSelectors((state: RootState) => state.users);
