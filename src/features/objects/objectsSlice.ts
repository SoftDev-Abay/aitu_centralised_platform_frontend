import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityState,
} from "@reduxjs/toolkit";
import { ProtectedObject } from "./types";
import { RootState } from "@/app/store";

const objectsAdapter = createEntityAdapter<ProtectedObject, number>({
  selectId: (object) => object.id,
});
// normalises the data for fast lookups
// selectId is the function that returns the id of the object

const initialState = objectsAdapter.getInitialState();
// creates an object (store) like this: { ids: [], entities: {} }
// ids is an array of ids, entities is an object with the ids as keys and the objects as values

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    // upsertMany, addMany, removeOne, removeMany, setAll, setOne, addOne, upsertOne are the functions provided by the adapter
    // they are helper functions that make it easier to work with the store, but we can manually manipulate the store as well
    // for example: state.entities[id] = ...
    
    // but we don't want to do that because it is not type safe and it is not recommended
    // it is useful to use them because they are optimized for performance
    // and they are already memoized, so you don't have to worry about performance issues

    // setObjects: (state, action: PayloadAction<ProtectedObject[]>) => {
    //   objectsAdapter.setAll(state, action.payload);
    // },
    setObjects: (state, action: PayloadAction<ProtectedObject[]>) => {
      objectsAdapter.upsertMany(state, action.payload); // upsertMany adds or updates the objects in the store
    },
    addObjects: (state, action: PayloadAction<ProtectedObject[]>) => {
      objectsAdapter.addMany(state, action.payload); // addMany adds the objects to the store
    },
    upsertObject: (state, action: PayloadAction<ProtectedObject>) => {
      objectsAdapter.upsertOne(state, action.payload); // upsertOne adds or updates the object in the store
    },
    removeObject: (state, action: PayloadAction<number>) => {
      delete state.entities[action.payload]; 
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});



export const { setObjects, addObjects, upsertObject, removeObject } =
  objectsSlice.actions;
export default objectsSlice.reducer;

// SELECTORS
export const {
  selectAll: selectAllObjects,
  selectById: selectObjectById,
  selectIds: selectObjectIds,
  selectEntities: selectObjectEntities,
} = objectsAdapter.getSelectors((state: RootState) => state.objects);
