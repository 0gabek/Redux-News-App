import { createReducer } from "@reduxjs/toolkit";
import {
  activeFilteredChanged,
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from "../actions";

const initialState = {
  filters: [],
  filterLoadingStatus: "bek",
  activeFilter: "all",
};

const filter = createReducer(
  initialState,
  {
    [filtersFetching]: (state) => {
      state.filterLoadingStatus = "loading";
    },
    [filtersFetched]: (state, action) => {
      state.filterLoadingStatus = "bek";
      state.filters = action.payload;
    },
    [filtersFetchingError]: (state) => {
      state.filterLoadingStatus = "error";
    },
    [activeFilteredChanged]: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  [],
  (state) => state
);

export default filter;
