import { createReducer } from "@reduxjs/toolkit";
import {
  newsCreated,
  newsDeleted,
  newsFetched,
  newsFetching,
  newsFetchingError,
} from "../actions";

const initialState = {
  news: [],
  newsLoadingStatus: "bek",
};

// this format is available for only native JS not for TypeScript or others...
const news = createReducer(
  initialState,
  {
    [newsFetching]: (state) => {
      state.newsLoadingStatus = "loading";
    },
    [newsFetched]: (state, action) => {
      state.newsLoadingStatus = "bek";
      state.news = action.payload;
    },
    [newsFetchingError]: (state) => {
      state.newsLoadingStatus = "error";
    },
    [newsCreated]: (state, action) => {
      state.news.push(action.payload);
    },
    [newsDeleted]: (state, action) => {
      state.news = state.news.filter((item) => item.id !== action.payload);
    },
  },
  [],
  (state) => state
);

export default news;
